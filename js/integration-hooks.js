/**
 * Integration Hooks for Team Members (Persons 2, 3, 4, 5)
 * Exposes standardized API interfaces for client-side scoring (html2canvas/axe-core),
 * backend AI grading (/grade API), feedback UI, and spec loaders.
 */

window.sandboxListeners = [];

/**
 * Register a submission callback function
 * @param {Function} callback - Function receiving { html, css, js, jsx, timestamp }
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
  return { html: '', css: '', js: '', jsx: '' };
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

function getSupabaseAccessToken() {
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (!key || !/^sb-.*-auth-token$/.test(key)) continue;
    try {
      const session = JSON.parse(localStorage.getItem(key));
      if (typeof session?.access_token === 'string') return session.access_token;
    } catch {
      // Ignore unrelated or expired storage entries. The server still validates the token.
    }
  }
  return null;
}

window.setupSandboxGrading = function setupSandboxGrading(activeSpec) {
  const resultsSection = document.getElementById('grading-results');
  const title = document.getElementById('grading-title');
  const message = document.getElementById('grading-message');
  const scores = document.getElementById('grading-scores');
  const reasoning = document.getElementById('grading-reasoning');
  const retry = document.getElementById('grading-retry');
  const back = document.getElementById('grading-back');
  const submitButton = document.getElementById('btn-submit');
  let latestSubmission = null;

  const revealResults = (scrollToResults = true) => {
    resultsSection.hidden = false;
    resultsSection.classList.remove('revealed');
    requestAnimationFrame(() => {
      resultsSection.classList.add('revealed');
      if (scrollToResults) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const renderScores = result => {
    const scoreLabels = {
      visual: 'Visual',
      responsive: 'Responsive',
      accessibility: 'Accessibility',
      codeQuality: 'Code Quality'
    };
    scores.replaceChildren(...Object.entries(result.scores || {}).map(([key, value]) => {
      const card = document.createElement('div');
      card.className = 'grading-score-card';
      const score = document.createElement('strong');
      score.textContent = String(value);
      const label = document.createElement('span');
      label.textContent = scoreLabels[key] || key;
      card.append(score, label);
      return card;
    }));
    scores.hidden = false;
  };

  const renderEvaluation = (result, checks, savedAt = null) => {
    title.textContent = `Overall Score: ${result.overallScore}/100`;
    const savedLabel = savedAt
      ? ` Latest saved evaluation from ${new Date(savedAt).toLocaleString()}.`
      : '';
    message.textContent = `${checks.violations.length} server-checked accessibility issue(s) found.${savedLabel}`;
    renderScores(result);
    reasoning.textContent = result.reasoning || 'The grading agent returned no written feedback.';
    reasoning.hidden = false;
  };

  const grade = async submission => {
    latestSubmission = submission;
    revealResults();
    title.textContent = `Grading ${activeSpec.title}`;
    message.textContent = 'Sending your compiled solution to the grading agent...';
    scores.hidden = true;
    reasoning.hidden = true;
    retry.hidden = true;
    submitButton.disabled = true;

    try {
      const accessToken = getSupabaseAccessToken();
      if (!accessToken) throw new Error('Sign in before submitting code for grading');
      const response = await fetch('/api/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          challengeId: activeSpec.id,
          submission: {
            html: submission.html || '',
            css: submission.css || '',
            js: submission.js || '',
            jsx: submission.jsx || ''
          }
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || `Grading failed (${response.status})`);

      const checks = { violations: result.checks?.accessibilityViolations || [] };
      renderEvaluation(result, checks);
    } catch (error) {
      title.textContent = 'Could not complete AI grading';
      message.textContent = error.message;
      scores.replaceChildren();
      scores.hidden = true;
      reasoning.textContent = '';
      reasoning.hidden = true;
      retry.hidden = false;
    } finally {
      submitButton.disabled = false;
    }
  };

  document.addEventListener('sandbox:submission', event => grade(event.detail));
  submitButton.disabled = false;
  back.addEventListener('click', () => {
    document.getElementById('question-pane').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  retry.addEventListener('click', () => {
    grade(latestSubmission || window.getSandboxSubmission());
  });

};

document.addEventListener('sandbox:spec-ready', event => {
  window.setupSandboxGrading(event.detail);
});
