const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'tools');
const templateStr = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

const newTools = [
  {
    filename: 'compound-interest-calculator.html',
    title: 'Compound Interest Calculator',
    desc: 'Calculate the future value of your investments with our US compound interest calculator. Estimate APY growth over time.',
    keywords: 'US compound interest calculator, APY investment estimator, stock market growth calculator',
    icon: 'trending-up',
    inputs: [
      { id: 'principal', label: 'Initial Investment ($)', type: 'number', placeholder: '10000', default: '' },
      { id: 'monthly', label: 'Monthly Contribution ($)', type: 'number', placeholder: '500', default: '' },
      { id: 'rate', label: 'Estimated APY (%)', type: 'number', placeholder: '7', default: '7', step: '0.1' },
      { id: 'years', label: 'Years to Grow', type: 'number', placeholder: '10', default: '' }
    ],
    js: `
      const p = parseFloat(document.getElementById('principal').value || 0);
      const pmt = parseFloat(document.getElementById('monthly').value || 0);
      const r = parseFloat(document.getElementById('rate').value || 0) / 100;
      const t = parseFloat(document.getElementById('years').value || 0);
      
      const futureValueOfPrincipal = p * Math.pow(1 + r/12, 12 * t);
      let futureValueOfContributions = 0;
      if (r > 0) {
         futureValueOfContributions = pmt * ( (Math.pow(1 + r/12, 12 * t) - 1) / (r/12) );
      } else {
         futureValueOfContributions = pmt * 12 * t;
      }
      const total = futureValueOfPrincipal + futureValueOfContributions;
      
      return 'Total Value: $' + total.toFixed(2);
    `,
    content: `
      <div style="margin-top: 3rem;">
        <h2>The Power of Compound Interest in the US Market</h2>
        <p>Albert Einstein reportedly called compound interest the eighth wonder of the world. Our US Compound Interest Calculator allows you to project the future value of your investments—whether that's a high-yield savings account, an index fund, or a diversified stock portfolio.</p>
        
        <h3>How Compounding Works</h3>
        <p>Simple interest only pays you on your initial deposit (the principal). Compound interest pays you on your principal AND on the interest you've already earned. As time goes on, this creates an exponential snowball effect that is the cornerstone of US retirement planning.</p>
        <p>The standard formula for compound interest is: <strong>A = P(1 + r/n)^(nt)</strong></p>

        <h3>Frequently Asked Questions</h3>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">What is a realistic APY?</summary>
          <p class="mt-2 text-slate-600">Historically, the US S&P 500 stock market index has returned an average of about 7% to 10% annually after adjusting for inflation. High-yield savings accounts typically offer 4% to 5% in high-rate environments.</p>
        </details>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">Does compounding frequency matter?</summary>
          <p class="mt-2 text-slate-600">Yes! Daily compounding will yield slightly more than monthly or annual compounding over the exact same period and interest rate.</p>
        </details>
      </div>`
  },
  {
    filename: 'retirement-estimator.html',
    title: 'Retirement Estimator',
    desc: 'Estimate your 401(k) and IRA growth with our US Retirement Estimator. Plan your financial independence early.',
    keywords: 'US retirement estimator, 401k growth calculator, Roth IRA calculator, FIRE movement calculator',
    icon: 'coffee',
    inputs: [
      { id: 'currentAge', label: 'Current Age', type: 'number', placeholder: '30', default: '' },
      { id: 'retireAge', label: 'Retirement Age', type: 'number', placeholder: '65', default: '' },
      { id: 'currentSaved', label: 'Currently Saved ($)', type: 'number', placeholder: '50000', default: '' },
      { id: 'monthlySave', label: 'Monthly Savings ($)', type: 'number', placeholder: '1000', default: '' }
    ],
    js: `
      const currentAge = parseFloat(document.getElementById('currentAge').value || 0);
      const retireAge = parseFloat(document.getElementById('retireAge').value || 0);
      const p = parseFloat(document.getElementById('currentSaved').value || 0);
      const pmt = parseFloat(document.getElementById('monthlySave').value || 0);
      const r = 0.07; // Assuming conservative 7% growth
      const t = Math.max(0, retireAge - currentAge);
      
      const total = p * Math.pow(1 + r/12, 12 * t) + pmt * ( (Math.pow(1 + r/12, 12 * t) - 1) / (r/12) );
      return 'Est. Nest Egg: $' + total.toFixed(2);
    `,
    content: `
      <div style="margin-top: 3rem;">
        <h2>Planning for a US Retirement</h2>
        <p>Retirement in the United States requires careful planning. Unlike generations past where corporate pensions were the norm, today's workers rely heavily on self-funded accounts like 401(k)s and IRAs. Our Retirement Estimator projects your future nest egg based on a conservative 7% annual market return.</p>
        
        <h3>The 4% Rule</h3>
        <p>A common guideline in US retirement planning is the "4% Rule." It suggests that if you withdraw 4% of your total portfolio value in your first year of retirement (and adjust for inflation thereafter), your money has a high probability of lasting 30 years.</p>
        <p>For example, if this calculator estimates a $1,000,000 nest egg, you could safely withdraw approximately $40,000 per year.</p>

        <h3>Frequently Asked Questions</h3>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">Should I max out my 401(k)?</summary>
          <p class="mt-2 text-slate-600">If your employer offers a matching contribution, you should always contribute at least enough to capture the full match—it is literally free money. After that, prioritizing a Roth IRA is often a smart move.</p>
        </details>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">Does this include Social Security?</summary>
          <p class="mt-2 text-slate-600">No, this calculator only estimates your personal investment portfolio. You will likely receive US Social Security benefits on top of this amount depending on your earning history.</p>
        </details>
      </div>`
  },
  {
    filename: 'salary-to-hourly-calculator.html',
    title: 'Salary to Hourly Calculator',
    desc: 'Convert your annual salary to an hourly wage instantly. Understand your true US compensation.',
    keywords: 'salary to hourly calculator, annual income to hourly wage, US wage converter',
    icon: 'clock',
    inputs: [
      { id: 'salary', label: 'Annual Salary ($)', type: 'number', placeholder: '60000', default: '' },
      { id: 'hours', label: 'Hours per Week', type: 'number', placeholder: '40', default: '40' }
    ],
    js: `
      const salary = parseFloat(document.getElementById('salary').value || 0);
      const hours = parseFloat(document.getElementById('hours').value || 0);
      let hourly = 0;
      if (hours > 0) {
        hourly = salary / (hours * 52);
      }
      return 'Hourly Wage: $' + hourly.toFixed(2);
    `,
    content: `
      <div style="margin-top: 3rem;">
        <h2>Understanding Your Hourly Value</h2>
        <p>In the US job market, compensation is often quoted as a flat annual salary. However, knowing your exact hourly wage is critical when negotiating job offers, taking on freelance work, or calculating the true value of unpaid overtime. Our Salary to Hourly Calculator makes this conversion instantly.</p>
        
        <h3>The Standard US Work Year</h3>
        <p>The standard full-time American work schedule is 40 hours per week. Because there are 52 weeks in a year, a standard work year consists of exactly 2,080 hours (40 x 52 = 2080).</p>
        <p>To do quick mental math, you can double your hourly wage and add three zeros to estimate your salary (e.g., $25/hour x 2 = 50 -> $50,000/year).</p>

        <h3>Frequently Asked Questions</h3>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">Are salaried employees eligible for overtime?</summary>
          <p class="mt-2 text-slate-600">Under the US Fair Labor Standards Act (FLSA), many salaried employees are "exempt" from overtime pay. However, if your salary falls below a certain federal threshold, you may still be legally entitled to time-and-a-half.</p>
        </details>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">Should I factor in paid time off (PTO)?</summary>
          <p class="mt-2 text-slate-600">This calculator assumes you are paid for 52 weeks a year, which includes paid vacation days. If you are an independent contractor taking unpaid weeks off, your effective hourly rate required to hit your target salary will be higher.</p>
        </details>
      </div>`
  },
  {
    filename: 'discount-sales-calculator.html',
    title: 'Discount & Sales Calculator',
    desc: 'Calculate final prices after discounts and coupons. Perfect for US holiday shopping like Black Friday.',
    keywords: 'discount calculator, sale price estimator, black friday calculator, coupon math tool',
    icon: 'tag',
    inputs: [
      { id: 'original', label: 'Original Price ($)', type: 'number', placeholder: '100', default: '' },
      { id: 'discount', label: 'Discount (%)', type: 'number', placeholder: '20', default: '' }
    ],
    js: `
      const orig = parseFloat(document.getElementById('original').value || 0);
      const disc = parseFloat(document.getElementById('discount').value || 0) / 100;
      const finalPrice = orig * (1 - disc);
      const saved = orig - finalPrice;
      return 'Final Price: $' + finalPrice.toFixed(2) + ' (Saved $' + saved.toFixed(2) + ')';
    `,
    content: `
      <div style="margin-top: 3rem;">
        <h2>Mastering Retail Math</h2>
        <p>During massive US shopping events like Black Friday, Cyber Monday, and back-to-school sales, retailers aggressively promote percentage discounts. Our Discount & Sales Calculator cuts through the marketing noise, showing you exactly what you will pay at the register and exactly how much cash you are saving.</p>
        
        <h3>How to Calculate Discounts Manually</h3>
        <p>If you don't have our calculator handy in a store, the easiest way to calculate a discount mentally is the "10% rule." Move the decimal point on the price one spot to the left to find 10%. For a 20% discount on a $45 item, 10% is $4.50. Double that to get $9.00 off.</p>

        <h3>Frequently Asked Questions</h3>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">How do "stackable" discounts work?</summary>
          <p class="mt-2 text-slate-600">If a store offers "20% off already reduced clearance items that are 50% off," you DO NOT get 70% off. You take 50% off the original price, and then take 20% off that new, lower price.</p>
        </details>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">Does this include sales tax?</summary>
          <p class="mt-2 text-slate-600">No. In the US, sales tax is almost always applied to the final discounted price, not the original sticker price. You can use our Sales Tax Calculator to find the ultimate checkout price.</p>
        </details>
      </div>`
  },
  {
    filename: 'bmr-calculator.html',
    title: 'BMR Calculator',
    desc: 'Calculate your Basal Metabolic Rate (BMR) to understand your daily calorie burn. Essential US health tool.',
    keywords: 'BMR calculator, basal metabolic rate, daily calorie burn, tdee calculator, weight loss calorie counter',
    icon: 'activity',
    inputs: [
      { id: 'gender', label: 'Gender (M=1, F=2)', type: 'number', placeholder: '1', default: '1' },
      { id: 'weight', label: 'Weight (lbs)', type: 'number', placeholder: '180', default: '' },
      { id: 'height', label: 'Height (inches)', type: 'number', placeholder: '70', default: '' },
      { id: 'age', label: 'Age', type: 'number', placeholder: '30', default: '' }
    ],
    js: `
      const g = parseInt(document.getElementById('gender').value || 1);
      const w = parseFloat(document.getElementById('weight').value || 0) * 0.453592;
      const h = parseFloat(document.getElementById('height').value || 0) * 2.54;
      const a = parseFloat(document.getElementById('age').value || 0);
      let bmr = 0;
      if(g === 1) { 
         bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
      } else { 
         bmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
      }
      return 'BMR: ' + Math.round(bmr) + ' Calories/Day';
    `,
    content: `
      <div style="margin-top: 3rem;">
        <h2>Understanding Your Basal Metabolic Rate</h2>
        <p>Your Basal Metabolic Rate (BMR) is the total number of calories your body requires to perform basic, life-sustaining functions (like breathing, circulating blood, and cellular production) if you were to rest in bed for a full 24 hours. Our US-standard BMR Calculator uses the Mifflin-St Jeor equation, considered the most accurate formula by the American Dietetic Association.</p>
        
        <h3>Why BMR Matters for Weight Loss</h3>
        <p>Understanding your BMR is the very first step in any weight management journey. Your BMR makes up about 60% to 75% of your total daily calorie burn. By adding your physical activity levels to your BMR, you calculate your Total Daily Energy Expenditure (TDEE).</p>
        <p>To lose weight safely, health experts generally recommend eating 300 to 500 calories below your TDEE (but never below your BMR without medical supervision).</p>

        <h3>Frequently Asked Questions</h3>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">How can I increase my BMR?</summary>
          <p class="mt-2 text-slate-600">The most effective way to permanently increase your BMR is by building lean muscle mass through resistance training. Muscle tissue burns more calories at rest than fat tissue.</p>
        </details>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">Is the Mifflin-St Jeor equation accurate for everyone?</summary>
          <p class="mt-2 text-slate-600">While it is the gold standard for the general population, it may overestimate calories for obese individuals and underestimate them for elite athletes with massive muscle mass.</p>
        </details>
      </div>`
  },
  {
    filename: 'auto-depreciation-calculator.html',
    title: 'Auto Depreciation Calculator',
    desc: 'Estimate how much value your car will lose over time. Crucial tool for US car buyers.',
    keywords: 'car depreciation calculator, vehicle value loss, auto loan negative equity, US car buying guide',
    icon: 'car',
    inputs: [
      { id: 'price', label: 'Car Purchase Price ($)', type: 'number', placeholder: '35000', default: '' },
      { id: 'years', label: 'Years Owned', type: 'number', placeholder: '5', default: '' }
    ],
    js: `
      const p = parseFloat(document.getElementById('price').value || 0);
      const y = parseFloat(document.getElementById('years').value || 0);
      let val = p;
      if (y > 0) val = val * 0.80;
      if (y > 1) val = val * Math.pow(0.85, y - 1);
      const lost = p - val;
      return 'Est. Value: $' + val.toFixed(2) + ' (Lost: $' + lost.toFixed(2) + ')';
    `,
    content: `
      <div style="margin-top: 3rem;">
        <h2>The Hidden Cost of US Car Ownership</h2>
        <p>For most Americans, a vehicle is the second largest purchase they will make in their lifetime, trailing only a house. However, unlike a house which generally appreciates, cars are depreciating assets. Our Auto Depreciation Calculator estimates how much value your vehicle will lose over time using US industry standard averages.</p>
        
        <h3>The Depreciation Curve</h3>
        <p>A new car loses value the second you drive it off the dealership lot. Historically, a new car drops in value by about 20% in the first year alone. For years two through five, cars typically lose an additional 15% of their value annually. By the end of five years, a standard car is usually worth only 40% of its original purchase price.</p>

        <h3>Frequently Asked Questions</h3>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">How can I avoid being "upside down" on my loan?</summary>
          <p class="mt-2 text-slate-600">Because cars depreciate so rapidly in the first two years, taking out a 72-month loan with zero down guarantees you will owe more than the car is worth (negative equity). To avoid this, make a 20% down payment and finance for 48 months or less.</p>
        </details>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">Do all cars depreciate at the same rate?</summary>
          <p class="mt-2 text-slate-600">No. Luxury sedans tend to depreciate the fastest, while reliable pickup trucks (like the Toyota Tacoma) and certain sports cars hold their value incredibly well.</p>
        </details>
      </div>`
  },
  {
    filename: 'roi-calculator.html',
    title: 'ROI Calculator',
    desc: 'Measure the Return on Investment (ROI) for your business or personal finances.',
    keywords: 'ROI calculator, return on investment formula, business profitability, stock market ROI',
    icon: 'briefcase',
    inputs: [
      { id: 'invested', label: 'Amount Invested ($)', type: 'number', placeholder: '10000', default: '' },
      { id: 'returned', label: 'Amount Returned ($)', type: 'number', placeholder: '12500', default: '' }
    ],
    js: `
      const i = parseFloat(document.getElementById('invested').value || 0);
      const r = parseFloat(document.getElementById('returned').value || 0);
      let roi = 0;
      if (i > 0) {
        roi = ((r - i) / i) * 100;
      }
      return 'ROI: ' + roi.toFixed(2) + '%';
    `,
    content: `
      <div style="margin-top: 3rem;">
        <h2>Evaluating Financial Success with ROI</h2>
        <p>Return on Investment (ROI) is the ultimate metric for evaluating the profitability of an investment. Whether you are buying stocks on Wall Street, purchasing rental real estate, or funding a US marketing campaign for your small business, our ROI Calculator gives you a clear, percentage-based look at your success.</p>
        
        <h3>How ROI is Calculated</h3>
        <p>The mathematical formula for ROI is universal and beautifully simple:</p>
        <p><strong>ROI = [(Net Profit) / Cost of Investment] × 100</strong></p>
        <p>By converting your raw dollar profit into a percentage, you can compare the efficiency of wildly different investments. For example, making $100 on a $1,000 investment (10% ROI) is far more efficient than making $100 on a $10,000 investment (1% ROI).</p>

        <h3>Frequently Asked Questions</h3>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">What is a "good" ROI?</summary>
          <p class="mt-2 text-slate-600">A "good" ROI depends entirely on the risk profile. For a totally risk-free US Treasury Bond, a 4% ROI is excellent. For a highly volatile tech startup investment, investors might demand a 30% ROI to justify the risk.</p>
        </details>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">Does ROI account for time?</summary>
          <p class="mt-2 text-slate-600">Traditional ROI does not factor in time. A 100% ROI looks incredible, but if it took 40 years to achieve, it's actually a terrible investment. For time-based evaluations, investors use "Annualized ROI".</p>
        </details>
      </div>`
  },
  {
    filename: 'date-duration-calculator.html',
    title: 'Date Duration Calculator',
    desc: 'Calculate the exact number of days between two dates. Essential utility for planning and tracking.',
    keywords: 'days between dates calculator, date duration, time calculator, day counter',
    icon: 'calendar',
    inputs: [
      { id: 'start', label: 'Start Date', type: 'date', default: '' },
      { id: 'end', label: 'End Date', type: 'date', default: '' }
    ],
    js: `
      const d1 = new Date(document.getElementById('start').value);
      const d2 = new Date(document.getElementById('end').value);
      const diffTime = Math.abs(d2 - d1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return 'Difference: ' + diffDays + ' Days';
    `,
    content: `
      <div style="margin-top: 3rem;">
        <h2>Mastering Time Tracking</h2>
        <p>Have you ever needed to know exactly how many days remain until a project deadline, a vacation, or a legal filing? The human calendar, with its irregular months and leap years, makes mental date math notoriously difficult. Our Date Duration Calculator instantly finds the absolute difference between any two dates.</p>
        
        <h3>Common Uses in the US</h3>
        <ul>
          <li><strong>Legal & HR Compliance:</strong> US HR departments frequently use duration calculators to track the 90-day probationary period for new hires or FMLA (Family and Medical Leave Act) usage.</li>
          <li><strong>Finance:</strong> Calculating accrued interest on short-term loans or Treasury bills requires knowing the exact day count.</li>
          <li><strong>Event Planning:</strong> Wedding planners and project managers rely on exact day counts to build reverse-engineered timelines.</li>
        </ul>

        <h3>Frequently Asked Questions</h3>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">Does this calculator include the end date?</summary>
          <p class="mt-2 text-slate-600">Standard mathematical date calculations measure the distance *between* the dates. If you count Monday to Tuesday, the mathematical difference is 1 day. If you need to count "inclusive" days (e.g., booking a hotel for Monday AND Tuesday), you should manually add 1 to the result.</p>
        </details>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">Does it handle leap years correctly?</summary>
          <p class="mt-2 text-slate-600">Yes! The calculator converts both dates into raw Unix time (milliseconds since 1970) before doing the math, which natively handles all leap year anomalies perfectly.</p>
        </details>
      </div>`
  },
  {
    filename: 'pregnancy-due-date-calculator.html',
    title: 'Pregnancy Due Date Calculator',
    desc: 'Calculate your estimated due date (EDD) quickly and accurately using standard medical formulas.',
    keywords: 'pregnancy due date calculator, EDD calculator, conception date, trimester timeline',
    icon: 'heart',
    inputs: [
      { id: 'lmp', label: 'First day of last period', type: 'date', default: '' }
    ],
    js: `
      const lmp = new Date(document.getElementById('lmp').value);
      if(isNaN(lmp.getTime())) return 'Please enter a valid date.';
      const edd = new Date(lmp.getTime() + (280 * 24 * 60 * 60 * 1000));
      return 'Est. Due Date: ' + edd.toDateString();
    `,
    content: `
      <div style="margin-top: 3rem;">
        <h2>Tracking Your Pregnancy Timeline</h2>
        <p>Finding out you are expecting is one of life's greatest moments. One of the very first questions expectant mothers in the US ask is, "When is the baby due?" Our Pregnancy Due Date Calculator uses the standard medical formula adopted by the American College of Obstetricians and Gynecologists (ACOG) to estimate your due date.</p>
        
        <h3>Naegele's Rule</h3>
        <p>Most healthcare providers estimate your Estimated Due Date (EDD) using a simple formula called Naegele's Rule. The formula is:</p>
        <p><strong>First Day of Last Menstrual Period (LMP) + 7 Days - 3 Months + 1 Year = EDD</strong></p>
        <p>Simply put, human pregnancy lasts about 280 days (or 40 weeks) starting from the first day of your last menstrual cycle.</p>

        <h3>Frequently Asked Questions</h3>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">How accurate is this due date?</summary>
          <p class="mt-2 text-slate-600">It is an *estimate*. Statistically, only about 4% to 5% of babies in the US are born exactly on their estimated due date. It is perfectly normal to deliver anywhere between week 37 and week 42.</p>
        </details>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">What if I know my exact conception date?</summary>
          <p class="mt-2 text-slate-600">If you know the exact day of conception (e.g., through IVF tracking), you can calculate the due date by adding exactly 266 days to the conception date.</p>
        </details>
      </div>`
  },
  {
    filename: 'loan-amortization-calculator.html',
    title: 'Loan Amortization Calculator',
    desc: 'Generate a detailed amortization schedule for any US loan. See exactly how much interest you are paying.',
    keywords: 'loan amortization schedule, interest breakdown calculator, US personal loan calculator',
    icon: 'bar-chart',
    inputs: [
      { id: 'principal', label: 'Loan Amount ($)', type: 'number', placeholder: '20000', default: '' },
      { id: 'rate', label: 'Interest Rate (%)', type: 'number', placeholder: '5', default: '5', step: '0.1' },
      { id: 'months', label: 'Term in Months', type: 'number', placeholder: '60', default: '' }
    ],
    js: `
      const p = parseFloat(document.getElementById('principal').value || 0);
      const r = parseFloat(document.getElementById('rate').value || 0) / 100 / 12;
      const n = parseFloat(document.getElementById('months').value || 0);
      let m = 0;
      if (r === 0) {
        m = p / n;
      } else {
        m = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }
      const totalInterest = (m * n) - p;
      return 'Monthly: $' + m.toFixed(2) + ' (Interest: $' + totalInterest.toFixed(2) + ')';
    `,
    content: `
      <div style="margin-top: 3rem;">
        <h2>The Mechanics of Loan Amortization</h2>
        <p>When you take out an installment loan in the US—whether it is a personal loan, a car loan, or a mortgage—you pay it back via amortization. Our Loan Amortization Calculator reveals the hidden mechanics of your debt, showing you exactly how much of your monthly payment goes to the bank (interest) and how much actually pays down your debt (principal).</p>
        
        <h3>How Amortization Schedules Work</h3>
        <p>In a standard amortizing loan, your monthly payment amount never changes. However, the *ratio* of interest to principal within that payment changes every single month. In the early years of a loan, your payments consist almost entirely of interest. As the loan matures, the balance shifts, and you begin aggressively paying down the principal.</p>
        <p>This front-loaded interest structure is why paying extra toward your principal in the first few years of a loan is so incredibly powerful.</p>

        <h3>Frequently Asked Questions</h3>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">How can I save money on an amortized loan?</summary>
          <p class="mt-2 text-slate-600">The best way to save money is to make extra principal-only payments. Because interest is calculated based on the outstanding principal balance every month, lowering the principal faster immediately reduces the total interest the bank can charge you.</p>
        </details>
        <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
          <summary class="cursor-pointer font-semibold">What is the difference between simple interest and amortized interest?</summary>
          <p class="mt-2 text-slate-600">Amortized interest is calculated monthly against a declining balance. Simple interest is usually calculated upfront against the total original loan amount, which is often much more expensive for the consumer.</p>
        </details>
      </div>`
  }
];

