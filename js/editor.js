/**
 * Code Editor Manager (Person 1)
 * Manages active tabs (HTML, CSS, JS), VS Code Dark+ syntax highlighting overlay,
 * multi-tab compiler error indicators, inline line error markers/tooltips, and persistence.
 */

class CodeEditorManager {
  constructor() {
    this.activeTab = 'html'; // 'html' | 'css' | 'js'
    this.codeBuffers = {
      html: '',
      css: '',
      js: ''
    };
    this.tabErrors = {
      html: [],
      css: [],
      js: []
    };
    
    // Determine Sandbox Mode from URL query string (?mode=tutorial or ?mode=challenge1)
    const urlParams = new URLSearchParams(window.location.search);
    this.mode = urlParams.get('mode') === 'tutorial' ? 'tutorial' : 'challenge';
    this.hasUnsubmittedEdits = false;

    this.textarea = document.getElementById('code-textarea');
    this.codeOverlay = document.getElementById('code-overlay');
    this.lineNumbersContainer = document.getElementById('line-numbers');
    this.tabButtons = document.querySelectorAll('.tab-btn');
    this.errorBanner = document.getElementById('error-banner');
    this.backBtn = document.querySelector('.btn-back');

    this.init();
  }

  init() {
    if (!this.textarea) return;

    // Load initial code buffers based on mode and saved attempt
    this.loadInitialBuffers();

    // Set initial text
    this.textarea.value = this.codeBuffers[this.activeTab];
    this.updateLineNumbers();
    this.updateOverlay();

    if (document.fonts) {
      document.fonts.ready.then(() => {
        this.updateLineNumbers();
        this.updateOverlay();
      });
    }

    // Textarea Input Event Handler
    this.textarea.addEventListener('input', () => {
      this.codeBuffers[this.activeTab] = this.textarea.value;
      this.updateLineNumbers();
      this.updateOverlay();

      if (this.mode === 'challenge') {
        this.hasUnsubmittedEdits = true;
      }
    });

    // Synchronize scroll between textarea, syntax overlay, and line numbers
    this.textarea.addEventListener('scroll', () => {
      if (this.lineNumbersContainer) {
        this.lineNumbersContainer.scrollTop = this.textarea.scrollTop;
      }
      if (this.codeOverlay) {
        this.codeOverlay.scrollTop = this.textarea.scrollTop;
        this.codeOverlay.scrollLeft = this.textarea.scrollLeft;
      }
    });

    // Handle Tab key for 2-space indentation
    this.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        this.textarea.value = this.textarea.value.substring(0, start) + '  ' + this.textarea.value.substring(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = start + 2;
        this.codeBuffers[this.activeTab] = this.textarea.value;
        this.updateLineNumbers();
        this.updateOverlay();

        if (this.mode === 'challenge') {
          this.hasUnsubmittedEdits = true;
        }
      }
    });

    // Tab switching
    this.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        this.switchTab(lang);
      });
    });

    // Unsaved Changes Warning Setup (Challenge 1 mode only)
    if (this.mode === 'challenge') {
      window.addEventListener('beforeunload', (e) => {
        if (this.hasUnsubmittedEdits) {
          e.preventDefault();
          e.returnValue = 'You have unsubmitted code changes! Please click Submit Code to save your progress.';
          return e.returnValue;
        }
      });

      if (this.backBtn) {
        this.backBtn.addEventListener('click', (e) => {
          if (this.hasUnsubmittedEdits) {
            const confirmLeave = confirm('⚠️ Warning: You have unsubmitted code edits!\n\nSubmit your code to save your progress before leaving. Leave anyway?');
            if (!confirmLeave) {
              e.preventDefault();
            }
          }
        });
      }
    }
  }

  loadInitialBuffers() {
    if (this.mode === 'tutorial') {
      const spec = window.TUTORIAL_SPEC;
      this.codeBuffers.html = spec.starterCode.html;
      this.codeBuffers.css = spec.starterCode.css;
      this.codeBuffers.js = spec.starterCode.js;
      this.hasUnsubmittedEdits = false;
    } else {
      const savedCode = localStorage.getItem('challenge_1_saved_code');
      if (savedCode) {
        try {
          const parsed = JSON.parse(savedCode);
          this.codeBuffers.html = parsed.html || window.CHALLENGE_1_SPEC.starterCode.html;
          this.codeBuffers.css = parsed.css || window.CHALLENGE_1_SPEC.starterCode.css;
          this.codeBuffers.js = parsed.js || window.CHALLENGE_1_SPEC.starterCode.js;
        } catch (e) {
          this.loadDefaultChallengeCode();
        }
      } else {
        this.loadDefaultChallengeCode();
      }
      this.hasUnsubmittedEdits = false;
    }
  }

  loadDefaultChallengeCode() {
    const spec = window.CHALLENGE_1_SPEC;
    this.codeBuffers.html = spec.starterCode.html;
    this.codeBuffers.css = spec.starterCode.css;
    this.codeBuffers.js = spec.starterCode.js;
  }

  saveSubmittedCode() {
    if (this.mode === 'challenge') {
      this.codeBuffers[this.activeTab] = this.textarea.value;
      localStorage.setItem('challenge_1_saved_code', JSON.stringify(this.codeBuffers));
      this.hasUnsubmittedEdits = false;
    }
  }

  switchTab(lang) {
    if (!this.codeBuffers.hasOwnProperty(lang)) return;

    this.codeBuffers[this.activeTab] = this.textarea.value;
    this.activeTab = lang;

    this.tabButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    this.textarea.value = this.codeBuffers[lang];
    this.updateLineNumbers();
    this.updateOverlay();
    this.updateErrorBanner();
  }

  /**
   * Apply results from compiler evaluation across all files
   * @param {Object} tabErrors - { html: [{line, message}], css: [...], js: [...] }
   */
  applyCompilerResults(tabErrors) {
    this.tabErrors = tabErrors || { html: [], css: [], js: [] };

    // Update tab headers & error count badges
    ['html', 'css', 'js'].forEach(lang => {
      const btn = document.querySelector(`.tab-btn[data-lang="${lang}"]`);
      const badge = document.getElementById(`badge-${lang}`);
      const errs = this.tabErrors[lang] || [];

      if (btn) {
        if (errs.length > 0) {
          btn.classList.add('tab-error');
        } else {
          btn.classList.remove('tab-error');
        }
      }

      if (badge) {
        if (errs.length > 0) {
          badge.textContent = ` (${errs.length})`;
          badge.classList.add('active');
        } else {
          badge.textContent = '';
          badge.classList.remove('active');
        }
      }
    });

    // Re-render line numbers and overlay for current active tab
    this.updateLineNumbers();
    this.updateOverlay();
    this.updateErrorBanner();

    // Scroll first failing line into view if present in active tab
    const currentErrs = this.tabErrors[this.activeTab] || [];
    if (currentErrs.length > 0) {
      const firstLine = currentErrs[0].line;
      const firstLineEl = document.getElementById(`line-num-${firstLine}`);
      if (firstLineEl) {
        firstLineEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  updateLineNumbers() {
    const lines = this.textarea.value.split('\n');
    const currentTabErrors = this.tabErrors[this.activeTab] || [];
    const errorMap = new Map();
    currentTabErrors.forEach(err => errorMap.set(err.line, err.message));

    let lineNumsHtml = '';
    for (let i = 1; i <= lines.length; i++) {
      const hasErr = errorMap.has(i);
      const errClass = hasErr ? ' error-gutter' : '';
      const tooltip = hasErr ? `<span class="gutter-tooltip">⚠️ Line ${i}: ${this.escapeHtml(errorMap.get(i))}</span>` : '';
      lineNumsHtml += `<span class="line-number-item${errClass}" id="line-num-${i}" data-line="${i}">${i}${tooltip}</span>`;
    }
    this.lineNumbersContainer.innerHTML = lineNumsHtml;
  }

  updateOverlay() {
    if (!this.codeOverlay) return;

    const code = this.textarea.value;
    const lines = code.split('\n');
    const tokenizedLines = this.highlightVSCodeSyntax(code, this.activeTab).split('\n');

    const currentTabErrors = this.tabErrors[this.activeTab] || [];
    const errorMap = new Map();
    currentTabErrors.forEach(err => errorMap.set(err.line, err.message));

    let overlayHtml = '';
    for (let i = 0; i < lines.length; i++) {
      const lineNum = i + 1;
      const hasErr = errorMap.has(lineNum);
      const lineContent = (tokenizedLines[i] !== undefined && tokenizedLines[i] !== '') ? tokenizedLines[i] : ' ';
      const errClass = hasErr ? ' code-line-error' : '';
      const marker = hasErr
        ? `<span class="error-inline-marker">⚠️<span class="error-tooltip-content">Line ${lineNum}: ${this.escapeHtml(errorMap.get(lineNum))}</span></span>`
        : '';

      overlayHtml += `<div class="code-line${errClass}">${lineContent}${marker}</div>`;
    }

    this.codeOverlay.innerHTML = overlayHtml;
    this.codeOverlay.scrollTop = this.textarea.scrollTop;
    this.codeOverlay.scrollLeft = this.textarea.scrollLeft;
  }

  /**
   * VS Code Dark+ Syntax Tokenizer
   */
  highlightVSCodeSyntax(code, lang) {
    if (!code) return '';

    let html = this.escapeHtml(code);

    if (lang === 'html') {
      // HTML Comments
      html = html.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="token-comment">$1</span>');
      // HTML Tags and Attributes
      html = html.replace(/(&lt;\/?[a-zA-Z0-9-]+)(\s+[\s\S]*?)?(&gt;|\/&gt;)/g, (match, tag, attrs, close) => {
        let tagHtml = `<span class="token-tag">${tag}</span>`;
        if (attrs) {
          let formattedAttrs = attrs.replace(/([a-zA-Z0-9-]+)=(&quot;.*?&quot;|'.*?'|[^\s&>]+)/g, 
            '<span class="token-attr">$1</span>=<span class="token-string">$2</span>');
          tagHtml += formattedAttrs;
        }
        tagHtml += `<span class="token-tag">${close}</span>`;
        return tagHtml;
      });
    } else if (lang === 'css') {
      // CSS Comments
      html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token-comment">$1</span>');
      // CSS Selectors
      html = html.replace(/([a-zA-Z0-9-_\.#\:\s,]+)(\{)/g, (m, sel, brace) => {
        let selHtml = sel.replace(/([\.\#][a-zA-Z0-9-_]+)/g, '<span class="token-class">$1</span>')
                         .replace(/([a-zA-Z0-9-_]+)/g, '<span class="token-tag">$1</span>');
        return `${selHtml}<span class="token-punctuation">${brace}</span>`;
      });
      // CSS Property & Values
      html = html.replace(/([a-zA-Z0-9-]+)\s*:\s*([^;\}]+)(;|\})/g, (m, prop, val, term) => {
        let valHtml = val.replace(/(&quot;.*?&quot;|'.*?'|`.*?`)/g, '<span class="token-string">$1</span>')
                         .replace(/(\b\d+(\.\d+)?(px|em|rem|%|vh|vw|s|ms|deg)?\b)/g, '<span class="token-number">$1</span>')
                         .replace(/(#[0-9a-fA-F]{3,8}|rgba?\(.*?\))/g, '<span class="token-number">$1</span>');
        return `<span class="token-property">${prop}</span>: ${valHtml}<span class="token-punctuation">${term}</span>`;
      });
    } else if (lang === 'js') {
      // JS Comments
      html = html.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="token-comment">$1</span>');
      // JS Strings
      html = html.replace(/(&quot;.*?&quot;|'.*?'|`[\s\S]*?`)/g, '<span class="token-string">$1</span>');
      // JS Keywords
      const keywords = /\b(const|let|var|function|return|if|else|for|while|import|export|class|new|this|try|catch|async|await|of|in)\b/g;
      html = html.replace(keywords, '<span class="token-keyword">$1</span>');
      // JS Functions
      html = html.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="token-function">$1</span>(');
      // JS Numbers
      html = html.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="token-number">$1</span>');
    }

    return html;
  }

  updateErrorBanner() {
    if (!this.errorBanner) return;
    const currentErrs = this.tabErrors[this.activeTab] || [];

    if (currentErrs.length > 0) {
      const lineTags = currentErrs.map(e => `<span class="error-line-tag">Line ${e.line}</span>`).join(' ');
      const msgList = currentErrs.map(e => `<div style="margin-bottom:0.25rem;">• <strong>Line ${e.line}:</strong> ${this.escapeHtml(e.message)}</div>`).join('');

      this.errorBanner.innerHTML = `
        <div class="error-banner-header">
          <span>⚠️ Compiler / Syntax Errors (${this.activeTab.toUpperCase()} Tab - ${currentErrs.length} issue${currentErrs.length > 1 ? 's' : ''})</span>
        </div>
        <div class="error-messages">${msgList}</div>
        <div class="error-line-list" style="margin-top: 0.4rem;">Affected Lines: ${lineTags}</div>
      `;
      this.errorBanner.classList.add('active');
    } else {
      this.errorBanner.classList.remove('active');
      this.errorBanner.innerHTML = '';
    }
  }

  clearErrorHighlights() {
    this.tabErrors = { html: [], css: [], js: [] };
    ['html', 'css', 'js'].forEach(lang => {
      const btn = document.querySelector(`.tab-btn[data-lang="${lang}"]`);
      const badge = document.getElementById(`badge-${lang}`);
      if (btn) btn.classList.remove('tab-error');
      if (badge) {
        badge.textContent = '';
        badge.classList.remove('active');
      }
    });

    this.updateLineNumbers();
    this.updateOverlay();
    if (this.errorBanner) {
      this.errorBanner.classList.remove('active');
      this.errorBanner.innerHTML = '';
    }
  }

  getCodeBuffers() {
    this.codeBuffers[this.activeTab] = this.textarea.value;
    return this.codeBuffers;
  }

  resetCode() {
    if (this.mode === 'tutorial') {
      const spec = window.TUTORIAL_SPEC;
      this.codeBuffers.html = spec.starterCode.html;
      this.codeBuffers.css = spec.starterCode.css;
      this.codeBuffers.js = spec.starterCode.js;
    } else {
      localStorage.removeItem('challenge_1_saved_code');
      this.loadDefaultChallengeCode();
    }
    this.textarea.value = this.codeBuffers[this.activeTab];
    this.clearErrorHighlights();
    this.hasUnsubmittedEdits = false;
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
