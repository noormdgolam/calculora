import React, { useState } from 'react';

const PaycheckCalculator = () => {
  const [salary, setSalary] = useState<number | ''>('');
  const [frequency, setFrequency] = useState('annually');
  const [stateTaxRate, setStateTaxRate] = useState<number | ''>('');
  const [results, setResults] = useState<{ gross: number; federal: number; state: number; net: number } | null>(null);

  const calculatePaycheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!salary) return;

    let annualSalary = Number(salary);
    if (frequency === 'monthly') annualSalary = Number(salary) * 12;
    if (frequency === 'biweekly') annualSalary = Number(salary) * 26;
    if (frequency === 'weekly') annualSalary = Number(salary) * 52;
    if (frequency === 'hourly') annualSalary = Number(salary) * 40 * 52; // Assuming 40hr week

    // Simplified Tax Brackets for demonstration (Effective tax rate estimation)
    let federalTax = 0;
    if (annualSalary > 100000) federalTax = annualSalary * 0.24;
    else if (annualSalary > 50000) federalTax = annualSalary * 0.12;
    else federalTax = annualSalary * 0.10;

    const stateTax = (annualSalary * (Number(stateTaxRate) || 0)) / 100;
    const netPayAnnual = annualSalary - federalTax - stateTax;

    // Convert back to selected frequency
    let divisor = 1;
    if (frequency === 'monthly') divisor = 12;
    if (frequency === 'biweekly') divisor = 26;
    if (frequency === 'weekly') divisor = 52;
    // For hourly, we just show weekly equivalent for paycheck purposes usually, or biweekly. Let's show per frequency.
    if (frequency === 'hourly') divisor = 52; // Treat hourly input as weekly output essentially, or just show annual. Let's stick to the divisor.

    setResults({
      gross: annualSalary / divisor,
      federal: federalTax / divisor,
      state: stateTax / divisor,
      net: netPayAnnual / divisor,
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="mb-2">Paycheck Calculator</h1>
        <p>Calculate your take-home pay after federal and state taxes.</p>
      </div>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
        <form onSubmit={calculatePaycheck}>
          <div className="input-group">
            <label className="input-label" htmlFor="salary">Salary / Rate ($)</label>
            <input type="number" id="salary" value={salary} onChange={(e) => setSalary(Number(e.target.value) || '')} className="input-field" required />
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="frequency">Pay Frequency</label>
            <select id="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)} className="input-field">
              <option value="annually">Annually</option>
              <option value="monthly">Monthly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="weekly">Weekly</option>
              <option value="hourly">Hourly (40 hrs/wk)</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="stateTax">Estimated State Tax Rate (%)</label>
            <input type="number" id="stateTax" step="0.1" value={stateTaxRate} onChange={(e) => setStateTaxRate(Number(e.target.value) || '')} className="input-field" placeholder="e.g., 4.5" />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Calculate Paycheck</button>
        </form>

        {results && (
          <div className="mt-8 p-6 animate-fade-in" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <h3 className="mb-4 text-center">Estimated Per Pay Period</h3>
            <div className="flex justify-between mb-2"><span>Gross Pay:</span> <strong>${results.gross.toFixed(2)}</strong></div>
            <div className="flex justify-between mb-2" style={{ color: '#ef4444' }}><span>Federal Tax:</span> <strong>-${results.federal.toFixed(2)}</strong></div>
            <div className="flex justify-between mb-4" style={{ color: '#ef4444' }}><span>State Tax:</span> <strong>-${results.state.toFixed(2)}</strong></div>
            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '1rem 0' }}></div>
            <div className="flex justify-between" style={{ fontSize: '1.25rem', color: 'var(--accent-secondary)' }}>
              <span>Net Take-Home:</span> <strong>${results.net.toFixed(2)}</strong>
            </div>
          </div>
        )}
      </div>

      <article className="content-section">
        <h2>How Does a Paycheck Calculator Work?</h2>
        <p>
          Understanding your paycheck can sometimes feel like trying to decipher a secret code. Between gross income, federal taxes, state taxes, and various deductions, the number that actually hits your bank account—your net pay or take-home pay—is often significantly lower than your stated salary. A paycheck calculator simplifies this process by estimating your tax liabilities and giving you a clear picture of your actual earnings.
        </p>
        
        <h3 className="mt-6 mb-2">Gross Pay vs. Net Pay</h3>
        <p>
          The first step in understanding your paycheck is knowing the difference between gross and net pay. <strong>Gross pay</strong> is the total amount of money you earn before any deductions are made. If you earn an annual salary of $60,000, your monthly gross pay is $5,000. 
        </p>
        <p>
          <strong>Net pay</strong>, on the other hand, is what you actually get to keep. It's the amount left over after federal income tax, state income tax, Social Security, Medicare, and any other deductions (like health insurance or retirement contributions) are taken out. Our calculator helps you transition from your gross figure to your net figure seamlessly.
        </p>

        <h3 className="mt-6 mb-2">Federal and State Taxes Explained</h3>
        <p>
          In the United States, your income is subject to federal income tax, which operates on a progressive tax bracket system. This means that as your income increases, the percentage of tax you pay on the higher portions of your income also increases. Our calculator estimates your effective federal tax rate based on standard brackets.
        </p>
        <p>
          Additionally, most states levy their own income tax. Some states, like Texas or Florida, have no state income tax, while others like California or New York have significant state tax rates. By entering your estimated state tax percentage, our tool can deduct this local liability from your gross pay to provide a highly accurate take-home estimate.
        </p>

        <h3 className="mt-6 mb-2">Why You Need to Check Your Take-Home Pay</h3>
        <p>
          Whether you are negotiating a new job offer, planning to move to a different state, or setting up a personal budget, knowing your exact take-home pay is crucial. Relying on your gross salary for budgeting will inevitably lead to financial shortfalls. By using a paycheck calculator regularly, you can plan your expenses, savings, and investments with confidence, knowing exactly how much cash you will actually have on hand each month.
        </p>
      </article>
    </div>
  );
};

export default PaycheckCalculator;