// Write the files using simple string replace on the template
for (const tool of newTools) {
  let inputsHTML = '';
  for (let i = 0; i < tool.inputs.length; i++) {
    const input = tool.inputs[i];
    inputsHTML += '<div class="input-group">\\n' +
                  '  <label class="input-label">' + input.label + '</label>\\n' +
                  '  <input type="' + input.type + '" id="' + input.id + '" class="input-field" placeholder="' + (input.placeholder || '') + '" value="' + (input.default || '') + '" ' + (input.step ? 'step="'+input.step+'"' : '') + ' required>\\n' +
                  '</div>\\n';
  }

  let finalHTML = templateStr;
  finalHTML = finalHTML.replace(/\{\{TITLE\}\}/g, tool.title);
  finalHTML = finalHTML.replace(/\{\{DESC\}\}/g, tool.desc);
  finalHTML = finalHTML.replace(/\{\{KEYWORDS\}\}/g, tool.keywords);
  finalHTML = finalHTML.replace(/\{\{FILENAME\}\}/g, tool.filename);
  finalHTML = finalHTML.replace(/\{\{INPUTS\}\}/g, inputsHTML);
  finalHTML = finalHTML.replace(/\{\{CONTENT\}\}/g, tool.content);
  finalHTML = finalHTML.replace(/\{\{JS\}\}/g, tool.js);
  
  const filePath = path.join(toolsDir, tool.filename);
  fs.writeFileSync(filePath, finalHTML);
  console.log('Created ' + tool.filename);
}

// Generate the HTML snippet to append to index.html's grid
let gridHTML = '';
for (const tool of newTools) {
  gridHTML += `
                <a href="/tools/${tool.filename}" style="text-decoration: none;">
                  <div class="rounded-lg border border-slate-200 bg-slate-50 p-6 transition-all hover:border-blue-400 hover:shadow-lg" style="height: 100%;">
                    <div style="color: var(--accent-primary);"><i data-lucide="${tool.icon}" style="width: 2.5rem; height: 2.5rem;"></i></div>
                    <h3 class="mt-4 text-xl font-semibold text-slate-900">${tool.title}</h3>
                    <p class="mt-2 text-slate-600">${tool.desc}</p>
                  </div>
                </a>`;
}

// Save snippet so we can easily inject it
fs.writeFileSync(path.join(__dirname, 'new_tools_grid.txt'), gridHTML);
console.log('Done generating new tools.');
