const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'static-site');

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

// 6. Age Calculator
const ageContent = `
<div class="content-section animate-fade-in" style="max-width: 600px; margin: 0 auto;">
  <h1 class="text-center mb-6">Age Calculator</h1>
  <div class="card mb-8">
    <form onsubmit="event.preventDefault(); calculateAge();">
      <div class="input-group">
        <label class="input-label">Date of Birth</label>
        <input type="date" id="dob" class="input-field" required>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%;">Calculate Exact Age</button>
    </form>
    
    <div id="result" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-color); text-align: center;">
      <h3 style="color: var(--accent-primary); margin-bottom: 1rem;">Your Exact Age Is:</h3>
      <div id="ageOutput" style="font-size: 1.5rem; font-weight: 700; color: #fff; line-height: 1.5;"></div>
    </div>
  </div>
  
  <div>
    <h2>Chronological Age Calculation</h2>
    <p>Age is commonly defined as the amount of time a person has been alive. While we usually just state the number of years, many situations (like medical forms, school registrations, and legal documents) require knowing an exact chronological age in years, months, and days.</p>
    <p>Our age calculator uses the standard calendar logic to compute the exact difference between your birth date and today's date, taking leap years into account for perfect accuracy.</p>
  </div>
</div>
<script>
  function calculateAge() {
    const dobInput = document.getElementById('dob').value;
    if (!dobInput) return;
    
    const birthDate = new Date(dobInput);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    document.getElementById('ageOutput').innerHTML = years + ' Years, ' + months + ' Months, <br>' + days + ' Days';
    document.getElementById('result').style.display = 'block';
  }
</script>
`;
fs.writeFileSync(path.join(outDir, 'tools', 'age-calculator.html'), layout('Age Calculator', ageContent));

// 7. GPA Calculator
const gpaContent = `
<div class="content-section animate-fade-in" style="max-width: 600px; margin: 0 auto;">
  <h1 class="text-center mb-6">GPA Calculator</h1>
  <div class="card mb-8">
    <form onsubmit="event.preventDefault(); calculateGPA();">
      <div id="courses">
        <div class="course-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label class="input-label">Grade</label>
            <select class="input-field grade-select">
              <option value="4.0">A / A+</option>
              <option value="3.7">A-</option>
              <option value="3.3">B+</option>
              <option value="3.0">B</option>
              <option value="2.7">B-</option>
              <option value="2.3">C+</option>
              <option value="2.0">C</option>
              <option value="1.7">C-</option>
              <option value="1.3">D+</option>
              <option value="1.0">D</option>
              <option value="0.0">F</option>
            </select>
          </div>
          <div>
            <label class="input-label">Credits</label>
            <input type="number" class="input-field credit-input" value="3" min="1" required>
          </div>
        </div>
      </div>
      
      <button type="button" class="btn" style="background: rgba(255,255,255,0.1); color: #fff; margin-bottom: 1rem; width: 100%;" onclick="addCourse()">+ Add Another Course</button>
      <button type="submit" class="btn btn-primary" style="width: 100%;">Calculate GPA</button>
    </form>
    
    <div id="result" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-color); text-align: center;">
      <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">Cumulative GPA:</h3>
      <div id="gpaValue" style="font-size: 3.5rem; font-weight: 800; color: #fff; line-height: 1;"></div>
    </div>
  </div>
  
  <div>
    <h2>How is GPA Calculated?</h2>
    <p>Your Grade Point Average (GPA) is a standard way of measuring academic achievement in the US. Each grade is assigned a numerical value (e.g., an A is a 4.0, a B is a 3.0).</p>
    <p>To calculate a cumulative GPA, you cannot simply average these numbers together. You must multiply each grade's value by the number of credit hours for that course, add all those "quality points" together, and then divide by the total number of credits taken.</p>
  </div>
</div>
<script>
  function addCourse() {
    const coursesDiv = document.getElementById('courses');
    const newRow = document.createElement('div');
    newRow.className = 'course-row';
    newRow.style = 'display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;';
    newRow.innerHTML = document.querySelector('.course-row').innerHTML;
    coursesDiv.appendChild(newRow);
  }

  function calculateGPA() {
    const grades = document.querySelectorAll('.grade-select');
    const credits = document.querySelectorAll('.credit-input');
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    for (let i = 0; i < grades.length; i++) {
      const g = parseFloat(grades[i].value);
      const c = parseFloat(credits[i].value);
      totalPoints += (g * c);
      totalCredits += c;
    }
    
    const gpa = totalPoints / totalCredits;
    document.getElementById('gpaValue').textContent = gpa.toFixed(2);
    document.getElementById('result').style.display = 'block';
  }
</script>
`;
fs.writeFileSync(path.join(outDir, 'tools', 'gpa-calculator.html'), layout('GPA Calculator', gpaContent));

// 8. Percentage Calculator
const pctContent = `
<div class="content-section animate-fade-in" style="max-width: 600px; margin: 0 auto;">
  <h1 class="text-center mb-6">Percentage Calculator</h1>
  <div class="card mb-8">
    <form onsubmit="event.preventDefault(); calculatePct();">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
        <span style="font-weight: 600; font-size: 1.1rem; min-width: 80px;">What is</span>
        <input type="number" step="0.01" id="pct1" class="input-field" placeholder="%" style="flex: 1;" required>
        <span style="font-weight: 600; font-size: 1.1rem;">% of</span>
        <input type="number" step="0.01" id="val1" class="input-field" style="flex: 1;" required>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%;">Calculate</button>
    </form>
    
    <div id="result" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-color); text-align: center;">
      <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">Result:</h3>
      <div id="pctResult" style="font-size: 2.5rem; font-weight: 800; color: #fff;"></div>
    </div>
  </div>
  
  <div>
    <h2>Understanding Percentages</h2>
    <p>A percentage is a number or ratio expressed as a fraction of 100. It is widely used to denote discounts, interest rates, statistics, and more. Our percentage calculator easily finds the requested percentage of any given numerical value without needing to remember the formulas for moving decimal places.</p>
  </div>
</div>
<script>
  function calculatePct() {
    const p = parseFloat(document.getElementById('pct1').value);
    const v = parseFloat(document.getElementById('val1').value);
    const res = (p / 100) * v;
    document.getElementById('pctResult').textContent = res.toLocaleString();
    document.getElementById('result').style.display = 'block';
  }
</script>
`;
fs.writeFileSync(path.join(outDir, 'tools', 'percentage-calculator.html'), layout('Percentage Calculator', pctContent));

