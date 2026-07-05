import React, { useState } from 'react';

const CarLoanCalculator = () => {
  const [vehiclePrice, setVehiclePrice] = useState<number | ''>('');
  const [downPayment, setDownPayment] = useState<number | ''>(0);
  const [tradeInValue, setTradeInValue] = useState<number | ''>(0);
  const [interestRate, setInterestRate] = useState<number | ''>(5.5);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
  
  const [result, setResult] = useState<{ 
    monthlyPayment: number; 
    totalPrincipal: number; 
    totalInterest: number; 
    totalCost: number; 
  } | null>(null);

  const calculateLoan = (e: React.FormEvent) => {
    e.preventDefault();
    if (vehiclePrice === '' || interestRate === '') return;

    const price = Number(vehiclePrice);
    const down = Number(downPayment) || 0;
    const tradeIn = Number(tradeInValue) || 0;
    const rate = Number(interestRate);
    const months = loanTermMonths;

    const principal = price - down - tradeIn;

    if (principal <= 0) {
      alert("Down payment and trade-in exceed the vehicle price.");
      return;
    }

    let monthlyPayment = 0;
    let totalInterest = 0;

    if (rate === 0) {
      monthlyPayment = principal / months;
      totalInterest = 0;
    } else {
      const monthlyRate = (rate / 100) / 12;
      monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
      totalInterest = (monthlyPayment * months) - principal;
    }

    setResult({
      monthlyPayment,
      totalPrincipal: principal,
      totalInterest,
      totalCost: price + totalInterest
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="mb-2">Car Loan Calculator</h1>
        <p>Estimate your auto loan payments and see the total cost of your vehicle.</p>
      </div>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
        <form onSubmit={calculateLoan}>
          <div className="input-group">
            <label className="input-label" htmlFor="vehiclePrice">Vehicle Price ($)</label>
            <input type="number" id="vehiclePrice" value={vehiclePrice} onChange={(e) => setVehiclePrice(Number(e.target.value) || '')} className="input-field" required />
          </div>
          
          <div className="flex gap-4">
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label" htmlFor="downPayment">Down Payment ($)</label>
              <input type="number" id="downPayment" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value) || '')} className="input-field" />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label" htmlFor="tradeInValue">Trade-in Value ($)</label>
              <input type="number" id="tradeInValue" value={tradeInValue} onChange={(e) => setTradeInValue(Number(e.target.value) || '')} className="input-field" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label" htmlFor="loanTerm">Loan Term (Months)</label>
              <select id="loanTerm" value={loanTermMonths} onChange={(e) => setLoanTermMonths(Number(e.target.value))} className="input-field">
                <option value={36}>36 Months (3 Years)</option>
                <option value={48}>48 Months (4 Years)</option>
                <option value={60}>60 Months (5 Years)</option>
                <option value={72}>72 Months (6 Years)</option>
                <option value={84}>84 Months (7 Years)</option>
              </select>
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label" htmlFor="interestRate">Interest Rate (%)</label>
              <input type="number" step="0.1" id="interestRate" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value) || '')} className="input-field" required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Calculate Car Loan</button>
        </form>

        {result && (
          <div className="mt-8 p-6 animate-fade-in" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div className="text-center mb-6">
              <h3 className="mb-2">Estimated Monthly Payment</h3>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-primary)', lineHeight: 1 }}>
                ${result.monthlyPayment.toFixed(2)}
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '1rem 0' }}></div>
            
            <div className="flex justify-between mb-2 text-secondary">
              <span>Total Principal Loaned:</span>
              <strong>${result.totalPrincipal.toFixed(2)}</strong>
            </div>
            <div className="flex justify-between mb-2 text-secondary">
              <span>Total Interest Paid:</span>
              <strong style={{ color: '#ef4444' }}>${result.totalInterest.toFixed(2)}</strong>
            </div>
            <div className="flex justify-between mt-4" style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 700 }}>
              <span>Total Cost of Vehicle (with interest):</span>
              <span>${result.totalCost.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      <article className="content-section">
        <h2>Navigating Auto Financing with a Car Loan Calculator</h2>
        <p>
          Walking into a car dealership can be an intimidating experience. Salespeople often try to negotiate based solely on the monthly payment, masking the true overall cost of the vehicle and the steep interest rates attached to long loan terms. By using a car loan calculator before you ever step foot on a lot, you empower yourself with the exact mathematics of auto financing, ensuring you secure a deal that fits your actual budget.
        </p>

        <h3 className="mt-6 mb-2">The Danger of Long Loan Terms</h3>
        <p>
          One of the biggest traps in modern auto financing is the exceptionally long loan term. It is increasingly common for buyers to finance vehicles for 72 or even 84 months (6 or 7 years). While extending the term significantly lowers your monthly payment—making a more expensive car seem "affordable"—it drastically increases the total amount of interest you will pay over the life of the loan.
        </p>
        <p>
          Furthermore, cars are depreciating assets. They lose value quickly. If you take out a 72-month loan, you run a very high risk of becoming "underwater" or "upside down" on your loan. This means you owe the bank more money than the car is actually worth, which becomes a major financial hazard if the car is totaled or if you decide to trade it in early.
        </p>

        <h3 className="mt-6 mb-2">How Down Payments and Trade-Ins Help</h3>
        <p>
          The best way to combat depreciation and high interest charges is to reduce your principal loan amount from day one. You can achieve this by providing a cash down payment or trading in your current vehicle.
        </p>
        <p>
          Financial experts generally recommend putting down at least 20% of the vehicle's purchase price. Entering different down payment amounts into our calculator will immediately demonstrate how reducing the principal drops your monthly payment and saves you hundreds or thousands of dollars in interest charges.
        </p>

        <h3 className="mt-6 mb-2">Understanding Interest Rates (APR)</h3>
        <p>
          The interest rate, often referred to as the Annual Percentage Rate (APR), is the cost you pay to borrow the money. Your APR is heavily dependent on your credit score. Buyers with excellent credit (typically 720 and above) qualify for the lowest rates, while buyers with subprime credit will face much higher rates. Even a 2% difference in your APR can significantly alter your monthly payment and total cost. It is always recommended to shop around for a loan at local credit unions or banks before accepting the dealership's financing offer.
        </p>
      </article>
    </div>
  );
};

export default CarLoanCalculator;
