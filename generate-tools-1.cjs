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

// 1. Paycheck Calculator
const paycheckContent = `
<div class="content-section animate-fade-in" style="max-width: 600px; margin: 0 auto;">
  <h1 class="text-center mb-6">Paycheck Calculator</h1>
  <div class="card mb-8">
    <form id="paycheckForm" onsubmit="event.preventDefault(); calculatePaycheck();">
      <div class="input-group">
        <label class="input-label">Gross Salary ($)</label>
        <input type="number" id="gross" class="input-field" placeholder="e.g. 50000" required>
      </div>
      <div class="input-group">
        <label class="input-label">Pay Frequency</label>
        <select id="frequency" class="input-field">
          <option value="annual">Annually</option>
          <option value="monthly">Monthly</option>
          <option value="biweekly">Bi-weekly</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">Estimated Tax Rate (%)</label>
        <input type="number" id="tax" class="input-field" value="22" required>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%;">Calculate Net Pay</button>
    </form>
    
    <div id="result" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
      <h3 style="color: var(--accent-primary); text-align: center; margin-bottom: 1rem;">Your Take-Home Pay</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: center;">
        <div style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: var(--radius-md);">
          <div style="font-size: 0.85rem; color: var(--text-secondary);">Per Pay Period</div>
          <div id="periodPay" style="font-size: 1.5rem; font-weight: 700; color: #fff;"></div>
        </div>
        <div style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: var(--radius-md);">
          <div style="font-size: 0.85rem; color: var(--text-secondary);">Annual Net</div>
          <div id="annualPay" style="font-size: 1.5rem; font-weight: 700; color: #fff;"></div>
        </div>
      </div>
    </div>
  </div>
  
  <div>
    <h2>How a Paycheck Calculator Works</h2>
    <p>A paycheck calculator is a powerful tool designed to estimate your net "take-home" pay. By inputting your gross salary, pay frequency, and estimated tax rates, the calculator deducts the appropriate percentages to give you a clear picture of what will actually hit your bank account.</p>
    <p>This is extremely useful when considering a new job offer or planning your personal budget for the year. Remember that actual taxes can vary based on state laws, local taxes, and personal deductions like 401(k) contributions and health insurance premiums.</p>
  </div>
</div>
<script>
  function calculatePaycheck() {
    const gross = parseFloat(document.getElementById('gross').value);
    const tax = parseFloat(document.getElementById('tax').value) / 100;
    const freq = document.getElementById('frequency').value;
    
    const annualGross = freq === 'monthly' ? gross * 12 : freq === 'biweekly' ? gross * 26 : freq === 'weekly' ? gross * 52 : gross;
    const annualNet = annualGross * (1 - tax);
    
    let periodNet = annualNet;
    if (freq === 'monthly') periodNet = annualNet / 12;
    if (freq === 'biweekly') periodNet = annualNet / 26;
    if (freq === 'weekly') periodNet = annualNet / 52;
    
    document.getElementById('periodPay').textContent = '$' + periodNet.toFixed(2);
    document.getElementById('annualPay').textContent = '$' + annualNet.toFixed(2);
    document.getElementById('result').style.display = 'block';
  }
</script>
`;
fs.writeFileSync(path.join(outDir, 'tools', 'paycheck-calculator.html'), layout('Paycheck Calculator', paycheckContent));

// 2. Mortgage Calculator
const mortgageContent = `
<div class="content-section animate-fade-in" style="max-width: 600px; margin: 0 auto;">
  <h1 class="text-center mb-6">Mortgage Calculator</h1>
  <div class="card mb-8">
    <form onsubmit="event.preventDefault(); calculateMortgage();">
      <div class="input-group">
        <label class="input-label">Home Price ($)</label>
        <input type="number" id="homePrice" class="input-field" placeholder="e.g. 300000" required>
      </div>
      <div class="input-group">
        <label class="input-label">Down Payment ($)</label>
        <input type="number" id="downPayment" class="input-field" placeholder="e.g. 60000" required>
      </div>
      <div class="input-group">
        <label class="input-label">Loan Term (Years)</label>
        <select id="term" class="input-field">
          <option value="30">30 Years</option>
          <option value="15">15 Years</option>
          <option value="10">10 Years</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">Interest Rate (%)</label>
        <input type="number" step="0.01" id="rate" class="input-field" value="6.5" required>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%;">Calculate Mortgage</button>
    </form>
    
    <div id="result" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-color); text-align: center;">
      <h3 style="color: var(--accent-primary); margin-bottom: 0.5rem;">Monthly Payment (P&I)</h3>
      <div id="monthlyPayment" style="font-size: 2.5rem; font-weight: 800; color: #fff;"></div>
    </div>
  </div>
  
  <div>
    <h2>Understanding Your Mortgage Payments</h2>
    <p>A mortgage is typically the largest financial commitment you'll make. This calculator determines your monthly Principal and Interest (P&I) payment using standard amortization formulas.</p>
    <p>The principal is the amount you borrowed, and the interest is what the lender charges you for borrowing it. Keep in mind that a true monthly housing cost also includes Property Taxes, Homeowners Insurance, and potentially Private Mortgage Insurance (PMI) if your down payment is less than 20%.</p>
  </div>
</div>
<script>
  function calculateMortgage() {
    const price = parseFloat(document.getElementById('homePrice').value);
    const down = parseFloat(document.getElementById('downPayment').value);
    const years = parseInt(document.getElementById('term').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100 / 12;
    
    const p = price - down;
    const n = years * 12;
    let m = 0;
    
    if (rate === 0) {
      m = p / n;
    } else {
      m = p * (rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    }
    
    document.getElementById('monthlyPayment').textContent = '$' + m.toFixed(2);
    document.getElementById('result').style.display = 'block';
  }
</script>
`;
fs.writeFileSync(path.join(outDir, 'tools', 'mortgage-calculator.html'), layout('Mortgage Calculator', mortgageContent));