// 9. Word Counter
const wordContent = `
<div class="content-section animate-fade-in" style="max-width: 800px; margin: 0 auto;">
  <h1 class="text-center mb-6">Word Counter</h1>
  <div class="card mb-8">
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; text-align: center;">
      <div style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: var(--radius-md);">
        <div id="words" style="font-size: 2rem; font-weight: 800; color: #fff;">0</div>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">Words</div>
      </div>
      <div style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: var(--radius-md);">
        <div id="chars" style="font-size: 2rem; font-weight: 800; color: #fff;">0</div>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">Characters</div>
      </div>
      <div style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: var(--radius-md);">
        <div id="paragraphs" style="font-size: 2rem; font-weight: 800; color: #fff;">0</div>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">Paragraphs</div>
      </div>
      <div style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: var(--radius-md);">
        <div id="readTime" style="font-size: 2rem; font-weight: 800; color: #fff;">0m</div>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">Read Time</div>
      </div>
    </div>
    
    <textarea id="textInput" class="input-field" rows="12" placeholder="Start typing or paste your text here..." oninput="analyzeText()"></textarea>
  </div>
  
  <div>
    <h2>Why Use a Word Counter?</h2>
    <p>Whether you're an author writing a novel, a student working on an essay with a strict word limit, or a social media manager crafting a tweet, keeping track of your word and character counts is essential.</p>
    <p>Our real-time word counter processes your text instantly directly in your browser. It also estimates the reading time based on an average reading speed of 225 words per minute.</p>
  </div>
</div>
<script>
  function analyzeText() {
    const text = document.getElementById('textInput').value;
    
    const words = text.trim() === '' ? 0 : text.trim().split(/\\s+/).length;
    const chars = text.length;
    const paragraphs = text.trim() === '' ? 0 : text.split(/\\n+/).filter(p => p.trim().length > 0).length;
    const readTime = Math.ceil(words / 225);
    
    document.getElementById('words').textContent = words;
    document.getElementById('chars').textContent = chars;
    document.getElementById('paragraphs').textContent = paragraphs;
    document.getElementById('readTime').textContent = readTime + 'm';
  }
</script>
`;
fs.writeFileSync(path.join(outDir, 'tools', 'word-counter.html'), layout('Word Counter', wordContent));

// 10. Car Loan Calculator
const carLoanContent = `
<div class="content-section animate-fade-in" style="max-width: 600px; margin: 0 auto;">
  <h1 class="text-center mb-6">Car Loan Calculator</h1>
  <div class="card mb-8">
    <form onsubmit="event.preventDefault(); calculateCarLoan();">
      <div class="input-group">
        <label class="input-label">Vehicle Price ($)</label>
        <input type="number" id="carPrice" class="input-field" placeholder="e.g. 25000" required>
      </div>
      <div class="input-group">
        <label class="input-label">Down Payment ($)</label>
        <input type="number" id="carDown" class="input-field" placeholder="e.g. 5000" required>
      </div>
      <div class="input-group">
        <label class="input-label">Loan Term (Months)</label>
        <select id="carTerm" class="input-field">
          <option value="36">36 Months</option>
          <option value="48">48 Months</option>
          <option value="60">60 Months (5 Years)</option>
          <option value="72">72 Months</option>
          <option value="84">84 Months</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">Interest Rate (%)</label>
        <input type="number" step="0.01" id="carRate" class="input-field" value="5.9" required>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%;">Calculate Loan</button>
    </form>
    
    <div id="result" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-color); text-align: center;">
      <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">Estimated Monthly Payment:</h3>
      <div id="carMonthly" style="font-size: 3.5rem; font-weight: 800; color: #fff; line-height: 1;"></div>
    </div>
  </div>
  
  <div>
    <h2>Estimating Your Auto Loan Payments</h2>
    <p>Buying a car is a major purchase. Understanding exactly how much you will pay each month helps ensure the vehicle fits within your budget. By factoring in the total cost, your initial down payment or trade-in value, and the APR (Annual Percentage Rate) offered by your lender, this tool quickly calculates your expected monthly obligation.</p>
  </div>
</div>
<script>
  function calculateCarLoan() {
    const price = parseFloat(document.getElementById('carPrice').value);
    const down = parseFloat(document.getElementById('carDown').value);
    const months = parseInt(document.getElementById('carTerm').value);
    const rate = parseFloat(document.getElementById('carRate').value) / 100 / 12;
    
    const p = price - down;
    let m = 0;
    
    if (rate === 0) {
      m = p / months;
    } else {
      m = p * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    }
    
    document.getElementById('carMonthly').textContent = '$' + m.toFixed(2);
    document.getElementById('result').style.display = 'block';
  }
</script>
`;
fs.writeFileSync(path.join(outDir, 'tools', 'car-loan-calculator.html'), layout('Car Loan Calculator', carLoanContent));

console.log('Tools 6-10 generated successfully.');
