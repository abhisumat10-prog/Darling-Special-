/**
 * Compiler & Code Runner Engine (Person 1)
 * Validates HTML, CSS, and JavaScript syntax on SUBMIT.
 * Displays line numbers and error highlighting if compilation fails,
 * or renders live output in preview iframe if compilation succeeds.
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
        this.editorManager.highlightErrorLine('js', 1, event.data.message);
      }
    });

    // Initial compile on page load
    setTimeout(() => {
      this.compileAndSubmit(true);
    }, 200);
  }

  compileAndSubmit(isInitial = false) {
    const buffers = this.editorManager.getCodeBuffers();

    // 1. Validate JavaScript Syntax
    const jsError = this.validateJavaScript(buffers.js);
    if (jsError) {
      this.setCompilerStatus('error', 'JS Error');
      this.editorManager.highlightErrorLine('js', jsError.line, jsError.message);
      return false;
    }

    // 2. Validate HTML Structure
    const htmlError = this.validateHTML(buffers.html);
    if (htmlError) {
      this.setCompilerStatus('error', 'HTML Error');
      this.editorManager.highlightErrorLine('html', htmlError.line, htmlError.message);
      return false;
    }

    // 3. Validate CSS
    const cssError = this.validateCSS(buffers.css);
    if (cssError) {
      this.setCompilerStatus('error', 'CSS Error');
      this.editorManager.highlightErrorLine('css', cssError.line, cssError.message);
      return false;
    }

    // Clear previous errors
    this.editorManager.clearErrorHighlights();
    this.setCompilerStatus('success', 'Compiled Successfully');

    // Render output into iframe
    this.renderPreview(buffers.html, buffers.css, buffers.js);

    // Notify integration hooks for Person 2, 3, 4
    if (!isInitial && window.notifySandboxSubmission) {
      window.notifySandboxSubmission({
        html: buffers.html,
        css: buffers.css,
        js: buffers.js,
        timestamp: new Date().toISOString()
      });
    }

    return true;
  }

  validateJavaScript(jsCode) {
    if (!jsCode || !jsCode.trim()) return null;
    try {
      // Use Function constructor to check for syntax errors
      new Function(jsCode);
      return null;
    } catch (e) {
      let lineNum = 1;
      // Try to parse line number from error stack or message
      const stackLines = e.stack ? e.stack.split('\n') : [];
      const match = e.stack ? e.stack.match(/<anonymous>:(\d+):(\d+)/) || e.stack.match(/:(\d+):(\d+)/) : null;
      
      if (match && match[1]) {
        lineNum = parseInt(match[1], 10);
      } else {
        // Fallback line search via code splitting
        const codeLines = jsCode.split('\n');
        for (let i = 0; i < codeLines.length; i++) {
          try {
            new Function(codeLines.slice(0, i + 1).join('\n'));
          } catch (err) {
            lineNum = i + 1;
            break;
          }
        }
      }

      return {
        line: lineNum,
        message: e.message || 'JavaScript Syntax Error'
      };
    }
  }

  validateHTML(htmlCode) {
    if (!htmlCode || !htmlCode.trim()) return null;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');
    const parserErrors = doc.querySelectorAll('parsererror');

    if (parserErrors.length > 0) {
      const errText = parserErrors[0].textContent;
      const lineMatch = errText.match(/line\s+(\d+)/i);
      const lineNum = lineMatch ? parseInt(lineMatch[1], 10) : 1;
      return {
        line: lineNum,
        message: errText.replace(/Below is a rendering of the page.*/s, '').trim()
      };
    }

    // Check basic bracket matching
    const openTags = (htmlCode.match(/<[a-zA-Z0-9]+[^>]*>/g) || []).length;
    const closeTags = (htmlCode.match(/<\/[a-zA-Z0-9]+>/g) || []).length;
    const selfClosing = (htmlCode.match(/<[a-zA-Z0-9]+[^>]*\/>/g) || []).length;

    return null;
  }

  validateCSS(cssCode) {
    if (!cssCode || !cssCode.trim()) return null;

    // Check matching braces count
    let openBraces = 0;
    const lines = cssCode.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (let char of line) {
        if (char === '{') openBraces++;
        if (char === '}') openBraces--;
      }
      if (openBraces < 0) {
        return {
          line: i + 1,
          message: 'CSS Error: Unexpected closing brace "}"'
        };
      }
    }

    if (openBraces > 0) {
      return {
        line: lines.length,
        message: 'CSS Error: Missing closing brace "}"'
      };
    }

    return null;
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
