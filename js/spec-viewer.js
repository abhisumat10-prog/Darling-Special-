/**
 * Spec Viewer & Image Resizer Lightbox Modal (Person 1)
 * Manages question brief rendering, resizable spec image container,
 * and enlargeable zoom modal lightbox.
 */

class SpecViewerManager {
  constructor() {
    this.specImageWrapper = document.getElementById('spec-image-wrapper');
    this.specFigmaWrapper = document.getElementById('spec-figma-wrapper');
    this.specTokensWrapper = document.getElementById('spec-tokens-wrapper');
    this.specImage = document.getElementById('spec-image');
    this.figmaEmbedIframe = document.getElementById('figma-embed-iframe');
    this.figmaTokensContainer = document.getElementById('figma-tokens-container');

    this.resizeSlider = document.getElementById('resize-slider');
    this.questionPane = document.getElementById('question-pane');
    this.modalOverlay = document.getElementById('modal-overlay');
    this.modalImage = document.getElementById('modal-image');
    this.modalCloseBtn = document.getElementById('modal-close');
    this.zoomInBtn = document.getElementById('zoom-in');
    this.zoomOutBtn = document.getElementById('zoom-out');
    this.zoomResetBtn = document.getElementById('zoom-reset');

    // Spec Tab Buttons
    this.btnTabVisual = document.getElementById('tab-spec-visual');
    this.btnTabFigma = document.getElementById('tab-spec-figma');
    this.btnTabTokens = document.getElementById('tab-spec-tokens');

    // Canvas Dimension Sliders
    this.widthSlider = document.getElementById('width-slider');
    this.heightSlider = document.getElementById('height-slider');
    this.widthVal = document.getElementById('width-val');
    this.heightVal = document.getElementById('height-val');
    this.previewIframe = document.getElementById('preview-iframe');

    // Overlay Elements
    this.btnToggleOverlay = document.getElementById('btn-toggle-overlay');
    this.figmaOverlayLayer = document.getElementById('figma-overlay-layer');
    this.overlaySpecImage = document.getElementById('overlay-spec-image');
    this.overlayOpacitySlider = document.getElementById('overlay-opacity-slider');
    this.opacityVal = document.getElementById('opacity-val');

    this.currentZoom = 1;
    this.isOverlayActive = false;

    this.init();
  }

