const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'static-site');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}
if (!fs.existsSync(path.join(outDir, 'tools'))) {
  fs.mkdirSync(path.join(outDir, 'tools'));
}

// Copy CSS
const css = fs.readFileSync(path.join(__dirname, 'src', 'index.css'), 'utf8');
fs.writeFileSync(path.join(outDir, 'style.css'), css);

function layout(title, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Calculora</title>
  <link rel="stylesheet" href="/style.css">
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <div style="min-height: 100vh; display: flex; flex-direction: column;">
    <header style="border-bottom: 1px solid var(--border-color); background: rgba(18, 18, 28, 0.8); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 50;">
      <div class="container" style="height: 4rem; display: flex; align-items: center; justify-content: space-between;">
        <a href="/" style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: var(--text-primary);">
          <i data-lucide="calculator" style="color: var(--accent-primary);"></i>
          <span style="font-size: 1.25rem; font-weight: 800; letter-spacing: -0.5px;">Calculora<span style="color: var(--accent-primary);">.</span></span>
        </a>
        <nav style="display: flex; align-items: center; gap: 1rem;">
          <a href="/" style="font-weight: 500;">Home</a>
          <a href="/about.html" style="font-weight: 500;">About</a>
          <a href="/contact.html" style="font-weight: 500;">Contact</a>
        </nav>
      </div>
    </header>

    <main class="container main-content" style="flex: 1;">
      ${content}
    </main>

    <footer style="border-top: 1px solid var(--border-color); background: rgba(18, 18, 28, 0.95); padding: 3rem 0; margin-top: auto;">
      <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
        <div>
          <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Calculora<span style="color: var(--accent-primary);">.</span></h3>
          <p style="font-size: 0.9rem;">Premium, accurate, and free calculators for your everyday financial, health, and academic needs.</p>
        </div>
        <div>
          <h4 style="font-size: 1.05rem; margin-bottom: 1rem; color: #fff;">Quick Links</h4>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="/about.html" style="font-size: 0.9rem;">About Us</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="/contact.html" style="font-size: 0.9rem;">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 style="font-size: 1.05rem; margin-bottom: 1rem; color: #fff;">Legal</h4>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="/privacy.html" style="font-size: 0.9rem;">Privacy Policy</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="/terms.html" style="font-size: 0.9rem;">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div class="container" style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); text-align: center; color: var(--text-secondary); font-size: 0.85rem;">
        &copy; ${new Date().getFullYear()} Calculora. All rights reserved.
      </div>
    </footer>
  </div>
  <script>
    lucide.createIcons();
  </script>
