/**
 * Challenge Specs Registry
 * Challenge 1: Interactive Brightness Slider Component
 * Tutorial: Practice Sandbox (Slider Pill UI)
 */

const CHALLENGE_1_SPEC = {
  id: "brightness-slider-component",
  mode: "challenge",
  title: "Challenge 1: Interactive Brightness Slider Component",
  difficulty: "Easy",
  category: "Dynamic UI & State Control",
  description: "Create an interactive UI component where a user can adjust a range slider from 0% to 100% to dynamically control the background brightness of a sample image or card element in real time.",
  requirements: [
    "Slider Range: 0 to 100, starting at a default initial value of 50.",
    "Live Feedback: Display the current numeric percentage value (e.g. '50%') next to or above the slider.",
    "Visual Update: As the slider moves, dynamically adjust the background brightness (or filter: brightness) of the target sample card/image in real time.",
    "Ensure proper ARIA accessibility attributes (aria-label, aria-valuenow)."
  ],
  specImageSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none">
    <rect width="600" height="400" fill="%230F172A"/>
    <!-- Card Container -->
    <rect x="120" y="40" width="360" height="320" rx="16" fill="%231E293B" stroke="%23334155" stroke-width="2"/>
    
    <!-- Dynamic Brightness Sample Image Box -->
    <rect x="150" y="70" width="300" height="150" rx="12" fill="%236366F1" fill-opacity="0.5"/>
    <text x="300" y="140" fill="%23FFFFFF" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">Sample Image Card</text>

    <!-- Numeric Percentage Output Display -->
    <text x="300" y="255" fill="%2306B6D4" font-family="sans-serif" font-size="28" font-weight="800" text-anchor="middle">50%</text>

    <!-- Range Slider Track -->
    <rect x="170" y="285" width="260" height="10" rx="5" fill="%230F172A"/>
    <rect x="170" y="285" width="130" height="10" rx="5" fill="%236366F1"/>
    <!-- Thumb Handle -->
    <circle cx="300" cy="290" r="14" fill="%23FFFFFF" stroke="%236366F1" stroke-width="4"/>

    <text x="300" y="335" fill="%2394A3B8" font-family="sans-serif" font-size="12" text-anchor="middle">Adjust slider to control card brightness dynamically</text>
  </svg>`,

  starterCode: {
    html: `<div class="slider-card">
  <h2>Brightness Controller</h2>
  
  <!-- Target Sample Card to change brightness -->
  <div id="sample-card" class="sample-card">
    <span class="card-icon">💡</span>
    <p>Sample Visual Card</p>
  </div>

  <!-- Live Feedback Display -->
  <div class="feedback-display">
    <span class="label">Current Brightness:</span>
    <span id="value-display" class="value">50%</span>
  </div>

  <!-- Range Slider (0 to 100, default 50) -->
  <div class="slider-wrapper">
    <input 
      type="range" 
      id="brightness-slider" 
      min="0" 
      max="100" 
      value="50" 
      aria-label="Adjust brightness percentage"
      aria-valuenow="50"
    >
  </div>
</div>`,

    css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1.5rem;
}

.slider-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

.slider-card h2 {
  font-size: 1.3rem;
  margin-bottom: 1.25rem;
  color: #fff;
}

.sample-card {
  background: linear-gradient(135deg, #6366f1, #06b6d4);
  border-radius: 12px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  transition: filter 0.1s ease;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 0.4rem;
}

.sample-card p {
  font-weight: 600;
  font-size: 1.1rem;
  color: #fff;
}

.feedback-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.label {
  color: #94a3b8;
}

.value {
  color: #06b6d4;
  font-size: 1.5rem;
  font-weight: 800;
}

.slider-wrapper {
  margin-top: 0.5rem;
}

input[type="range"] {
  width: 100%;
  accent-color: #6366f1;
  height: 8px;
  border-radius: 4px;
  cursor: pointer;
}`,

    js: `// Dynamic Brightness Slider Controller
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('brightness-slider');
  const valueDisplay = document.getElementById('value-display');
  const sampleCard = document.getElementById('sample-card');

  if (slider && valueDisplay && sampleCard) {
    const updateBrightness = () => {
      const val = slider.value;
      // Update Live Feedback Text
      valueDisplay.textContent = val + '%';
      slider.setAttribute('aria-valuenow', val);
      
      // Update Visual Background Brightness (0% to 200% scale)
      const brightnessScale = val / 50; // 50% = 1.0 normal brightness
      sampleCard.style.filter = 'brightness(' + brightnessScale + ')';
    };

    slider.addEventListener('input', updateBrightness);
    updateBrightness(); // initial render
  }
});`
  }
};

