/**
 * Code Editor Manager (Person 1)
 * Manages active language tabs (HTML, CSS, JS), code buffers, line numbers, and error markers.
 */

class CodeEditorManager {
  constructor() {
    this.activeTab = 'html'; // 'html' | 'css' | 'js'
    this.codeBuffers = {
      html: '',
      css: '',
      js: ''
    };
    
    this.textarea = document.getElementById('code-textarea');
    this.lineNumbersContainer = document.getElementById('line-numbers');
    this.tabButtons = document.querySelectorAll('.tab-btn');
    this.errorBanner = document.getElementById('error-banner');

    this.init();
  }

  init() {
    if (!this.textarea) return;

    // Load initial code from challenge specs
    if (window.SAMPLE_CHALLENGE && window.SAMPLE_CHALLENGE.starterCode) {
      this.codeBuffers.html = window.SAMPLE_CHALLENGE.starterCode.html;
      this.codeBuffers.css = window.SAMPLE_CHALLENGE.starterCode.css;
      this.codeBuffers.js = window.SAMPLE_CHALLENGE.starterCode.js;
    }

    // Set initial text
    this.textarea.value = this.codeBuffers[this.activeTab];
    this.updateLineNumbers();

    // Event listeners
    this.textarea.addEventListener('input', () => {
      this.codeBuffers[this.activeTab] = this.textarea.value;
      this.updateLineNumbers();
      this.clearErrorHighlights();
    });

    this.textarea.addEventListener('scroll', () => {
      this.lineNumbersContainer.scrollTop = this.textarea.scrollTop;
    });

    // Handle Tab key in textarea for 2-space indentation
    this.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        this.textarea.value = this.textarea.value.substring(0, start) + '  ' + this.textarea.value.substring(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = start + 2;
        this.codeBuffers[this.activeTab] = this.textarea.value;
        this.updateLineNumbers();
      }
    });

    // Tab switching
    this.tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = btn.getAttribute('data-lang');
        this.switchTab(lang);
      });
    });
  }

  switchTab(lang) {
    if (!this.codeBuffers.hasOwnProperty(lang)) return;

    // Save current buffer
    this.codeBuffers[this.activeTab] = this.textarea.value;

    // Update active tab state
    this.activeTab = lang;

    this.tabButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Set new content
    this.textarea.value = this.codeBuffers[lang];
    this.updateLineNumbers();
    this.clearErrorHighlights();
  }

  updateLineNumbers() {
    const lines = this.textarea.value.split('\n');
    let lineNumsHtml = '';
    for (let i = 1; i <= lines.length; i++) {
      lineNumsHtml += `<span class="line-number-item" id="line-num-${i}">${i}</span>`;
    }
    this.lineNumbersContainer.innerHTML = lineNumsHtml;
  }

  highlightErrorLine(tab, lineNumber, errorMessage) {
    // If the error is in another tab, switch to that tab!
    if (tab && tab !== this.activeTab) {
      this.switchTab(tab);
    }

    // Highlight line number in gutter
    if (lineNumber) {
      const lineEl = document.getElementById(`line-num-${lineNumber}`);
      if (lineEl) {
        lineEl.classList.add('error-gutter');
        lineEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // Display error banner
    if (this.errorBanner) {
      this.errorBanner.innerHTML = `
        <div class="error-banner-header">
          <span>⚠️ Compilation Error (${tab.toUpperCase()} Tab - Line ${lineNumber || 'Unknown'})</span>
        </div>
        <div>${this.escapeHtml(errorMessage)}</div>
      `;
      this.errorBanner.classList.add('active');
    }
  }

  clearErrorHighlights() {
    if (this.errorBanner) {
      this.errorBanner.classList.remove('active');
      this.errorBanner.innerHTML = '';
    }
    const gutters = document.querySelectorAll('.error-gutter');
    gutters.forEach(el => el.classList.remove('error-gutter'));
  }

  getCodeBuffers() {
    // Save latest
    this.codeBuffers[this.activeTab] = this.textarea.value;
    return this.codeBuffers;
  }

  resetCode() {
    if (window.SAMPLE_CHALLENGE && window.SAMPLE_CHALLENGE.starterCode) {
      this.codeBuffers.html = window.SAMPLE_CHALLENGE.starterCode.html;
      this.codeBuffers.css = window.SAMPLE_CHALLENGE.starterCode.css;
      this.codeBuffers.js = window.SAMPLE_CHALLENGE.starterCode.js;
      this.textarea.value = this.codeBuffers[this.activeTab];
      this.updateLineNumbers();
      this.clearErrorHighlights();
    }
  }

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

window.CodeEditorManager = CodeEditorManager;
