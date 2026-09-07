/**
 * Compiler & Multi-Line Error Detection Engine (Person 1)
 * Detects multiple lines of broken code upon SUBMIT, highlights them in dull red,
 * and displays formatted line numbers & error messages.
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
        const sourceTab = event.data.source === 'jsx' ? 'jsx' : 'js';
        const sourceLabel = sourceTab === 'jsx' ? 'React Error' : 'JS Error';
        const errorLine = Number.isInteger(event.data.line) && event.data.line > 0
          ? event.data.line
          : 1;
        this.setCompilerStatus('error', sourceLabel);
        this.editorManager.highlightErrorLines(sourceTab, [errorLine], event.data.message);
      }
    });

    // Initial compile on page load
    setTimeout(() => {
      this.compileAndSubmit(true);
    }, 200);
  }

  compileAndSubmit(isInitial = false) {
    const buffers = this.editorManager.getCodeBuffers();

    // 1. Validate JavaScript Syntax & Multiple Line Errors
    const jsError = this.validateJavaScript(buffers.js);
    if (jsError) {
      this.setCompilerStatus('error', 'JS Error');
      this.editorManager.highlightErrorLines('js', jsError.lines, jsError.message);
      return false;
    }

    // 2. Validate HTML Structure & Multiple Line Errors
    const htmlError = this.validateHTML(buffers.html);
    if (htmlError) {
      this.setCompilerStatus('error', 'HTML Error');
      this.editorManager.highlightErrorLines('html', htmlError.lines, htmlError.message);
      return false;
    }

    // 3. Validate CSS & Multiple Line Errors
    const cssError = this.validateCSS(buffers.css);
    if (cssError) {
      this.setCompilerStatus('error', 'CSS Error');
      this.editorManager.highlightErrorLines('css', cssError.lines, cssError.message);
      return false;
    }
    // 4. Validate JSX Syntax & Multiple Line Errors
const jsxError = this.validateJSX(buffers.jsx);
if (jsxError) {
  this.setCompilerStatus('error', 'JSX Error');
  this.editorManager.highlightErrorLines('jsx', jsxError.lines, jsxError.message);
  return false;
}

    // Clear previous errors if all syntax is valid
    this.editorManager.clearErrorHighlights();
    this.setCompilerStatus('success', 'Compiled Successfully');

    // Render output into iframe
    this.renderPreview(buffers.html, buffers.css, buffers.js, buffers.jsx);

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
  jsx: buffers.jsx,
  mode: this.editorManager.mode,
  timestamp: new Date().toISOString()
});
    }

    if (!isInitial) {
      document.dispatchEvent(new CustomEvent('sandbox:submission', {
  detail: {
    html: buffers.html,
    css: buffers.css,
    js: buffers.js,
    jsx: buffers.jsx,
    mode: this.editorManager.mode,
    timestamp: new Date().toISOString()
  }
}));
    }

    return true;
  }

  validateJavaScript(jsCode) {
    if (!jsCode || !jsCode.trim()) return null;

    const errorLines = new Set();
    let primaryMessage = '';

    // First check overall code execution/syntax
    try {
      new Function(jsCode);
    } catch (e) {
      primaryMessage = e.message || 'JavaScript Syntax Error';
    }

    if (!primaryMessage) return null; // No errors found

    // Line-by-line & block inspection for multiple line error detection
    const lines = jsCode.split('\n');
    let openBraces = 0;
    let openParens = 0;
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check unclosed quotes or invalid characters per line
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if ((char === '"' || char === "'" || char === '`') && (j === 0 || line[j-1] !== '\\')) {
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
        }
      }

      if (inString && stringChar !== '`') {
        errorLines.add(i + 1); // Unclosed string on line
      }

      // Check line independently with Function test
      if (line.trim() && !line.trim().startsWith('//')) {
        try {
          new Function(line);
        } catch(err) {
          // If single line has syntax error (e.g. const x = ;)
          if (err.message.includes('Unexpected') || err.message.includes('Missing')) {
            errorLines.add(i + 1);
          }
        }
      }
    }

    if (openBraces !== 0 || openParens !== 0) {
      errorLines.add(lines.length);
    }

    // Ensure at least one line is captured
    if (errorLines.size === 0) {
      const match = primaryMessage.match(/(\d+)/);
      errorLines.add(match ? parseInt(match[1], 10) : 1);
    }

    return {
      lines: Array.from(errorLines),
      message: primaryMessage
    };
  }

  validateHTML(htmlCode) {
    if (!htmlCode || !htmlCode.trim()) return null;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');
    const parserErrors = doc.querySelectorAll('parsererror');

    const errorLines = new Set();
    let primaryMessage = '';

    if (parserErrors.length > 0) {
      primaryMessage = parserErrors[0].textContent.replace(/Below is a rendering of the page.*/s, '').trim();
      const lineMatch = primaryMessage.match(/line\s+(\d+)/i);
      if (lineMatch) errorLines.add(parseInt(lineMatch[1], 10));
    }

    // Detect unclosed HTML tags line numbers
    // Ignore example tags inside HTML comments while preserving line numbers.
    const htmlWithoutComments = htmlCode.replace(/<!--[\s\S]*?-->/g, comment =>
      comment.replace(/[^\n]/g, ' ')
    );
    const lines = htmlWithoutComments.split('\n');
    const tagStack = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const tagMatches = line.matchAll(/<\/?([a-zA-Z0-9]+)[^>]*>/g);
      for (const match of tagMatches) {
        const fullTag = match[0];
        const tagName = match[1].toLowerCase();
        if (['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName)) continue;

        if (fullTag.startsWith('</')) {
          if (tagStack.length > 0 && tagStack[tagStack.length - 1].name === tagName) {
            tagStack.pop();
          } else {
            errorLines.add(i + 1); // Mismatched closing tag line
          }
        } else if (!fullTag.endsWith('/>')) {
          tagStack.push({ name: tagName, line: i + 1 });
        }
      }
    }

    // Add unclosed opening tags lines
    tagStack.forEach(item => errorLines.add(item.line));

    if (errorLines.size > 0 || primaryMessage) {
      return {
        lines: errorLines.size > 0 ? Array.from(errorLines) : [1],
        message: primaryMessage || 'HTML Validation Error: Unclosed or mismatched tags detected.'
      };
    }

    return null;
  }

  validateCSS(cssCode) {
    if (!cssCode || !cssCode.trim()) return null;

    const errorLines = new Set();
    let openBraces = 0;
    let blockStartLine = 1;
    const lines = cssCode.split('\n');

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
        errorLines.add(i + 1);
        openBraces = 0;
      }
    }

    if (openBraces > 0) {
      // Highlight lines from blockStartLine to end
      for (let l = blockStartLine; l <= lines.length; l++) {
        errorLines.add(l);
      }
    }

    if (errorLines.size > 0) {
      return {
        lines: Array.from(errorLines),
        message: openBraces > 0 
          ? `CSS Error: Missing closing brace "}" for rule starting on line ${blockStartLine}.`
          : 'CSS Syntax Error: Unexpected closing brace "}".'
      };
    }

    return null;
  }
  validateJSX(jsxCode) {
  if (!jsxCode || !jsxCode.trim()) return null;

  try {
    Babel.transform(jsxCode, { presets: ['react'] });
  } catch (e) {
    // Babel errors usually include a line number in e.loc
    const line = e.loc && e.loc.line ? e.loc.line : 1;
    return {
      lines: [line],
      message: e.message || 'JSX Syntax Error'
    };
  }

  return null;
}

 renderPreview(html, css, js, jsx) {
  if (!this.iframe) return;

  const hasReact = jsx && jsx.trim().length > 0;

  const reactScripts = hasReact ? `
    <script src="https://unpkg.com/react@18/umd/react.development.js"></scr` + `ipt>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></scr` + `ipt>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></scr` + `ipt>
  ` : '';

  const reactMount = hasReact ? `<div id="root"></div>` : '';

  const reactScript = hasReact ? `
    <script type="text/babel">
      window.__pixelProofRuntimeSource = 'jsx';
      try {
        ${jsx}
      } catch(err) {
        window.parent.postMessage({
          type: 'IFRAME_RUNTIME_ERROR',
          source: 'jsx',
          line: err.loc && err.loc.line ? err.loc.line : 1,
          message: 'React Error: ' + err.message
        }, '*');
      } finally {
        window.__pixelProofRuntimeSource = 'js';
      }
    </scr` + `ipt>
  ` : '';

  const fullDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${css}
  </style>
  ${reactScripts}
</head>
<body>
  ${html}
  ${reactMount}
  <script>
    window.addEventListener('error', function(e) {
      window.parent.postMessage({
        type: 'IFRAME_RUNTIME_ERROR',
        source: window.__pixelProofRuntimeSource || 'js',
        line: e.lineno || 1,
        message: e.message + ' (Line ' + e.lineno + ')'
      }, '*');
    });

    try {
      window.__pixelProofRuntimeSource = 'js';
      ${js}
    } catch(err) {
      window.parent.postMessage({
        type: 'IFRAME_RUNTIME_ERROR',
        source: 'js',
        line: err.lineNumber || 1,
        message: err.message
      }, '*');
    }
  </script>
  ${reactScript}
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
