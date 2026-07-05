const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'tools');

const existingToolsContent = {
  'paycheck-calculator.html': `
  <div style="margin-top: 3rem;">
    <h2>Understanding Your Paycheck and US Taxes</h2>
    <p>Calculating your exact take-home pay can be complex due to the intricate nature of the United States tax system. When you receive a salary offer or an hourly wage, the gross amount is rarely what you actually take home. Our US Salary Tax Calculator is designed to give you a highly accurate estimate of your net income after all federal, state, and local deductions are applied.</p>
    
    <h3>How Take-Home Pay is Calculated</h3>
    <p>Your gross income undergoes several mandatory deductions before it hits your bank account. The primary deductions include:</p>
    <ul>
      <li><strong>Federal Income Tax:</strong> The US uses a progressive tax system, meaning different portions of your income are taxed at different rates (brackets).</li>
      <li><strong>FICA Taxes (Social Security & Medicare):</strong> A flat percentage of your income goes towards Social Security (6.2% up to a wage base limit) and Medicare (1.45% with an additional 0.9% for high earners).</li>
      <li><strong>State Income Tax:</strong> Depending on where you live, state taxes can range from 0% (in states like Texas, Florida, and Nevada) to over 13% (in California).</li>
    </ul>

    <h3>Why Use a W-2 Paycheck Estimator?</h3>
    <p>For W-2 employees, employers automatically withhold taxes from every paycheck. However, adjusting your W-4 form can change how much is withheld. Using an after-tax income estimator helps you budget effectively for rent, groceries, and savings. It prevents surprises when you start a new job or receive a raise.</p>

    <h3>Frequently Asked Questions</h3>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">What is the difference between gross and net pay?</summary>
      <p class="mt-2 text-slate-600">Gross pay is the total amount you earn before any taxes or deductions. Net pay (take-home pay) is the amount you actually receive in your paycheck after all withholdings.</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">How do state taxes affect my take-home pay?</summary>
      <p class="mt-2 text-slate-600">State taxes vary wildly. If you move from a zero-income-tax state like Washington to a high-tax state like New York, your take-home pay will decrease significantly even if your gross salary remains identical.</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">Are pre-tax deductions included?</summary>
      <p class="mt-2 text-slate-600">Pre-tax deductions like 401(k) contributions or health insurance premiums lower your taxable income, which can reduce your overall tax burden while securing your future.</p>
    </details>
  </div>`,
  'mortgage-calculator.html': `
  <div style="margin-top: 3rem;">
    <h2>Understanding US Mortgage EMI and Home Loans</h2>
    <p>Buying a home is one of the most significant financial decisions you will ever make. Our US Mortgage EMI (Equated Monthly Installment) Calculator helps you demystify the complex world of home financing. By estimating your monthly payments based on current US mortgage rates, you can confidently determine how much house you can afford.</p>
    
    <h3>The Components of a Mortgage Payment (PITI)</h3>
    <p>When you take out a home loan, your monthly payment typically consists of four main elements, commonly referred to as PITI:</p>
    <ul>
      <li><strong>Principal:</strong> The portion of your payment that goes towards paying down the actual loan balance.</li>
      <li><strong>Interest:</strong> The cost of borrowing the money, calculated based on your interest rate.</li>
      <li><strong>Taxes:</strong> Property taxes assessed by your local county or municipality, usually collected in an escrow account.</li>
      <li><strong>Insurance:</strong> Homeowners insurance to protect the property, and potentially Private Mortgage Insurance (PMI) if your down payment is less than 20%.</li>
    </ul>

    <h3>How Different Loan Terms Affect You</h3>
    <p>In the United States, the 30-year fixed-rate mortgage is the most popular option, offering lower monthly payments stretched over three decades. A 15-year fixed-rate mortgage will have much higher monthly payments, but you will pay significantly less total interest over the life of the loan and build equity twice as fast.</p>

    <h3>Frequently Asked Questions</h3>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">What is an FHA Loan?</summary>
      <p class="mt-2 text-slate-600">An FHA loan is a mortgage insured by the Federal Housing Administration. It allows buyers to purchase a home with a down payment as low as 3.5%, making it popular for first-time homebuyers in the US.</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">What is PMI and how do I avoid it?</summary>
      <p class="mt-2 text-slate-600">Private Mortgage Insurance (PMI) is required by lenders if your down payment is less than 20% of the home's purchase price. You can avoid it by saving up a 20% down payment.</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">How does the interest rate affect my buying power?</summary>
      <p class="mt-2 text-slate-600">Even a 1% change in your mortgage interest rate can significantly impact your monthly payment and reduce your total buying power by tens of thousands of dollars.</p>
    </details>
  </div>`,
  'sales-tax-calculator.html': `
  <div style="margin-top: 3rem;">
    <h2>Understanding US State and Local Sales Tax</h2>
    <p>Unlike many countries that utilize a national Value Added Tax (VAT), the United States utilizes a decentralized sales tax system. This means that retail checkout taxes can vary wildly not just from state to state, but from city to city. Our US State Sales Tax Calculator helps you instantly estimate the true checkout cost of your purchases.</p>
    
    <h3>How US Sales Tax Works</h3>
    <p>Sales tax in the US is typically a combination of:</p>
    <ul>
      <li><strong>State Base Tax:</strong> The baseline sales tax applied uniformly across the state. (e.g., California's base rate).</li>
      <li><strong>County Tax:</strong> Additional taxes levied by the county government.</li>
      <li><strong>City/Local District Tax:</strong> Municipalities often add their own fractional percentages to fund local initiatives like transportation or schools.</li>
    </ul>

    <h3>Why a Checkout Tax Estimator is Essential</h3>
    <p>Because price tags in US retail stores almost never include sales tax, the sticker price is not the final price. Whether you are buying a $5 coffee or a $30,000 car, knowing the combined local tax rate prevents checkout surprises. It is especially vital for businesses calculating use taxes or consumers making large cross-border purchases.</p>

    <h3>Frequently Asked Questions</h3>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">Do all US states have a sales tax?</summary>
      <p class="mt-2 text-slate-600">No. Five US states do not have a statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon (though some municipalities in Alaska charge local taxes).</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">Are groceries taxed?</summary>
      <p class="mt-2 text-slate-600">It depends on the state. Many states exempt unprepared food (groceries) and prescription drugs from sales tax to reduce the burden on essential goods.</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">How do I calculate the total price manually?</summary>
      <p class="mt-2 text-slate-600">To calculate it manually, convert the tax percentage to a decimal (e.g., 8% = 0.08) and multiply it by the item price. Add that result to the original price to get the total.</p>
    </details>
  </div>`,
  'tip-calculator.html': `
  <div style="margin-top: 3rem;">
    <h2>Mastering US Tipping Etiquette</h2>
    <p>Tipping in the United States is a fundamental part of the service industry economy. Unlike in many European or Asian countries where service is included in the price or tipping is discouraged, US servers rely heavily on gratuity to make a living wage. Our Restaurant Tip Calculator makes it easy to split the bill and calculate the perfect gratuity.</p>
    
    <h3>Standard US Gratuity Rates</h3>
    <p>Navigating tipping etiquette can be confusing. Here is the generally accepted standard for tipping in the US in 2026:</p>
    <ul>
      <li><strong>15% - Minimum:</strong> For average or sub-par service.</li>
      <li><strong>18% - Standard:</strong> For good, standard service at a sit-down restaurant.</li>
      <li><strong>20% to 25% - Excellent:</strong> For outstanding service, fine dining, or large parties.</li>
      <li><strong>10% to 15% - Takeout/Delivery:</strong> For delivery drivers or complex takeout orders.</li>
    </ul>

    <h3>Why Splitting the Bill Can Be Tricky</h3>
    <p>When dining with a large group, splitting the bill evenly requires careful math to ensure the server isn't shortchanged. Many restaurants automatically apply an 18% to 20% gratuity to parties of 6 or more. Our tool automatically divides the total (including your chosen tip percentage) by the number of people in your party.</p>

    <h3>Frequently Asked Questions</h3>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">Do I tip on the pre-tax or post-tax amount?</summary>
      <p class="mt-2 text-slate-600">Traditionally, etiquette dictates that you tip on the pre-tax subtotal. However, many consumers simply calculate the tip based on the final post-tax total for convenience.</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">Do I need to tip for counter service or coffee?</summary>
      <p class="mt-2 text-slate-600">Tipping at counter-service cafes or for a simple cup of coffee is optional. If you choose to tip, leaving $1 or 10-15% on the digital screen is appreciated but not strictly required like sit-down dining.</p>
    </details>
  </div>`,
  'bmi-calculator.html': `
  <div style="margin-top: 3rem;">
    <h2>Understanding the US Standard BMI Calculator</h2>
    <p>The Body Mass Index (BMI) is a widely used screening tool in the United States healthcare system. By comparing your weight in relation to your height, our BMI calculator provides a quick estimate of your total body fat. While it isn't a diagnostic tool, it is the standard metric used by doctors to assess whether you fall into a healthy weight category.</p>
    
    <h3>How is BMI Calculated?</h3>
    <p>The standard mathematical formula for BMI using US customary units (pounds and inches) is:</p>
    <p><strong>BMI = [Weight (lbs) / Height (inches)²] × 703</strong></p>
    <p>Our tool automates this complex math, providing you with an instant reading and placing you into one of the standard categories defined by the Centers for Disease Control and Prevention (CDC).</p>

    <h3>BMI Categories</h3>
    <ul>
      <li><strong>Underweight:</strong> BMI less than 18.5</li>
      <li><strong>Normal Weight:</strong> BMI between 18.5 and 24.9</li>
      <li><strong>Overweight:</strong> BMI between 25 and 29.9</li>
      <li><strong>Obese:</strong> BMI of 30 or greater</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">Is BMI accurate for everyone?</summary>
      <p class="mt-2 text-slate-600">No. BMI is a general screening tool and does not differentiate between muscle mass and fat mass. Bodybuilders or highly athletic individuals may be classified as "overweight" or "obese" despite having very low body fat.</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">Can children use this BMI calculator?</summary>
      <p class="mt-2 text-slate-600">Standard BMI categories are only for adults ages 20 and older. For children and teens, BMI is age- and sex-specific and requires a different percentile-based calculation.</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">What should I do if my BMI is high?</summary>
      <p class="mt-2 text-slate-600">A high BMI suggests an increased risk for conditions like heart disease, high blood pressure, and type 2 diabetes. You should consult with a healthcare provider for a comprehensive health assessment.</p>
    </details>
  </div>`,
  'age-calculator.html': `
  <div style="margin-top: 3rem;">
    <h2>Chronological Age and Time Tracking</h2>
    <p>Have you ever needed to know your exact age down to the days? Whether you are filling out official government forms, applying for life insurance in the US, or simply curious about how many days you've been alive, our Exact Chronological Age Calculator provides the most precise date-of-birth measurement available.</p>
    
    <h3>Why Exact Age Matters</h3>
    <p>In many legal and medical scenarios, "close enough" isn't sufficient. Knowing your exact age in years, months, and days is critical for:</p>
    <ul>
      <li><strong>Insurance Policies:</strong> Life and health insurance premiums are often calculated based on your "nearest age" or exact chronological age down to the month.</li>
      <li><strong>Pediatric Medicine:</strong> Doctors track infant development in exact months and weeks.</li>
      <li><strong>Retirement Planning:</strong> Social Security and Medicare eligibility in the US trigger at very specific ages (e.g., 62, 65, and 67).</li>
    </ul>

    <h3>How the Calculator Works</h3>
    <p>The calculator uses the native JavaScript Date API to calculate the absolute difference in milliseconds between the current date and your inputted birth date. It then algorithms mathematically convert those milliseconds back into standard Gregorian calendar units (Years, Months, Days) factoring in leap years.</p>

    <h3>Frequently Asked Questions</h3>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">Does this factor in leap years?</summary>
      <p class="mt-2 text-slate-600">Yes! The calculation relies on standard chronological tracking, which inherently accounts for the extra day in February during leap years.</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">Why do I need to know my age in months?</summary>
      <p class="mt-2 text-slate-600">Age in months is primarily used for infants and toddlers to track developmental milestones. It can also be useful for precise countdowns to major life events like retirement.</p>
    </details>
  </div>`,
  'gpa-calculator.html': `
  <div style="margin-top: 3rem;">
    <h2>Understanding the US GPA System</h2>
    <p>The Grade Point Average (GPA) is the standard measurement of academic achievement in the United States. Whether you are a high school student applying to colleges, or a university student aiming for honors, our US College GPA Calculator helps you accurately track your academic standing on the standard 4.0 scale.</p>
    
    <h3>How is a US GPA Calculated?</h3>
    <p>In the US education system, letter grades are converted into numerical points. These points are then multiplied by the number of credit hours for each course. The sum of these quality points is divided by the total number of credit hours attempted.</p>
    <ul>
      <li><strong>A:</strong> 4.0 Points</li>
      <li><strong>B:</strong> 3.0 Points</li>
      <li><strong>C:</strong> 2.0 Points</li>
      <li><strong>D:</strong> 1.0 Point</li>
      <li><strong>F:</strong> 0.0 Points</li>
    </ul>

    <h3>Weighted vs. Unweighted GPA</h3>
    <p>Our tool calculates an <strong>Unweighted GPA</strong>, which tops out at a 4.0. Many US high schools use a <em>Weighted GPA</em> system that awards extra points (usually 1.0 extra) for Advanced Placement (AP) or Honors courses, meaning a student could potentially achieve a GPA higher than 4.0.</p>

    <h3>Frequently Asked Questions</h3>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">What is a good GPA for US colleges?</summary>
      <p class="mt-2 text-slate-600">While it varies by institution, highly competitive universities typically look for an unweighted GPA of 3.8 or higher. State universities generally look for a 3.0 or above.</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">Do credit hours matter?</summary>
      <p class="mt-2 text-slate-600">Absolutely. A grade in a 4-credit intensive science lab will have a much larger impact on your cumulative GPA than a grade in a 1-credit elective course. That is why our calculator requires both the grade and the credits.</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">What happens if I get a plus or minus (e.g., B+)?</summary>
      <p class="mt-2 text-slate-600">Most US universities use fractional points for plus/minus grades (e.g., a B+ is often a 3.33, and an A- is a 3.67). Check your specific school's student handbook for their exact grading scale.</p>
    </details>
  </div>`,
  'percentage-calculator.html': `
  <div style="margin-top: 3rem;">
    <h2>Mastering Percentage Calculations</h2>
    <p>Percentages are a fundamental part of daily life, finance, and statistics. From calculating the discount on a retail item to understanding the percent change in a stock portfolio, our Percentage Increase and Decrease Calculator is the ultimate math percent tool for instant, reliable answers.</p>
    
    <h3>Common Use Cases for Percentages</h3>
    <p>Understanding how to manipulate percentages is crucial for:</p>
    <ul>
      <li><strong>Retail & Shopping:</strong> Instantly calculating how much you will save during a 30% off sale.</li>
      <li><strong>Finance & Investing:</strong> Determining the percentage yield on a dividend or the percent growth of a 401(k) portfolio.</li>
      <li><strong>Business Metrics:</strong> Calculating quarter-over-quarter percentage increases in revenue or traffic.</li>
    </ul>

    <h3>The Mathematics of Percent Change</h3>
    <p>To calculate the percentage increase or decrease between two numbers manually, you use the following formula:</p>
    <p><strong>Percent Change = [(New Value - Old Value) / |Old Value|] × 100</strong></p>
    <p>A positive result indicates a percentage increase, while a negative result indicates a percentage decrease. Our calculator handles the absolute value logic automatically to prevent errors.</p>

    <h3>Frequently Asked Questions</h3>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">What does "percent" actually mean?</summary>
      <p class="mt-2 text-slate-600">The word "percent" literally translates from Latin as "per one hundred." So, 25 percent (25%) simply means 25 out of every 100.</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">Are percentage increase and decrease symmetrical?</summary>
      <p class="mt-2 text-slate-600">No! This is a common mathematical trap. If a $100 stock drops by 50%, it is now worth $50. To get back to $100, it must increase by 100%, not 50%.</p>
    </details>
  </div>`,
  'word-counter.html': `
  <div style="margin-top: 3rem;">
    <h2>The Importance of Word and Character Counting</h2>
    <p>In the digital age, length matters. Whether you are an academic writing a strict 500-word essay, a social media manager crafting a tweet under 280 characters, or an SEO specialist optimizing meta descriptions, our Word and Character Counter provides instant, real-time metrics for your text.</p>
    
    <h3>Key Metrics Analyzed</h3>
    <p>Our tool goes beyond basic word counting to provide a comprehensive analysis of your text:</p>
    <ul>
      <li><strong>Word Count:</strong> The total number of words separated by spaces. Essential for essays, articles, and book chapters.</li>
      <li><strong>Character Count:</strong> The absolute number of keystrokes. Critical for social media platforms (Twitter, LinkedIn) and SMS marketing limits.</li>
    </ul>

    <h3>Reading Time Estimation</h3>
    <p>Modern internet users have short attention spans. Providing an estimated "Reading Time" at the top of an article greatly improves user engagement. Our tool estimates reading time based on the average adult reading speed of approximately 225 to 250 words per minute.</p>

    <h3>Frequently Asked Questions</h3>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">Do spaces count as characters?</summary>
      <p class="mt-2 text-slate-600">Yes. In standard computing and character limit rules (like on Twitter), a space is considered a character. Our tool counts every single keystroke.</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">Is my text saved or stored?</summary>
      <p class="mt-2 text-slate-600">No. Our word counter relies entirely on client-side JavaScript. Your text is processed directly in your browser and is never sent to a server, ensuring 100% privacy.</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">How long is a 1,000-word essay?</summary>
      <p class="mt-2 text-slate-600">Using standard formatting (12pt font, double-spaced, 1-inch margins), a 1,000-word essay is approximately 3.5 to 4 pages long.</p>
    </details>
  </div>`,
  'car-loan-calculator.html': `
  <div style="margin-top: 3rem;">
    <h2>Navigating US Auto Loans and Dealership Financing</h2>
    <p>Buying a car in the United States often involves navigating confusing dealership financing terms. Our US Auto Loan EMI Calculator empowers you to estimate your exact monthly car payment before you ever step foot on the lot, protecting you from hidden markups and extended loan traps.</p>
    
    <h3>The Trap of the "Monthly Payment" Focus</h3>
    <p>A common tactic in auto sales is to ask the buyer, "What monthly payment are you looking for?" If you answer with a number, the dealer can stretch the loan term out to 72 or even 84 months to hit that number, burying you in negative equity (being "upside down" on the loan). Always negotiate based on the total purchase price of the vehicle, not the monthly payment.</p>

    <h3>Key Factors in Car Financing</h3>
    <ul>
      <li><strong>Principal (Vehicle Price):</strong> The negotiated price of the car plus taxes and dealership fees.</li>
      <li><strong>Trade-In Value:</strong> The amount the dealer gives you for your old car, which directly reduces the principal amount you need to finance.</li>
      <li><strong>Loan Term:</strong> Auto loans typically range from 36 to 72 months. Longer terms mean lower monthly payments but significantly more interest paid overall.</li>
    </ul>

    <h3>Frequently Asked Questions</h3>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">What is a good auto loan interest rate?</summary>
      <p class="mt-2 text-slate-600">Interest rates depend heavily on your credit score and the broader economic environment. Generally, a rate between 4% and 7% is considered good for a new car in the US market, while used car rates are typically 1-3% higher.</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">Should I put money down on a car loan?</summary>
      <p class="mt-2 text-slate-600">Yes. It is highly recommended to put at least 10% to 20% down. Cars depreciate rapidly in the first year, and a solid down payment prevents you from owing more than the car is worth if it is totaled.</p>
    </details>
    <details class="mb-4 group rounded-lg border border-slate-200 bg-white p-4">
      <summary class="cursor-pointer font-semibold">Does this calculator include sales tax?</summary>
      <p class="mt-2 text-slate-600">To get an accurate result, you should include your state's vehicle sales tax and expected dealership doc fees into the total "Vehicle Price" field.</p>
    </details>
  </div>`
};

for (const [file, extraContent] of Object.entries(existingToolsContent)) {
  const filePath = path.join(toolsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if we already injected to prevent duplication
    if (!content.includes('Understanding Your Paycheck') && !content.includes('Frequently Asked Questions')) {
      
    // Find the start of the text block and the end of the content section
    const startText = content.indexOf('  <div>\n    <h2');
    const endText = content.lastIndexOf('</div>\n</div>\n<script>');
    
    if (startText !== -1 && endText !== -1) {
      const beforeText = content.substring(0, startText);
      const afterText = content.substring(endText);
      
      const newContent = beforeText + extraContent + '\n' + afterText;
      fs.writeFileSync(filePath, newContent);
      console.log('Expanded content for ' + file);
    } else {
      console.log('Failed to find text bounds for ' + file);
    }
    }
  }
}
