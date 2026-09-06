/**
 * Challenge Specs Registry
 * Defines Question 1 for testing the sandbox compiler and live preview.
 */

const SAMPLE_CHALLENGE = {
  id: "pricing-card-component",
  title: "Challenge 1: Interactive Pricing Card Component",
  difficulty: "Easy",
  category: "Responsive Components & A11y",
  description: "Build an interactive, modern Pricing Card component based on the target design spec below. The component must feature a high contrast badge, pricing plan details, interactive monthly/yearly billing toggle with a 20% discount tag, and accessible semantic HTML.",
  requirements: [
    "Use semantic HTML tags (<article>, <header>, <section>, <button>).",
    "Ensure high text contrast ratio (4.5:1 minimum for WCAG AA compliance).",
    "Implement interactive Monthly ($19/mo) / Yearly ($15/mo) toggle using JS.",
    "Make the card responsive for mobile screens (<640px).",
    "Include hover states for the 'Choose Plan' CTA button."
  ],
  specFigmaUrl: "https://www.figma.com/design/sample-pricing-card/Interactive-Pricing-Card",
  specFigmaEmbedUrl: "https://www.figma.com/embed?embed_host=sandbox&url=https://www.figma.com/file/sample-pricing-card/Interactive-Pricing-Card",
  figmaTokens: {
    dimensions: { width: "360px", minHeight: "450px", borderRadius: "16px", borderWidth: "2px" },
    colors: [
      { label: "Card Background", hex: "#1E293B", token: "--bg-card" },
      { label: "Border Accent", hex: "#6366F1", token: "--accent-primary" },
      { label: "Badge Background", hex: "rgba(99, 102, 241, 0.2)", token: "--badge-bg" },
      { label: "Badge Text", hex: "#818CF8", token: "--badge-text" },
      { label: "Checkmark Icon", hex: "#10B981", token: "--accent-success" },
      { label: "Page Background", hex: "#0F172A", token: "--bg-dark" }
    ],
    typography: [
      { label: "Badge Font", value: "Fira Code / Inter, 12px, Weight 700" },
      { label: "Price Amount", value: "Inter, 44px (2.75rem), Weight 800" },
      { label: "Period Label", value: "Inter, 16px (1rem), #94A3B8" },
      { label: "CTA Button Font", value: "Inter, 16px, Weight 700" }
    ],
    spacing: [
      { label: "Card Padding", value: "32px (2rem)" },
      { label: "Feature Gap", value: "12px (0.75rem)" },
      { label: "Toggle Radius", value: "20px" }
    ]
  },
  specImageSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none">
    <rect width="600" height="400" fill="%230F172A"/>
    <rect x="150" y="40" width="300" height="320" rx="16" fill="%231E293B" stroke="%236366F1" stroke-width="2"/>
    <rect x="250" y="60" width="100" height="24" rx="12" fill="%236366F1" fill-opacity="0.2"/>
    <text x="300" y="76" fill="%23818CF8" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">PRO PLAN</text>
    <text x="300" y="120" fill="%23FFFFFF" font-family="sans-serif" font-size="36" font-weight="800" text-anchor="middle">$19<tspan font-size="16" fill="%2394A3B8">/month</tspan></text>
    
    <!-- Toggle Pill -->
    <rect x="220" y="145" width="160" height="32" rx="16" fill="%230F172A"/>
    <rect x="224" y="149" width="76" height="24" rx="12" fill="%236366F1"/>
    <text x="262" y="165" fill="%23FFFFFF" font-family="sans-serif" font-size="11" font-weight="600" text-anchor="middle">Monthly</text>
    <text x="340" y="165" fill="%2394A3B8" font-family="sans-serif" font-size="11" font-weight="600" text-anchor="middle">Yearly -20%</text>

    <!-- Bullet Features -->
    <circle cx="200" cy="210" r="8" fill="%2310B981" fill-opacity="0.2"/>
    <path d="M197 210L199 212L203 208" stroke="%2310B981" stroke-width="2" stroke-linecap="round"/>
    <text x="220" y="214" fill="%23E2E8F0" font-family="sans-serif" font-size="13">Unlimited Projects & Workspaces</text>

    <circle cx="200" cy="245" r="8" fill="%2310B981" fill-opacity="0.2"/>
    <path d="M197 245L199 247L203 243" stroke="%2310B981" stroke-width="2" stroke-linecap="round"/>
    <text x="220" y="249" fill="%23E2E8F0" font-family="sans-serif" font-size="13">Advanced AI Feedback & A11y Audit</text>

    <circle cx="200" cy="280" r="8" fill="%2310B981" fill-opacity="0.2"/>
    <path d="M197 280L199 282L203 278" stroke="%2310B981" stroke-width="2" stroke-linecap="round"/>
    <text x="220" y="284" fill="%23E2E8F0" font-family="sans-serif" font-size="13">Priority 24/7 Support</text>

    <!-- Button -->
    <rect x="180" y="310" width="240" height="38" rx="8" fill="%236366F1"/>
    <text x="300" y="334" fill="%23FFFFFF" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Choose Pro Plan</text>
  </svg>`,

  // Default starter code for testing submit, error highlighting, and compilation
  starterCode: {
    html: `<article class="card" aria-labelledby="card-title">
  <div class="badge">PRO PLAN</div>
  <h2 id="card-title" class="title">Interactive Pro Plan</h2>
  <div class="price-box">
    <span id="price-amount" class="amount">$19</span>
    <span id="price-period" class="period">/month</span>
  </div>

  <div class="toggle-container">
    <button id="toggle-btn" class="toggle-btn" aria-label="Toggle Monthly or Yearly billing">
      <span id="monthly-label" class="active">Monthly</span>
      <span id="yearly-label">Yearly <small class="discount">-20%</small></span>
    </button>
  </div>

  <ul class="features-list">
    <li><span class="icon">✓</span> Unlimited Projects & Workspaces</li>
    <li><span class="icon">✓</span> Advanced AI Feedback & A11y Audit</li>
    <li><span class="icon">✓</span> Priority 24/7 Support</li>
  </ul>

  <button class="cta-btn">Choose Pro Plan</button>
</article>`,

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
  padding: 1rem;
}

.card {
  background: #1e293b;
  border: 2px solid #6366f1;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 360px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.badge {
  display: inline-block;
  background: rgba(99, 102, 241, 0.2);
  color: #818cf8;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  margin-bottom: 0.75rem;
  letter-spacing: 0.5px;
}

.title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.price-box {
  margin-bottom: 1.25rem;
}

.amount {
  font-size: 2.75rem;
  font-weight: 800;
  color: #ffffff;
}

.period {
  font-size: 1rem;
  color: #94a3b8;
}

.toggle-container {
  margin-bottom: 1.5rem;
}

.toggle-btn {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 20px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  display: inline-flex;
  gap: 0.5rem;
  color: #94a3b8;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.toggle-btn span {
  padding: 0.3rem 0.75rem;
  border-radius: 14px;
  transition: all 0.2s ease;
}

.toggle-btn span.active {
  background: #6366f1;
  color: #ffffff;
  font-weight: 600;
}

.discount {
  color: #10b981;
  font-weight: 700;
}

.features-list {
  list-style: none;
  text-align: left;
  margin-bottom: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.features-list li {
  font-size: 0.9rem;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  color: #10b981;
  font-weight: bold;
}

.cta-btn {
  width: 100%;
  background: #6366f1;
  color: #ffffff;
  border: none;
  padding: 0.85rem;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
}

.cta-btn:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}`,

    js: `// Interactive Toggle Handler
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-btn');
  const amountEl = document.getElementById('price-amount');
  const periodEl = document.getElementById('price-period');
  const monthlyLabel = document.getElementById('monthly-label');
  const yearlyLabel = document.getElementById('yearly-label');

  let isYearly = false;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isYearly = !isYearly;
      if (isYearly) {
        amountEl.textContent = '$15';
        periodEl.textContent = '/month (billed yearly)';
        monthlyLabel.classList.remove('active');
        yearlyLabel.classList.add('active');
      } else {
        amountEl.textContent = '$19';
        periodEl.textContent = '/month';
        yearlyLabel.classList.remove('active');
        monthlyLabel.classList.add('active');
      }
    });
  }
});`
  }
};