// 3. Sales Tax Calculator
const salesTaxContent = `
<div class="content-section animate-fade-in" style="max-width: 600px; margin: 0 auto;">
  <h1 class="text-center mb-6">Sales Tax Calculator</h1>
  <div class="card mb-8">
    <form onsubmit="event.preventDefault(); calculateTax();">
      <div class="input-group">
        <label class="input-label">Price before tax ($)</label>
        <input type="number" step="0.01" id="price" class="input-field" placeholder="e.g. 100" required>
      </div>
      <div class="input-group">
        <label class="input-label">Sales Tax Rate (%)</label>
        <input type="number" step="0.01" id="taxRate" class="input-field" placeholder="e.g. 7.5" required>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%;">Calculate Total</button>
    </form>
    
    <div id="result" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 1.1rem;">
        <span style="color: var(--text-secondary);">Tax Amount:</span>
        <span id="taxAmount" style="color: #fff; font-weight: 600;"></span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 1.25rem;">
        <span style="color: var(--accent-primary); font-weight: 700;">Total Price:</span>
        <span id="totalPrice" style="color: #fff; font-weight: 800;"></span>
      </div>
    </div>
  </div>
  
  <div>
    <h2>How to Calculate Sales Tax</h2>
    <p>Sales tax in the United States and many other countries is applied at the point of sale. To manually calculate the sales tax on an item, you convert the percentage rate into a decimal (by dividing by 100) and multiply it by the purchase price.</p>
    <p>Our tool simplifies this process. This is especially helpful for large purchases like cars or electronics, where regional taxes can significantly alter the final checkout price.</p>
  </div>
</div>
<script>
  function calculateTax() {
    const price = parseFloat(document.getElementById('price').value);
    const rate = parseFloat(document.getElementById('taxRate').value) / 100;
    
    const tax = price * rate;
    const total = price + tax;
    
    document.getElementById('taxAmount').textContent = '$' + tax.toFixed(2);
    document.getElementById('totalPrice').textContent = '$' + total.toFixed(2);
    document.getElementById('result').style.display = 'block';
  }
</script>
`;
fs.writeFileSync(path.join(outDir, 'tools', 'sales-tax-calculator.html'), layout('Sales Tax Calculator', salesTaxContent));