const TUTORIAL_SPEC = {
  id: "tutorial-sandbox",
  mode: "tutorial",
  title: "Tutorial Sandbox (Practice Mode)",
  difficulty: "Practice",
  category: "Freeform Experimentation",
  description: "Welcome to the Tutorial Sandbox! This is a freeform practice area where you can write, test, and experiment with HTML, CSS, and JavaScript. Note: This playground resets code every time it is opened.",
  requirements: [
    "Feel free to edit the pre-loaded Slider Pill UI code below.",
    "Click 'Run / Preview' or 'Submit Code' to see live rendered output.",
    "Practice layout building, animation, or JS events without restrictions."
  ],
  specImageSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none">
    <rect width="600" height="400" fill="%230F172A"/>
    <rect x="150" y="80" width="300" height="240" rx="16" fill="%231E293B" stroke="%2306B6D4" stroke-width="2"/>
    <text x="300" y="140" fill="%2306B6D4" font-family="sans-serif" font-size="22" font-weight="bold" text-anchor="middle">Tutorial Playground</text>
    
    <!-- Pill UI preview -->
    <rect x="220" y="180" width="160" height="44" rx="22" fill="%230F172A" stroke="%23334155"/>
    <circle cx="244" cy="202" r="16" fill="%2306B6D4"/>
    <text x="310" y="207" fill="%23E2E8F0" font-family="sans-serif" font-size="14" font-weight="bold">ON</text>

    <text x="300" y="280" fill="%2394A3B8" font-family="sans-serif" font-size="13" text-anchor="middle">Interactive Slider Pill UI Starter Template</text>
  </svg>`,

  starterCode: {
    html: `<div class="playground-card">
  <h2>Interactive Slider Pill UI</h2>
  <p class="subtitle">Click the pill toggle switch below:</p>

  <!-- Slider Pill UI Component -->
  <div class="pill-container">
    <button id="pill-toggle" class="pill-toggle" aria-pressed="false">
      <span class="pill-handle"></span>
      <span id="pill-text" class="pill-text">OFF</span>
    </button>
  </div>

  <div id="status-card" class="status-card off">
    <span id="status-icon">🌙</span>
    <span id="status-msg">State: Inactive</span>
  </div>
</div>`,

    css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: #0b0f19;
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1.5rem;
}

.playground-card {
  background: #151d2a;
  border: 1px solid #2a364f;
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 380px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}

.playground-card h2 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #94a3b8;
  font-size: 0.9rem;
  margin-bottom: 1.75rem;
}

.pill-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.pill-toggle {
  width: 140px;
  height: 48px;
  background-color: #0d1117;
  border: 2px solid #2a364f;
  border-radius: 24px;
  padding: 4px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.pill-handle {
  width: 36px;
  height: 36px;
  background-color: #94a3b8;
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease;
}

.pill-text {
  position: absolute;
  right: 18px;
  font-weight: 700;
  font-size: 0.9rem;
  color: #94a3b8;
  transition: all 0.3s ease;
}

/* Active State */
.pill-toggle.active {
  background-color: rgba(6, 182, 212, 0.15);
  border-color: #06b6d4;
}

.pill-toggle.active .pill-handle {
  transform: translateX(90px);
  background-color: #06b6d4;
  box-shadow: 0 0 12px rgba(6, 182, 212, 0.6);
}

.pill-toggle.active .pill-text {
  right: auto;
  left: 18px;
  color: #06b6d4;
}

.status-card {
  padding: 1rem;
  border-radius: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.status-card.off {
  background-color: rgba(148, 163, 184, 0.1);
  color: #94a3b8;
}

.status-card.on {
  background-color: rgba(6, 182, 212, 0.2);
  color: #67e8f9;
}`,

    js: `// Interactive Pill UI Handler
document.addEventListener('DOMContentLoaded', () => {
  const pillBtn = document.getElementById('pill-toggle');
  const pillText = document.getElementById('pill-text');
  const statusCard = document.getElementById('status-card');
  const statusIcon = document.getElementById('status-icon');
  const statusMsg = document.getElementById('status-msg');

  let isActive = false;

  if (pillBtn) {
    pillBtn.addEventListener('click', () => {
      isActive = !isActive;
      pillBtn.setAttribute('aria-pressed', isActive ? 'true' : 'false');

      if (isActive) {
        pillBtn.classList.add('active');
        pillText.textContent = 'ON';
        statusCard.className = 'status-card on';
        statusIcon.textContent = '☀️';
        statusMsg.textContent = 'State: Active & Glowing';
      } else {
        pillBtn.classList.remove('active');
        pillText.textContent = 'OFF';
        statusCard.className = 'status-card off';
        statusIcon.textContent = '🌙';
        statusMsg.textContent = 'State: Inactive';
      }
    });
  }
});`
  }
};

