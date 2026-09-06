/**
 * Integration Hooks for Team Members (Persons 2, 3, 4, 5)
 * Exposes standardized API interfaces for client-side scoring (html2canvas/axe-core),
 * backend AI grading (/grade API), feedback UI, and spec loaders.
 */

window.sandboxListeners = [];

/**
 * Register a submission callback function
 * @param {Function} callback - Function receiving { html, css, js, timestamp }
 */
window.onSandboxSubmit = function(callback) {
  if (typeof callback === 'function') {
    window.sandboxListeners.push(callback);
  }
};

/**
 * Internal method to notify all team subscribers upon successful submission
 */
window.notifySandboxSubmission = function(payload) {
  console.log('[Sandbox Integration] Code submitted cleanly:', payload);
  window.sandboxListeners.forEach(listener => {
    try {
      listener(payload);
    } catch(err) {
      console.error('[Sandbox Integration Error] Listener failed:', err);
    }
  });
};

/**
 * Get current code buffers in editor
 * Used by Person 3 (/grade API) and Person 2 (Scoring)
 */
window.getSandboxSubmission = function() {
  if (window.editorManagerInstance) {
    return window.editorManagerInstance.getCodeBuffers();
  }
  return { html: '', css: '', js: '' };
};

/**
 * Get DOM reference to the live preview iframe
 * Used by Person 2 (html2canvas & axe-core)
 */
window.getPreviewIframe = function() {
  return document.getElementById('preview-iframe');
};

/**
 * Get Figma Design Tokens for the active challenge
 * Used by Person 2 & 3 for programmatic design token evaluation
 */
window.getFigmaTokens = function() {
  if (window.SAMPLE_CHALLENGE && window.SAMPLE_CHALLENGE.figmaTokens) {
    return window.SAMPLE_CHALLENGE.figmaTokens;
  }
  return null;
};

/**
 * Get Figma Spec URL for the active challenge
 */
window.getFigmaSpecUrl = function() {
  if (window.SAMPLE_CHALLENGE) {
    return window.SAMPLE_CHALLENGE.specFigmaUrl || window.SAMPLE_CHALLENGE.specFigmaEmbedUrl || null;
  }
  return null;
};

console.log('[Sandbox Integration API] Ready for Persons 2, 3, 4, 5 (with Figma Token Support)');

