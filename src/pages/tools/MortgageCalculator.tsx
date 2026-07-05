import React, { useState } from 'react';

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState<number | ''>(300000);
  const [downPayment, setDownPayment] = useState<number | ''>(60000);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number | ''>(6.5);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateMortgage = (e: React.FormEvent) => {
    e.preventDefault();
    if (homePrice === '' || downPayment === '' || interestRate === '') return;

    const principal = Number(homePrice) - Number(downPayment);
    if (principal <= 0) {
      setMonthlyPayment(0);
      return;
    }

    const monthlyInterestRate = (Number(interestRate) / 100) / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyInterestRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
      return;
    }

    const payment = 
      principal * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    setMonthlyPayment(payment);
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="mb-2">Mortgage Calculator</h1>
        <p>Estimate your monthly mortgage payments with ease.</p>
      </div>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
        <form onSubmit={calculateMortgage}>
          <div className="input-group">
            <label className="input-label" htmlFor="homePrice">Home Price ($)</label>
            <input type="number" id="homePrice" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value) || '')} className="input-field" required />
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="downPayment">Down Payment ($)</label>
            <input type="number" id="downPayment" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value) || '')} className="input-field" required />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="loanTerm">Loan Term (Years)</label>
            <select id="loanTerm" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="input-field">
              <option value={15}>15 Years</option>
              <option value={20}>20 Years</option>
              <option value={30}>30 Years</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="interestRate">Interest Rate (%)</label>
            <input type="number" id="interestRate" step="0.01" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value) || '')} className="input-field" required />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Calculate Monthly Payment</button>
        </form>

        {monthlyPayment !== null && (
          <div className="mt-8 p-6 animate-fade-in text-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <h3 className="mb-2">Estimated Monthly Payment</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
              ${monthlyPayment.toFixed(2)}
            </div>
            <p className="mt-2" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 0 }}>
              Principal & Interest only. Does not include taxes, insurance, or HOA.
            </p>
          </div>
        )}
      </div>

      <article className="content-section">
        <h2>How to Use a Mortgage Calculator</h2>
        <p>
          Buying a home is often the largest financial decision you will make in your lifetime. Understanding how much you can afford and what your monthly obligations will look like is the critical first step in the home-buying process. A mortgage calculator simplifies the complex mathematics of amortizing loans, giving you a clear, actionable monthly payment estimate instantly.
        </p>

        <h3 className="mt-6 mb-2">The Components of a Mortgage Payment</h3>
        <p>
          When you calculate a mortgage, you are primarily figuring out two things: Principal and Interest (often abbreviated as P&I). 
        </p>
        <p>
          <strong>Principal</strong> is the original amount of money you borrowed to buy the house. If you buy a $300,000 home and put down $60,000, your principal loan amount is $240,000. 
          <strong>Interest</strong> is the cost of borrowing that money from the bank. It is calculated as a percentage of the principal. Over a standard 30-year loan, a significant portion of your early payments goes entirely toward paying down interest, rather than the principal.
        </p>

        <h3 className="mt-6 mb-2">Why Down Payments Matter</h3>
        <p>
          The down payment is the upfront cash you pay toward the home purchase. Entering different down payment amounts into the calculator will quickly show you how heavily it impacts your monthly payment. A larger down payment reduces your total loan amount (principal), which in turn reduces the total interest you will pay over the life of the loan. Furthermore, putting down at least 20% usually allows you to avoid Private Mortgage Insurance (PMI), which can save you hundreds of dollars every month.
        </p>

        <h3 className="mt-6 mb-2">What is a Good Mortgage Rate in 2026?</h3>
        <p>
          Mortgage rates fluctuate based on macroeconomic factors, inflation, and Federal Reserve policies. Even a half-percent difference in your interest rate can mean tens of thousands of dollars in savings or extra costs over a 30-year term. A "good" rate depends heavily on your personal credit score and the current market average. By adjusting the interest rate field in our calculator, you can stress-test your budget to see if you could still afford the home if rates were to rise before you lock in your loan.
        </p>
        <p>
          Remember, this calculator provides an estimate for Principal and Interest. When budgeting for your new home, always remember to factor in property taxes, homeowner's insurance, and potential Homeowners Association (HOA) fees to get your true final monthly cost.
        </p>
      </article>
    </div>
  );
};

export default MortgageCalculator;