window.CHALLENGE_1_SPEC = CHALLENGE_1_SPEC;
window.TUTORIAL_SPEC = TUTORIAL_SPEC;

function splitStarterDocument(source) {
  const documentNode = new DOMParser().parseFromString(source, 'text/html');
  const styles = Array.from(documentNode.querySelectorAll('style'))
    .map(node => node.textContent.trim())
    .filter(Boolean)
    .join('\n\n');
  const scripts = Array.from(documentNode.querySelectorAll('script'))
    .filter(node => !node.src && !node.textContent.includes('/@react-refresh'))
    .map(node => node.textContent.trim())
    .filter(Boolean)
    .join('\n\n');

  documentNode.querySelectorAll('style, script').forEach(node => node.remove());

  return {
    html: documentNode.body.innerHTML.trim(),
    css: styles,
    js: scripts
  };
}

function extractRequirements(markdown) {
  const requirementsSection = markdown.split(/## (?:Acceptance Criteria|Accessibility Criteria[^\n]*)/i)[1] || markdown;
  return requirementsSection
    .split('\n')
    .map(line => line.trim())
    .filter(line => !/^-{3,}$/.test(line))
    .filter(line => /^(?:\d+\.|-)/.test(line))
    .map(line => line.replace(/^(?:\d+\.|-)\s*/, '').replace(/\*\*/g, ''))
    .filter(line => line && !line.startsWith('---'));
}

async function loadPandaChallenge(mode) {
  const response = await fetch('challenges/challenges.json');
  if (!response.ok) throw new Error('Could not load Panda challenge registry.');

  const challenges = await response.json();
  const challengeNumber = mode.match(/\d+/)?.[0] || '1';
  const metadata = challenges.find(challenge => challenge.id.startsWith(`challenge-${challengeNumber}-`)) || challenges[0];
  const [specResponse, starterResponse] = await Promise.all([
    fetch(metadata.specPath),
    fetch(metadata.starterPath)
  ]);

  if (!specResponse.ok || !starterResponse.ok) {
    throw new Error(`Could not load files for ${metadata.title}.`);
  }

  const [specMarkdown, starterDocument] = await Promise.all([
    specResponse.text(),
    starterResponse.text()
  ]);

  return {
    ...metadata,
    mode: 'challenge',
    title: `${metadata.title}`,
    description: metadata.description,
    requirements: extractRequirements(specMarkdown),
    allChallenges: challenges,
    specMarkdown,
    referencePath: metadata.referencePath,
    starterCode: splitStarterDocument(starterDocument)
  };
}

window.loadSandboxSpec = async function loadSandboxSpec(mode) {
  if (mode === 'tutorial') {
    window.ACTIVE_SANDBOX_SPEC = window.TUTORIAL_SPEC;
    return window.ACTIVE_SANDBOX_SPEC;
  }

  window.ACTIVE_SANDBOX_SPEC = await loadPandaChallenge(mode);
  window.CHALLENGE_1_SPEC = window.ACTIVE_SANDBOX_SPEC;
  return window.ACTIVE_SANDBOX_SPEC;
};