</body>
</html>`;
}

// Generate Home
const homeContent = `
<div class="animate-fade-in">
  <div class="text-center" style="padding: 4rem 0 3rem;">
    <h1 style="font-size: 3rem; margin-bottom: 1rem;">Premium Tools for Everyday Life.</h1>
    <p style="font-size: 1.25rem; max-width: 600px; margin: 0 auto 2rem;">Free, accurate, and lightning-fast calculators designed to help you make better financial, health, and academic decisions.</p>
  </div>
  <div class="tools-grid mb-8">
    <a href="/tools/paycheck-calculator.html" class="card" style="display: block; text-decoration: none; color: inherit;">
      <div style="display: inline-flex; padding: 14px; border-radius: var(--radius-lg); background-color: rgba(16, 185, 129, 0.15); color: #10b981; margin-bottom: 1rem; box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);">
        <i data-lucide="dollar-sign"></i>
      </div>
      <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">Paycheck Calculator</h3>
      <p style="margin: 0; font-size: 0.95rem;">Estimate your take-home pay after taxes.</p>
    </a>
    <!-- Adding links manually for the core 10 tools -->
    <a href="/tools/mortgage-calculator.html" class="card" style="display: block; text-decoration: none; color: inherit;">
      <div style="display: inline-flex; padding: 14px; border-radius: var(--radius-lg); background-color: rgba(139, 92, 246, 0.15); color: #8b5cf6; margin-bottom: 1rem; box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);">
        <i data-lucide="home"></i>
      </div>
      <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">Mortgage Calculator</h3>
      <p style="margin: 0; font-size: 0.95rem;">Calculate your monthly mortgage payments.</p>
    </a>
    <a href="/tools/sales-tax-calculator.html" class="card" style="display: block; text-decoration: none; color: inherit;">
      <div style="display: inline-flex; padding: 14px; border-radius: var(--radius-lg); background-color: rgba(245, 158, 11, 0.15); color: #f59e0b; margin-bottom: 1rem; box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);">
        <i data-lucide="shopping-cart"></i>
      </div>
      <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">Sales Tax Calculator</h3>
      <p style="margin: 0; font-size: 0.95rem;">Find total cost including state sales tax.</p>
    </a>
    <a href="/tools/tip-calculator.html" class="card" style="display: block; text-decoration: none; color: inherit;">
      <div style="display: inline-flex; padding: 14px; border-radius: var(--radius-lg); background-color: rgba(244, 63, 94, 0.15); color: #f43f5e; margin-bottom: 1rem; box-shadow: 0 0 20px rgba(244, 63, 94, 0.2);">
        <i data-lucide="coffee"></i>
      </div>
      <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">Tip Calculator</h3>
      <p style="margin: 0; font-size: 0.95rem;">Easily calculate tips and split bills.</p>
    </a>
    <a href="/tools/bmi-calculator.html" class="card" style="display: block; text-decoration: none; color: inherit;">
      <div style="display: inline-flex; padding: 14px; border-radius: var(--radius-lg); background-color: rgba(6, 182, 212, 0.15); color: #06b6d4; margin-bottom: 1rem; box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);">
        <i data-lucide="activity"></i>
      </div>
      <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">BMI Calculator</h3>
      <p style="margin: 0; font-size: 0.95rem;">Check your Body Mass Index quickly.</p>
    </a>
    <a href="/tools/age-calculator.html" class="card" style="display: block; text-decoration: none; color: inherit;">
      <div style="display: inline-flex; padding: 14px; border-radius: var(--radius-lg); background-color: rgba(139, 92, 246, 0.15); color: #8b5cf6; margin-bottom: 1rem; box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);">
        <i data-lucide="calendar"></i>
      </div>
      <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">Age Calculator</h3>
      <p style="margin: 0; font-size: 0.95rem;">Calculate exact age in years, months, and days.</p>
    </a>
    <a href="/tools/gpa-calculator.html" class="card" style="display: block; text-decoration: none; color: inherit;">
      <div style="display: inline-flex; padding: 14px; border-radius: var(--radius-lg); background-color: rgba(16, 185, 129, 0.15); color: #10b981; margin-bottom: 1rem; box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);">
        <i data-lucide="graduation-cap"></i>
      </div>
      <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">GPA Calculator</h3>
      <p style="margin: 0; font-size: 0.95rem;">Track your high school or college GPA.</p>
    </a>
    <a href="/tools/percentage-calculator.html" class="card" style="display: block; text-decoration: none; color: inherit;">
      <div style="display: inline-flex; padding: 14px; border-radius: var(--radius-lg); background-color: rgba(245, 158, 11, 0.15); color: #f59e0b; margin-bottom: 1rem; box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);">
        <i data-lucide="percent"></i>
      </div>
      <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">Percentage Calculator</h3>
      <p style="margin: 0; font-size: 0.95rem;">Solve basic and complex percentage problems.</p>
    </a>
    <a href="/tools/word-counter.html" class="card" style="display: block; text-decoration: none; color: inherit;">
      <div style="display: inline-flex; padding: 14px; border-radius: var(--radius-lg); background-color: rgba(244, 63, 94, 0.15); color: #f43f5e; margin-bottom: 1rem; box-shadow: 0 0 20px rgba(244, 63, 94, 0.2);">
        <i data-lucide="type"></i>
      </div>
      <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">Word Counter</h3>
      <p style="margin: 0; font-size: 0.95rem;">Count words, characters, and reading time.</p>
    </a>
    <a href="/tools/car-loan-calculator.html" class="card" style="display: block; text-decoration: none; color: inherit;">
      <div style="display: inline-flex; padding: 14px; border-radius: var(--radius-lg); background-color: rgba(6, 182, 212, 0.15); color: #06b6d4; margin-bottom: 1rem; box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);">
        <i data-lucide="car"></i>
      </div>
      <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">Car Loan Calculator</h3>
      <p style="margin: 0; font-size: 0.95rem;">Estimate your monthly auto loan payments.</p>
    </a>
  </div>
