import React, { useState } from 'react';

const TipCalculator = () => {
  const [bill, setBill] = useState<number | ''>('');
  const [tipPercentage, setTipPercentage] = useState<number>(20);
  const [people, setPeople] = useState<number>(1);
  const [results, setResults] = useState<{ tipAmount: number; total: number; perPerson: number } | null>(null);

  const calculateTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (bill === '') return;

    const b = Number(bill);
    const t = Number(tipPercentage);
    const p = Number(people) || 1;

    const tipAmount = b * (t / 100);
    const total = b + tipAmount;
    const perPerson = total / p;

    setResults({ tipAmount, total, perPerson });
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="mb-2">Tip Calculator</h1>
        <p>Calculate gratuity and effortlessly split the bill.</p>
      </div>

      <div className="card" style={{ maxWidth: '500px', margin: '0 auto 3rem' }}>
        <form onSubmit={calculateTip}>
          <div className="input-group">
            <label className="input-label" htmlFor="bill">Bill Amount ($)</label>
            <input type="number" step="0.01" id="bill" value={bill} onChange={(e) => setBill(Number(e.target.value) || '')} className="input-field" required />
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="tipPercentage">Tip Percentage (%)</label>
            <div className="flex gap-2 mb-2">
              {[15, 18, 20, 25].map(preset => (
                <button 
                  key={preset}
                  type="button" 
                  onClick={() => setTipPercentage(preset)}
                  className={`btn ${tipPercentage === preset ? 'btn-primary' : ''}`}
                  style={{ flex: 1, padding: '0.5rem', backgroundColor: tipPercentage !== preset ? 'var(--bg-secondary)' : undefined, color: tipPercentage !== preset ? 'var(--text-primary)' : undefined, border: tipPercentage !== preset ? '1px solid var(--border-color)' : undefined }}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <input type="number" id="tipPercentage" value={tipPercentage} onChange={(e) => setTipPercentage(Number(e.target.value) || 0)} className="input-field" />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="people">Number of People (Split Bill)</label>
            <div className="flex items-center gap-4">
              <input type="range" id="people" min="1" max="20" value={people} onChange={(e) => setPeople(Number(e.target.value))} style={{ flex: 1 }} />
              <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: 'bold' }}>{people}</span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Calculate Tip</button>
        </form>

        {results && (
          <div className="mt-8 p-6 animate-fade-in text-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <div className="flex justify-between mb-2 text-secondary">
              <span>Tip Amount:</span>
              <span>${results.tipAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-secondary">
              <span>Total Bill:</span>
              <span>${results.total.toFixed(2)}</span>
            </div>
            {people > 1 && (
              <>
                <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '1rem 0' }}></div>
                <div className="flex flex-col items-center">
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Each Person Pays</span>
                  <strong style={{ fontSize: '2rem', color: 'var(--accent-primary)', marginTop: '0.5rem' }}>
                    ${results.perPerson.toFixed(2)}
                  </strong>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <article className="content-section">
        <h2>How to Use a Tip Calculator</h2>
        <p>
          Dining out should be a relaxing experience, but the arrival of the check can sometimes induce unnecessary math-related anxiety. Whether you're dining solo, on a date, or out with a large group of friends, a tip calculator ensures you leave an appropriate gratuity and fairly divide the costs. Our free tool removes the mental gymnastics of calculating percentages and splitting totals.
        </p>

        <h3 className="mt-6 mb-2">Standard Tipping Etiquette in the US</h3>
        <p>
          In the United States, tipping is deeply ingrained in the service industry culture, largely because many servers rely on tips to make up the bulk of their income. While tipping is technically voluntary, leaving a gratuity is expected in almost all full-service restaurants. 
        </p>
        <p>
          The standard tipping rate has evolved over the years. Currently, <strong>20% is widely considered the baseline</strong> for good service. If the service was exceptional, 22% to 25% is an excellent way to show appreciation. If the service was lacking, 15% to 18% is standard. It is generally poor etiquette to leave less than 15% unless there was a severe issue with your experience. Our calculator features quick-select buttons for these common percentages to speed up the process.
        </p>

        <h3 className="mt-6 mb-2">How to Split the Bill Smoothly</h3>
        <p>
          Splitting a bill among a group of people is where the math often gets messy. When you have a party of five, and someone needs to cover the tip while someone else only had an appetizer, tensions can run high.
        </p>
        <p>
          Our tool simplifies the most common scenario: an even split. By using the slider to select the number of people in your party, the calculator will immediately take the final total (bill amount plus the calculated tip) and divide it evenly. This gives you a clean, precise dollar amount that each person needs to contribute via cash or a peer-to-peer payment app like Venmo or Zelle.
        </p>

        <h3 className="mt-6 mb-2">Should You Tip Pre-Tax or Post-Tax?</h3>
        <p>
          A common question diners have is whether the tip percentage should be calculated based on the subtotal (before sales tax is added) or the final total (after sales tax). Etiquette experts generally agree that it is perfectly acceptable to tip based on the pre-tax subtotal. However, many consumers choose to calculate their tip based on the post-tax total simply because it is the largest, most prominent number at the bottom of the receipt. Either method is fine, just enter the number you prefer into the "Bill Amount" field.
        </p>
      </article>
    </div>
  );
};

export default TipCalculator;
