/**
 * Spec Viewer & Image Resizer Lightbox Modal (Person 1)
 * Renders challenge/tutorial spec details based on sandbox mode.
 */

class SpecViewerManager {
  constructor(mode = 'challenge', challenge = null) {
    this.mode = mode;
    this.challenge = challenge;
    this.specImageWrapper = document.getElementById('spec-image-wrapper');
    this.specImage = document.getElementById('spec-image');
    this.resizeSlider = document.getElementById('resize-slider');
    this.questionPane = document.getElementById('question-pane');
    this.modalOverlay = document.getElementById('modal-overlay');
    this.modalImage = document.getElementById('modal-image');
    this.modalCloseBtn = document.getElementById('modal-close');
    this.zoomInBtn = document.getElementById('zoom-in');
    this.zoomOutBtn = document.getElementById('zoom-out');
    this.zoomResetBtn = document.getElementById('zoom-reset');

    this.currentZoom = 1;

    this.init();
  }

  init() {
    // Select spec object according to mode
    const specData = this.challenge || (this.mode === 'tutorial'
      ? window.TUTORIAL_SPEC
      : window.ACTIVE_SANDBOX_SPEC || window.CHALLENGE_1_SPEC);

    if (specData) {
      this.loadChallengeData(specData);
    }

    // Image Resize Slider
    if (this.resizeSlider && this.questionPane) {
      this.resizeSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        this.questionPane.style.maxHeight = `${val}px`;
      });
    }

    // Click spec image to open enlargeable zoom lightbox
    if (this.specImageWrapper) {
      this.specImageWrapper.addEventListener('click', () => {
        this.openLightbox();
      });
    }

    // Modal close
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => {
        this.closeLightbox();
      });
    }

    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', (e) => {
        if (e.target === this.modalOverlay) {
          this.closeLightbox();
        }
      });
    }

    // Zoom controls
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
  }

  loadChallengeData(challenge) {
    const headerTitleEl = document.getElementById('header-title');
    const titleEl = document.getElementById('question-title-body');
    const descEl = document.getElementById('question-description');
    const reqListEl = document.getElementById('requirements-list');
    const modeTagEl = document.getElementById('mode-tag');

    if (headerTitleEl) headerTitleEl.textContent = challenge.title;
    if (titleEl) titleEl.textContent = challenge.title;
    if (descEl) descEl.textContent = challenge.description;

    if (modeTagEl) {
      modeTagEl.textContent = challenge.difficulty;
      modeTagEl.className = `mode-tag ${challenge.mode}`;
    }

    if (reqListEl && challenge.requirements) {
      reqListEl.replaceChildren(...challenge.requirements.map(requirement => {
        const item = document.createElement('div');
        item.className = 'requirement-item';
        item.textContent = requirement;
        return item;
      }));
    }

    if (this.specImage && challenge.specImageSvg) {
      this.specImage.src = challenge.specImageSvg;
      if (this.modalImage) {
        this.modalImage.src = challenge.specImageSvg;
      }
    }

    if (this.specImage && challenge.referencePath) {
      const iframe = document.createElement('iframe');
      iframe.className = 'spec-reference-frame';
      iframe.src = challenge.referencePath;
      iframe.title = `${challenge.title} reference design`;
      iframe.setAttribute('loading', 'eager');
      this.specImage.replaceWith(iframe);
      this.specImage = null;
      this.specImageWrapper.classList.add('has-reference-frame');

      if (this.modalImage) {
        const modalFrame = document.createElement('iframe');
        modalFrame.className = 'modal-reference-frame';
        modalFrame.src = challenge.referencePath;
        modalFrame.title = `${challenge.title} enlarged reference design`;
        this.modalImage.replaceWith(modalFrame);
        this.modalImage = modalFrame;
      }
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