</div>`;
fs.writeFileSync(path.join(outDir, 'index.html'), layout('Home', homeContent));

// About
const aboutContent = `
<div class="content-section animate-fade-in">
  <h1 class="mb-6">About Calculora</h1>
  <p>Welcome to Calculora, your trusted platform for high-quality, precise, and easy-to-use calculators. Our mission is to provide free, accessible tools that help people make informed decisions in their everyday lives.</p>
  <h2 class="mt-8 mb-4">Why We Built Calculora</h2>
  <p>In a world full of complex financial, academic, and health-related choices, having the right information at your fingertips is crucial. We realized that many online calculators are either locked behind paywalls, bloated with confusing ads, or simply hard to use on mobile devices.</p>
  <p>That's why we built this suite of tools. From figuring out your monthly mortgage payments to tracking your college GPA, we want to make the math simple and transparent.</p>
  <h2 class="mt-8 mb-4">Our Commitment</h2>
  <p>We are committed to keeping these tools free forever. We continuously update our formulas and algorithms to ensure they meet the latest standards (such as current tax brackets and health guidelines).</p>
</div>`;
fs.writeFileSync(path.join(outDir, 'about.html'), layout('About', aboutContent));

// Contact
const contactContent = `
<div class="content-section animate-fade-in">
  <div style="text-align: center; margin-bottom: 3rem;">
    <h1 class="mb-4">Contact Us</h1>
    <p>Have a question, suggestion, or found a bug? We'd love to hear from you.</p>
  </div>
  <div class="card" style="max-width: 600px; margin: 0 auto;">
    <div style="margin-bottom: 2rem;">
      <h3 class="mb-2">Get in Touch</h3>
      <p style="margin-bottom: 0;">You can email us directly at: <a href="mailto:support@calculora.com">support@calculora.com</a></p>
    </div>
    <form onsubmit="event.preventDefault(); alert('Message sent successfully!');">
      <div class="input-group">
        <label class="input-label">Name</label>
        <input type="text" class="input-field" placeholder="Your name" required />
      </div>
      <div class="input-group">
        <label class="input-label">Email</label>
        <input type="email" class="input-field" placeholder="your@email.com" required />
      </div>
      <div class="input-group">
        <label class="input-label">Message</label>
        <textarea class="input-field" rows="4" placeholder="How can we help?" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%;">
        <i data-lucide="send" style="width: 20px;"></i>
        Send Message
      </button>
    </form>
  </div>
</div>`;
fs.writeFileSync(path.join(outDir, 'contact.html'), layout('Contact', contactContent));

// Privacy
const privacyContent = `
<div class="content-section animate-fade-in">
  <h1 class="mb-6">Privacy Policy</h1>
  <p>Last updated: July 2026</p>
  <p>At Calculora, accessible from calculora.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Calculora and how we use it.</p>
  <h2 class="mt-8 mb-4">Log Files</h2>
  <p>Calculora follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>
  <h2 class="mt-8 mb-4">Cookies and Web Beacons</h2>
  <p>Like any other website, Calculora uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
  <h2 class="mt-8 mb-4">Google DoubleClick DART Cookie</h2>
  <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.</p>
  <h2 class="mt-8 mb-4">Third Party Privacy Policies</h2>
  <p>Calculora's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.</p>
</div>`;
fs.writeFileSync(path.join(outDir, 'privacy.html'), layout('Privacy Policy', privacyContent));

// Terms
const termsContent = `
<div class="content-section animate-fade-in">
  <h1 class="mb-6">Terms of Service</h1>
  <p>Last updated: July 2026</p>
  <p>Welcome to Calculora! By accessing this website, we assume you accept these terms of service. Do not continue to use Calculora if you do not agree to take all of the terms and conditions stated on this page.</p>
  <h2 class="mt-8 mb-4">Disclaimer of Advice</h2>
  <p>The calculators and tools provided on Calculora are for informational and educational purposes only. They do not constitute financial, legal, health, or professional advice. You should consult with a qualified professional before making any significant decisions based on the results generated by our tools.</p>
  <h2 class="mt-8 mb-4">License</h2>
  <p>Unless otherwise stated, Calculora and/or its licensors own the intellectual property rights for all material on Calculora. All intellectual property rights are reserved. You may access this from Calculora for your own personal use subjected to restrictions set in these terms and conditions.</p>
  <h2 class="mt-8 mb-4">Limitation of Liability</h2>
  <p>In no event shall Calculora, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website. Calculora shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.</p>
</div>`;
fs.writeFileSync(path.join(outDir, 'terms.html'), layout('Terms of Service', termsContent));

console.log('Core files generated successfully.');
