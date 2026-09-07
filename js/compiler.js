/**
 * Compiler & Multi-Line Error Detection Engine (Person 1)
 * Evaluates HTML, CSS, and JavaScript syntax across all three tabs upon SUBMIT,
 * building multi-file error maps for line-specific highlighting and tab badges.
 */

class CodeCompilerEngine {
  constructor(editorManager) {
    this.editorManager = editorManager;
    this.iframe = document.getElementById('preview-iframe');
    this.statusBadge = document.getElementById('compiler-status');
    this.submitBtn = document.getElementById('btn-submit');
    this.runBtn = document.getElementById('btn-run');

    this.init();
  }

  init() {
    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', () => {
        this.compileAndSubmit();
      });
    }

    if (this.runBtn) {
      this.runBtn.addEventListener('click', () => {
        this.compileAndSubmit();
      });
    }

    // Listen for runtime errors from iframe
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'IFRAME_RUNTIME_ERROR') {
        this.setCompilerStatus('error', 'Runtime Error');
        const runtimeErr = [{ line: 1, message: event.data.message }];
        this.editorManager.applyCompilerResults({
          ...this.editorManager.tabErrors,
          js: [...(this.editorManager.tabErrors.js || []), ...runtimeErr]
        });
      }
    });

    // Initial compile on page load
    setTimeout(() => {
      this.compileAndSubmit(true);
    }, 200);
  }

  compileAndSubmit(isInitial = false) {
    const buffers = this.editorManager.getCodeBuffers();

    // Validate HTML, CSS, and JS simultaneously
    const htmlErrors = this.validateHTML(buffers.html);
    const cssErrors = this.validateCSS(buffers.css);
    const jsErrors = this.validateJavaScript(buffers.js);

    const tabErrors = {
      html: htmlErrors,
      css: cssErrors,
      js: jsErrors
    };

    // Apply error maps and tab badges in editor
    this.editorManager.applyCompilerResults(tabErrors);

    const totalErrors = htmlErrors.length + cssErrors.length + jsErrors.length;

    if (totalErrors > 0) {
      this.setCompilerStatus('error', `${totalErrors} Error${totalErrors > 1 ? 's' : ''}`);
      return false;
    }

    this.setCompilerStatus('success', 'Compiled Successfully');

    // Render output into iframe
    this.renderPreview(buffers.html, buffers.css, buffers.js);

    // Save submitted progress if in Challenge 1 mode
    if (this.editorManager.mode === 'challenge') {
      this.editorManager.saveSubmittedCode();
    }

    // Notify integration hooks for Persons 2, 3, 4
    if (!isInitial && window.notifySandboxSubmission) {
      window.notifySandboxSubmission({
        html: buffers.html,
        css: buffers.css,
        js: buffers.js,
        mode: this.editorManager.mode,
        timestamp: new Date().toISOString()
      });
    }

    return true;
  }

  validateJavaScript(jsCode) {
    if (!jsCode || !jsCode.trim()) return [];
    const errors = [];
    const lines = jsCode.split('\n');

    let globalSyntaxErr = null;
    try {
      new Function(jsCode);
    } catch (e) {
      globalSyntaxErr = e;
    }

    if (globalSyntaxErr) {
      let openBraces = 0, openParens = 0, openBrackets = 0;
      let inString = false, stringChar = '';
      let foundSpecificLine = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // String tracking per line
        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          if ((char === '"' || char === "'" || char === '`') && (j === 0 || line[j - 1] !== '\\')) {
            if (!inString) {
              inString = true;
              stringChar = char;
            } else if (char === stringChar) {
              inString = false;
            }
          }
          if (!inString) {
            if (char === '{') openBraces++;
            if (char === '}') openBraces--;
            if (char === '(') openParens++;
            if (char === ')') openParens--;
            if (char === '[') openBrackets++;
            if (char === ']') openBrackets--;
          }
        }

        if (inString && stringChar !== '`') {
          errors.push({ line: i + 1, message: `Unclosed string literal (${stringChar})` });
          foundSpecificLine = true;
        }

        if (trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('/*')) {
          try {
            new Function(trimmed);
          } catch (lineErr) {
            if (lineErr.message.includes('Unexpected') || lineErr.message.includes('Missing')) {
              errors.push({ line: i + 1, message: `JS Syntax Error: ${lineErr.message}` });
              foundSpecificLine = true;
            }
          }
        }
      }

      if (openBraces !== 0 || openParens !== 0 || openBrackets !== 0) {
        errors.push({ line: lines.length, message: 'Unmatched brackets or braces in JavaScript code' });
        foundSpecificLine = true;
      }

      if (!foundSpecificLine) {
        const lineMatch = (globalSyntaxErr.message || '').match(/(\d+)/);
        const lineNum = lineMatch ? Math.min(parseInt(lineMatch[1], 10), lines.length) : 1;
        errors.push({ line: lineNum, message: globalSyntaxErr.message || 'JavaScript Syntax Error' });
      }
    }

    return errors;
  }

  validateHTML(htmlCode) {
    if (!htmlCode || !htmlCode.trim()) return [];
    const errors = [];
    const lines = htmlCode.split('\n');

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');
    const parserErrors = doc.querySelectorAll('parsererror');

    if (parserErrors.length > 0) {
      const rawMsg = parserErrors[0].textContent.replace(/Below is a rendering of the page.*/s, '').trim();
      const lineMatch = rawMsg.match(/line\s+(\d+)/i);
      const errLine = lineMatch ? Math.min(parseInt(lineMatch[1], 10), lines.length) : 1;
      errors.push({ line: errLine, message: `HTML Parser Error: ${rawMsg}` });
    }

    const tagStack = [];
    const selfClosing = ['img', 'br', 'hr', 'input', 'meta', 'link', 'source', 'embed'];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const tagMatches = line.matchAll(/<\/?([a-zA-Z0-9-]+)[^>]*>/g);

      for (const match of tagMatches) {
        const fullTag = match[0];
        const tagName = match[1].toLowerCase();

        if (selfClosing.includes(tagName) || fullTag.endsWith('/>')) continue;

        if (fullTag.startsWith('</')) {
          if (tagStack.length > 0 && tagStack[tagStack.length - 1].name === tagName) {
            tagStack.pop();
          } else {
            errors.push({ line: i + 1, message: `Mismatched closing tag </${tagName}>` });
          }
        } else {
          tagStack.push({ name: tagName, line: i + 1 });
        }
      }
    }

    tagStack.forEach(item => {
      errors.push({ line: item.line, message: `Unclosed HTML tag <${item.name}>` });
    });

    return errors;
  }

  validateCSS(cssCode) {
    if (!cssCode || !cssCode.trim()) return [];
    const errors = [];
    const lines = cssCode.split('\n');

    let openBraces = 0;
    let blockStartLine = 1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (let char of line) {
        if (char === '{') {
          if (openBraces === 0) blockStartLine = i + 1;
          openBraces++;
        }
        if (char === '}') {
          openBraces--;
        }
      }

      if (openBraces < 0) {
        errors.push({ line: i + 1, message: 'CSS Syntax Error: Unexpected closing brace "}"' });
        openBraces = 0;
      }
    }

    if (openBraces > 0) {
      errors.push({
        line: blockStartLine,
        message: `CSS Error: Missing closing brace "}" for block starting on line ${blockStartLine}`
      });
    }

    return errors;
  }

  renderPreview(html, css, js) {
    if (!this.iframe) return;

    const fullDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    window.addEventListener('error', function(e) {
      window.parent.postMessage({
        type: 'IFRAME_RUNTIME_ERROR',
        message: e.message + ' (Line ' + e.lineno + ')'
      }, '*');
    });

    try {
      ${js}
    } catch(err) {
      window.parent.postMessage({
        type: 'IFRAME_RUNTIME_ERROR',
        message: err.message
      }, '*');
    }
  </script>
</body>
</html>`;

    this.iframe.srcdoc = fullDoc;
  }

  setCompilerStatus(type, label) {
    if (!this.statusBadge) return;
    this.statusBadge.className = `status-badge ${type}`;
    this.statusBadge.innerHTML = `<span class="dot-indicator"></span> ${label}`;
  }
}

window.CodeCompilerEngine = CodeCompilerEngine;
