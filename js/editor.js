/**
 * Code Editor Manager (Person 1)
 * Manages active tabs (HTML, CSS, JS), multiple line error highlighting,
 * code persistence (localStorage) for Challenge 1, and unsaved changes warning prompts.
 */

class CodeEditorManager {
  constructor() {
    this.activeTab = 'html'; // 'html' | 'css' | 'js'
    this.codeBuffers = {
      html: '',
      css: '',
      js: ''
    };
    
    // Determine Sandbox Mode from URL query string (?mode=tutorial or ?mode=challenge1)
    const urlParams = new URLSearchParams(window.location.search);
    this.modeParam = urlParams.get('mode') || 'challenge1';
    this.mode = this.modeParam === 'tutorial' ? 'tutorial' : 'challenge';
    this.challengeSpec = window.ACTIVE_SANDBOX_SPEC || window.CHALLENGE_1_SPEC;
    this.storageKey = `${this.challengeSpec.id}_v4_saved_code`;
    this.hasUnsubmittedEdits = false;

    this.textarea = document.getElementById('code-textarea');
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

    // Set textarea text
    this.textarea.value = this.codeBuffers[this.activeTab];
    this.updateLineNumbers();

    // Event listeners
    this.textarea.addEventListener('input', () => {
      this.codeBuffers[this.activeTab] = this.textarea.value;
      this.updateLineNumbers();
      this.clearErrorHighlights();

      if (this.mode === 'challenge') {
        this.hasUnsubmittedEdits = true;
      }
    });

    this.textarea.addEventListener('scroll', () => {
      this.lineNumbersContainer.scrollTop = this.textarea.scrollTop;
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
      // Tutorial mode always resets to Slider Pill UI starter code
      const spec = window.TUTORIAL_SPEC;
      this.codeBuffers.html = spec.starterCode.html;
      this.codeBuffers.css = spec.starterCode.css;
      this.codeBuffers.js = spec.starterCode.js;
      this.hasUnsubmittedEdits = false;
    } else {
      // Challenge 1 mode: restore saved code attempt if available
      const savedCode = localStorage.getItem(this.storageKey);
      if (savedCode) {
        try {
          const parsed = JSON.parse(savedCode);
          this.codeBuffers.html = parsed.html || this.challengeSpec.starterCode.html;
          this.codeBuffers.css = parsed.css || this.challengeSpec.starterCode.css;
          this.codeBuffers.js = parsed.js || this.challengeSpec.starterCode.js;
          console.log(`[Editor] Restored saved code attempt for ${this.challengeSpec.title}.`);
        } catch {
          this.loadDefaultChallengeCode();
        }
      } else {
        this.loadDefaultChallengeCode();
      }
      this.hasUnsubmittedEdits = false;
    }
  }

  loadDefaultChallengeCode() {
    const spec = this.challengeSpec;
    this.codeBuffers.html = spec.starterCode.html;
    this.codeBuffers.css = spec.starterCode.css;
    this.codeBuffers.js = spec.starterCode.js;
  }

  saveSubmittedCode() {
    if (this.mode === 'challenge') {
      this.codeBuffers[this.activeTab] = this.textarea.value;
      localStorage.setItem(this.storageKey, JSON.stringify(this.codeBuffers));
      this.hasUnsubmittedEdits = false;
      console.log('[Editor] Code attempt saved to localStorage for Challenge 1.');
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

  /**
   * Highlight multiple erroneous lines in dull red
   * @param {string} tab - Active tab where error occurred
   * @param {Array<number>} lines - Line numbers to highlight
   * @param {string} errorMessage - Detailed error description
   */
  highlightErrorLines(tab, lines, errorMessage) {
    if (tab && tab !== this.activeTab) {
      this.switchTab(tab);
    }

    if (lines && lines.length > 0) {
      lines.forEach(lineNum => {
        const lineEl = document.getElementById(`line-num-${lineNum}`);
        if (lineEl) {
          lineEl.classList.add('error-gutter');
        }
      });

      // Scroll first failing line into view
      const firstLineEl = document.getElementById(`line-num-${lines[0]}`);
      if (firstLineEl) {
        firstLineEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // Display error banner with line numbers list
    if (this.errorBanner) {
      const lineTags = lines && lines.length > 0
        ? lines.map(l => `<span class="error-line-tag">Line ${l}</span>`).join(' ')
        : `<span class="error-line-tag">Line 1</span>`;

      this.errorBanner.innerHTML = `
        <div class="error-banner-header">
          <span>⚠️ Syntax / Compiler Error (${tab.toUpperCase()} Tab)</span>
        </div>
        <div style="margin-bottom: 0.4rem;">${this.escapeHtml(errorMessage)}</div>
        <div class="error-line-list">Affected Lines: ${lineTags}</div>
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
      localStorage.removeItem(this.storageKey);
      this.loadDefaultChallengeCode();
    }
    this.textarea.value = this.codeBuffers[this.activeTab];
    this.updateLineNumbers();
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