// 4. Tip Calculator
const tipContent = `
<div class="content-section animate-fade-in" style="max-width: 600px; margin: 0 auto;">
  <h1 class="text-center mb-6">Tip Calculator</h1>
  <div class="card mb-8">
    <form onsubmit="event.preventDefault(); calculateTip();">
      <div class="input-group">
        <label class="input-label">Bill Amount ($)</label>
        <input type="number" step="0.01" id="bill" class="input-field" placeholder="e.g. 50" required>
      </div>
      <div class="input-group">
        <label class="input-label">Tip Percentage (%)</label>
        <input type="number" id="tipPct" class="input-field" value="20" required>
      </div>
      <div class="input-group">
        <label class="input-label">Number of People (Split)</label>
        <input type="number" id="split" class="input-field" value="1" min="1" required>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%;">Calculate Tip</button>
    </form>
    
    <div id="result" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 1.1rem;">
        <span style="color: var(--text-secondary);">Total Tip:</span>
        <span id="totalTip" style="color: #fff; font-weight: 600;"></span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.1rem;">
        <span style="color: var(--text-secondary);">Total Bill:</span>
        <span id="totalBill" style="color: #fff; font-weight: 600;"></span>
      </div>
      <div id="splitSection" style="display: flex; justify-content: space-between; font-size: 1.25rem; padding-top: 1rem; border-top: 1px dashed rgba(255,255,255,0.1);">
        <span style="color: var(--accent-primary); font-weight: 700;">Per Person:</span>
        <span id="perPerson" style="color: #fff; font-weight: 800;"></span>
      </div>
    </div>
  </div>
  
  <div>
    <h2>Tipping Etiquette and Calculations</h2>
    <p>Calculating the correct tip after a meal can sometimes be stressful, especially when dining with a large group and splitting the bill. In the United States, a standard tip for good service is typically between 15% and 20%.</p>
    <p>Our tip calculator allows you to instantly see the exact tip amount, the final bill total, and exactly how much each person owes if you are splitting the check evenly.</p>
  </div>
</div>
<script>
  function calculateTip() {
    const bill = parseFloat(document.getElementById('bill').value);
    const pct = parseFloat(document.getElementById('tipPct').value) / 100;
    const split = parseInt(document.getElementById('split').value);
    
    const tip = bill * pct;
    const total = bill + tip;
    const perPerson = total / split;
    
    document.getElementById('totalTip').textContent = '$' + tip.toFixed(2);
    document.getElementById('totalBill').textContent = '$' + total.toFixed(2);
    document.getElementById('perPerson').textContent = '$' + perPerson.toFixed(2);
    
    document.getElementById('splitSection').style.display = split > 1 ? 'flex' : 'none';
    document.getElementById('result').style.display = 'block';
  }
</script>
`;
fs.writeFileSync(path.join(outDir, 'tools', 'tip-calculator.html'), layout('Tip Calculator', tipContent));

// 5. BMI Calculator
const bmiContent = `
<div class="content-section animate-fade-in" style="max-width: 600px; margin: 0 auto;">
  <h1 class="text-center mb-6">BMI Calculator</h1>
  <div class="card mb-8">
    <form onsubmit="event.preventDefault(); calculateBMI();">
      <div class="input-group">
        <label class="input-label">Weight (lbs)</label>
        <input type="number" step="0.1" id="weight" class="input-field" placeholder="e.g. 150" required>
      </div>
      <div class="input-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div>
          <label class="input-label">Height (ft)</label>
          <input type="number" id="ft" class="input-field" placeholder="e.g. 5" required>
        </div>
        <div>
          <label class="input-label">Height (in)</label>
          <input type="number" id="in" class="input-field" placeholder="e.g. 9" required>
        </div>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%;">Calculate BMI</button>
    </form>
    
    <div id="result" style="display: none; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-color); text-align: center;">
      <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">Your BMI Is:</h3>
      <div id="bmiValue" style="font-size: 3.5rem; font-weight: 800; color: #fff; line-height: 1;"></div>
      <div id="bmiCategory" style="margin-top: 1rem; font-size: 1.25rem; font-weight: 600; padding: 0.5rem 1rem; border-radius: var(--radius-md); display: inline-block;"></div>
    </div>
  </div>
  
  <div>
    <h2>What is Body Mass Index (BMI)?</h2>
    <p>Body Mass Index (BMI) is a simple numerical measure of a person's thickness or thinness, allowing health professionals to discuss weight objectively with their patients. It is calculated based on your height and weight.</p>
    <p>While BMI is a useful screening tool, it does have limitations. It does not measure body fat directly and cannot distinguish between fat and muscle. Therefore, athletes and highly muscular individuals may have a high BMI but a low body fat percentage.</p>
  </div>
</div>
<script>
  function calculateBMI() {
    const w = parseFloat(document.getElementById('weight').value);
    const f = parseInt(document.getElementById('ft').value);
    const i = parseInt(document.getElementById('in').value);
    
    const inches = (f * 12) + i;
    const bmi = (w / (inches * inches)) * 703;
    
    let category = '';
    let color = '';
    
    if (bmi < 18.5) { category = 'Underweight'; color = '#3b82f6'; }
    else if (bmi < 25) { category = 'Normal weight'; color = '#10b981'; }
    else if (bmi < 30) { category = 'Overweight'; color = '#f59e0b'; }
    else { category = 'Obese'; color = '#ef4444'; }
    
    document.getElementById('bmiValue').textContent = bmi.toFixed(1);
    const catEl = document.getElementById('bmiCategory');
    catEl.textContent = category;
    catEl.style.backgroundColor = color + '33'; // 20% opacity
    catEl.style.color = color;
    
    document.getElementById('result').style.display = 'block';
  }
</script>
`;
fs.writeFileSync(path.join(outDir, 'tools', 'bmi-calculator.html'), layout('BMI Calculator', bmiContent));

console.log('Tools 1-5 generated successfully.');