  init() {
    // Load Challenge Specs & Figma Data
    if (window.SAMPLE_CHALLENGE) {
      this.loadChallengeData(window.SAMPLE_CHALLENGE);
    }

    // Spec View Tab Switcher (Visual Spec vs Figma Embed vs Dev Mode Tokens)
    this.initSpecTabs();

    // Height Resizer Slider for Question Pane
    if (this.resizeSlider && this.questionPane) {
      this.resizeSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        this.questionPane.style.maxHeight = `${val}px`;
      });
    }

    // Lightbox Zoom Modal handlers
    if (this.specImageWrapper) {
      this.specImageWrapper.addEventListener('click', () => this.openLightbox());
    }
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeLightbox());
    }
    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', (e) => {
        if (e.target === this.modalOverlay) this.closeLightbox();
      });
    }

    if (this.zoomInBtn) {
      this.zoomInBtn.addEventListener('click', () => {
        this.currentZoom = Math.min(this.currentZoom + 0.25, 2.5);
        this.updateModalZoom();
      });
    }
    if (this.zoomOutBtn) {
      this.zoomOutBtn.addEventListener('click', () => {
        this.currentZoom = Math.max(this.currentZoom - 0.25, 0.5);
        this.updateModalZoom();
      });
    }
    if (this.zoomResetBtn) {
      this.zoomResetBtn.addEventListener('click', () => {
        this.currentZoom = 1;
        this.updateModalZoom();
      });
    }

    // Init Viewport Dimension Sliders (Width & Height)
    this.initCanvasSliders();

    // Init Figma Overlay Feature
    this.initOverlayControls();
  }

  initSpecTabs() {
    const tabs = [
      { btn: this.btnTabVisual, wrapper: this.specImageWrapper },
      { btn: this.btnTabFigma, wrapper: this.specFigmaWrapper },
      { btn: this.btnTabTokens, wrapper: this.specTokensWrapper }
    ];

    tabs.forEach(tab => {
      if (tab.btn) {
        tab.btn.addEventListener('click', () => {
          tabs.forEach(t => {
            if (t.btn) t.btn.classList.remove('active');
            if (t.wrapper) t.wrapper.style.display = 'none';
          });
          tab.btn.classList.add('active');
          if (tab.wrapper) tab.wrapper.style.display = tab.wrapper === this.specTokensWrapper ? 'block' : 'flex';
        });
      }
    });
  }

  loadChallengeData(challenge) {
    const titleEl = document.getElementById('question-title');
    const descEl = document.getElementById('question-description');
    const reqListEl = document.getElementById('requirements-list');

    if (titleEl) titleEl.textContent = challenge.title;
    if (descEl) descEl.textContent = challenge.description;

    if (reqListEl && challenge.requirements) {
      reqListEl.innerHTML = challenge.requirements
        .map(req => `<div class="requirement-item">📌 ${req}</div>`)
        .join('');
    }

    // Load Visual Spec SVG Image
    if (this.specImage && challenge.specImageSvg) {
      this.specImage.src = challenge.specImageSvg;
      if (this.modalImage) this.modalImage.src = challenge.specImageSvg;
      if (this.overlaySpecImage) this.overlaySpecImage.src = challenge.specImageSvg;
    }

    // Load Figma Embed URL
    if (this.figmaEmbedIframe && challenge.specFigmaEmbedUrl) {
      this.figmaEmbedIframe.src = challenge.specFigmaEmbedUrl;
    }

    // Render Figma Dev Mode Tokens
    if (this.figmaTokensContainer && challenge.figmaTokens) {
      this.renderFigmaTokens(challenge.figmaTokens);
    }
  }

  renderFigmaTokens(tokens) {
    let html = '';

    // Color Swatches Section
    if (tokens.colors && tokens.colors.length) {
      html += `
        <div class="token-group">
          <div class="token-group-label">Color Palette</div>
          <div class="color-tokens-grid">
            ${tokens.colors.map(c => `
              <div class="color-token-card" title="Click to copy HEX ${c.hex}" onclick="navigator.clipboard.writeText('${c.hex}')">
                <span class="color-swatch" style="background: ${c.hex}"></span>
                <div class="color-info">
                  <span class="color-name">${c.label}</span>
                  <span class="color-hex">${c.hex}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Typography Section
    if (tokens.typography && tokens.typography.length) {
      html += `
        <div class="token-group">
          <div class="token-group-label">Typography Specs</div>
          <div class="text-tokens-list">
            ${tokens.typography.map(t => `
              <div class="text-token-item">
                <span class="token-key">${t.label}:</span>
                <span class="token-val">${t.value}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Spacing & Layout Section
    if (tokens.spacing && tokens.spacing.length) {
      html += `
        <div class="token-group">
          <div class="token-group-label">Spacing & Geometry</div>
          <div class="text-tokens-list">
            ${tokens.spacing.map(s => `
              <div class="text-token-item">
                <span class="token-key">${s.label}:</span>
                <span class="token-val">${s.value}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    this.figmaTokensContainer.innerHTML = html;
  }

  initCanvasSliders() {
    if (!this.previewIframe) return;

    // Width Slider Listener
    if (this.widthSlider && this.widthVal) {
      this.widthSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        if (val == 100 || val > 1050) {
          this.previewIframe.style.width = '100%';
          this.widthVal.textContent = 'Auto';
        } else {
          this.previewIframe.style.width = `${val}px`;
          this.widthVal.textContent = `${val}px`;
        }
      });
    }

    // Height Slider Listener
    if (this.heightSlider && this.heightVal) {
      this.heightSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        if (val == 100 || val > 750) {
          this.previewIframe.style.height = '100%';
          this.heightVal.textContent = 'Auto';
        } else {
          this.previewIframe.style.height = `${val}px`;
          this.heightVal.textContent = `${val}px`;
        }
      });
    }
  }

  initOverlayControls() {
    if (!this.btnToggleOverlay || !this.figmaOverlayLayer) return;

    this.btnToggleOverlay.addEventListener('click', () => {
      this.isOverlayActive = !this.isOverlayActive;
      this.figmaOverlayLayer.style.display = this.isOverlayActive ? 'flex' : 'none';
      this.btnToggleOverlay.classList.toggle('active', this.isOverlayActive);
      this.btnToggleOverlay.textContent = this.isOverlayActive ? '✓ Overlay Active' : '❖ Overlay Spec';
    });

    if (this.overlayOpacitySlider && this.opacityVal && this.overlaySpecImage) {
      this.overlayOpacitySlider.addEventListener('input', (e) => {
        const opacity = e.target.value;
        this.overlaySpecImage.style.opacity = opacity / 100;
        this.opacityVal.textContent = `${opacity}%`;
      });
    }
  }

  openLightbox() {
    if (this.modalOverlay) {
      this.modalOverlay.classList.add('active');
      this.currentZoom = 1;
      this.updateModalZoom();
    }
  }

  closeLightbox() {
    if (this.modalOverlay) {
      this.modalOverlay.classList.remove('active');
    }
  }

  updateModalZoom() {
    if (this.modalImage) {
      this.modalImage.style.transform = `scale(${this.currentZoom})`;
    }
  }
}

window.SpecViewerManager = SpecViewerManager;
