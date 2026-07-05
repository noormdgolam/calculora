import React, { useState } from 'react';

const SalesTaxCalculator = () => {
  const [price, setPrice] = useState<number | ''>('');
  const [taxRate, setTaxRate] = useState<number | ''>('');
  const [result, setResult] = useState<{ taxAmount: number; total: number } | null>(null);

  const calculateTax = (e: React.FormEvent) => {
    e.preventDefault();
    if (price === '' || taxRate === '') return;

    const p = Number(price);
    const r = Number(taxRate);
    
    const taxAmount = p * (r / 100);
    const total = p + taxAmount;

    setResult({ taxAmount, total });
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="mb-2">Sales Tax Calculator</h1>
        <p>Calculate the final price of an item including local sales tax.</p>
      </div>

      <div className="card" style={{ maxWidth: '500px', margin: '0 auto 3rem' }}>
        <form onSubmit={calculateTax}>
          <div className="input-group">
            <label className="input-label" htmlFor="price">Price before tax ($)</label>
            <input type="number" step="0.01" id="price" value={price} onChange={(e) => setPrice(Number(e.target.value) || '')} className="input-field" required />
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="taxRate">Sales Tax Rate (%)</label>
            <input type="number" step="0.001" id="taxRate" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value) || '')} className="input-field" placeholder="e.g., 7.25" required />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Calculate Total</button>
        </form>

        {result && (
          <div className="mt-8 p-6 animate-fade-in" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <div className="flex justify-between mb-2"><span>Original Price:</span> <span>${Number(price).toFixed(2)}</span></div>
            <div className="flex justify-between mb-4"><span>Sales Tax Amount:</span> <span>+ ${result.taxAmount.toFixed(2)}</span></div>
            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '1rem 0' }}></div>
            <div className="flex justify-between" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              <span>Total Price:</span> <span>${result.total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      <article className="content-section">
        <h2>Understanding Sales Tax and How to Calculate It</h2>
        <p>
          Whether you are a consumer trying to budget for a large purchase like a car or laptop, or a small business owner trying to appropriately price your merchandise, understanding sales tax is unavoidable. Unlike in some countries where the tax is built into the sticker price, in the United States, sales tax is almost always added at the register. A sales tax calculator removes the guesswork, allowing you to find the exact final cost of any item instantly.
        </p>

        <h3 className="mt-6 mb-2">How Does Sales Tax Work?</h3>
        <p>
          Sales tax is a consumption tax imposed by the government on the sale of goods and services. A conventional sales tax is levied at the point of sale, collected by the retailer, and then passed on to the government. The formula to calculate the tax manually is straightforward: 
        </p>
        <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontFamily: 'monospace' }}>
          Tax Amount = Original Price × (Tax Rate / 100)
        </div>
        <p>
          Once you have the tax amount, you simply add it to the original price to get your total out-of-pocket cost. Our calculator performs this operation automatically, handling floating-point decimals to ensure absolute accuracy.
        </p>

        <h3 className="mt-6 mb-2">Why Sales Tax Varies By Location</h3>
        <p>
          One of the most confusing aspects of sales tax in the US is that there is no federal sales tax. Instead, sales tax is determined at the state and local levels. This means you might pay a 4% state tax, but the specific county and city you are purchasing the item in might add their own local taxes on top of it, bringing the total effective tax rate to 8% or 9%. 
        </p>
        <p>
          For example, purchasing a $1,000 television in a location with an 8.25% combined tax rate will result in an additional $82.50 in taxes, bringing the final cost to $1,082.50. When making significant purchases, it pays to know the exact local rate so you aren't surprised at checkout.
        </p>

        <h3 className="mt-6 mb-2">Business and Consumer Use Cases</h3>
        <p>
          For shoppers, this tool is excellent for verifying receipts or planning a shopping trip budget. For freelancers and business owners, calculating sales tax accurately is legally required. If you are invoicing a client for taxable goods, you must collect the correct amount to remit to your state's department of revenue. Bookmark this calculator to ensure you are always pricing and budgeting accurately.
        </p>
      </article>
    </div>
  );
};

export default SalesTaxCalculator;
