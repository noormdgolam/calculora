import { useState } from 'react';

const PercentageCalculator = () => {
  const [whatIsP, setWhatIsP] = useState<number | ''>('');
  const [whatIsV, setWhatIsV] = useState<number | ''>('');
  const [whatIsRes, setWhatIsRes] = useState<number | null>(null);

  const [isWhatP, setIsWhatP] = useState<number | ''>('');
  const [isWhatV, setIsWhatV] = useState<number | ''>('');
  const [isWhatRes, setIsWhatRes] = useState<number | null>(null);

  const [incDecV1, setIncDecV1] = useState<number | ''>('');
  const [incDecV2, setIncDecV2] = useState<number | ''>('');
  const [incDecRes, setIncDecRes] = useState<{ change: number; type: string } | null>(null);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="mb-2">Percentage Calculator</h1>
        <p>Solve basic and complex percentage problems instantly.</p>
      </div>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
        
        {/* Calculator 1: What is X% of Y? */}
        <div className="mb-8 border-b pb-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <h3 className="mb-4 text-center">1. Find a Percentage of a Number</h3>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span style={{ fontSize: '1.25rem' }}>What is</span>
            <input type="number" className="input-field" style={{ width: '80px' }} placeholder="%" value={whatIsP} onChange={(e) => {
              setWhatIsP(Number(e.target.value) || '');
              if (e.target.value && whatIsV) setWhatIsRes((Number(e.target.value) / 100) * Number(whatIsV));
              else setWhatIsRes(null);
            }} />
            <span style={{ fontSize: '1.25rem' }}>% of</span>
            <input type="number" className="input-field" style={{ width: '120px' }} value={whatIsV} onChange={(e) => {
              setWhatIsV(Number(e.target.value) || '');
              if (whatIsP && e.target.value) setWhatIsRes((Number(whatIsP) / 100) * Number(e.target.value));
              else setWhatIsRes(null);
            }} />
            <span style={{ fontSize: '1.25rem' }}>?</span>
          </div>
          {whatIsRes !== null && (
            <div className="mt-4 text-center" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
              Result: {whatIsRes}
            </div>
          )}
        </div>

        {/* Calculator 2: X is what percent of Y? */}
        <div className="mb-8 border-b pb-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <h3 className="mb-4 text-center">2. Find What Percentage One Number Is of Another</h3>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <input type="number" className="input-field" style={{ width: '100px' }} value={isWhatP} onChange={(e) => {
              setIsWhatP(Number(e.target.value) || '');
              if (e.target.value && isWhatV) setIsWhatRes((Number(e.target.value) / Number(isWhatV)) * 100);
              else setIsWhatRes(null);
            }} />
            <span style={{ fontSize: '1.25rem' }}>is what % of</span>
            <input type="number" className="input-field" style={{ width: '100px' }} value={isWhatV} onChange={(e) => {
              setIsWhatV(Number(e.target.value) || '');
              if (isWhatP && e.target.value) setIsWhatRes((Number(isWhatP) / Number(e.target.value)) * 100);
              else setIsWhatRes(null);
            }} />
            <span style={{ fontSize: '1.25rem' }}>?</span>
          </div>
          {isWhatRes !== null && (
            <div className="mt-4 text-center" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--accent-secondary)' }}>
              Result: {isWhatRes.toFixed(2)}%
            </div>
          )}
        </div>

        {/* Calculator 3: Percentage Change */}
        <div>
          <h3 className="mb-4 text-center">3. Calculate Percentage Increase/Decrease</h3>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span style={{ fontSize: '1.1rem' }}>From</span>
            <input type="number" className="input-field" style={{ width: '100px' }} value={incDecV1} onChange={(e) => {
              setIncDecV1(Number(e.target.value) || '');
              const v1 = Number(e.target.value);
              const v2 = Number(incDecV2);
              if (v1 && v2) {
                const change = ((v2 - v1) / Math.abs(v1)) * 100;
                setIncDecRes({ change: Math.abs(change), type: change >= 0 ? 'Increase' : 'Decrease' });
              } else setIncDecRes(null);
            }} />
            <span style={{ fontSize: '1.1rem' }}>to</span>
            <input type="number" className="input-field" style={{ width: '100px' }} value={incDecV2} onChange={(e) => {
              setIncDecV2(Number(e.target.value) || '');
              const v1 = Number(incDecV1);
              const v2 = Number(e.target.value);
              if (v1 && v2) {
                const change = ((v2 - v1) / Math.abs(v1)) * 100;
                setIncDecRes({ change: Math.abs(change), type: change >= 0 ? 'Increase' : 'Decrease' });
              } else setIncDecRes(null);
            }} />
          </div>
          {incDecRes !== null && (
            <div className="mt-4 text-center" style={{ fontSize: '1.5rem', fontWeight: 600, color: incDecRes.type === 'Increase' ? '#10b981' : '#ef4444' }}>
              {incDecRes.type} of {incDecRes.change.toFixed(2)}%
            </div>
          )}
        </div>

      </div>

      <article className="content-section">
        <h2>Mastering the Math: How Percentage Calculators Work</h2>
        <p>
          Percentages are everywhere in daily life. From calculating a tip at a restaurant and understanding store discounts, to figuring out the interest rate on a loan or interpreting statistical data in the news, you simply cannot escape them. The word "percent" originates from the Latin phrase <em>per centum</em>, which literally translates to "by the hundred." Therefore, any percentage is simply a fraction with a denominator of 100.
        </p>
        <p>
          Despite this simple definition, manipulating percentages mathematically often causes confusion. Moving the decimal point the wrong way can result in massive calculation errors. Our suite of percentage calculators eliminates this risk by handling the formulas for the three most common real-world percentage problems automatically.
        </p>

        <h3 className="mt-6 mb-2">1. Finding a Percentage of a Number</h3>
        <p>
          This is the most common use case. For example, if a $1,200 television is on sale for 15% off, you need to know what 15% of $1,200 is to find your discount. To solve this manually, you convert the percentage to a decimal by dividing by 100 (15 / 100 = 0.15) and then multiply it by the original number. 
        </p>
        <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontFamily: 'monospace' }}>
          0.15 × 1,200 = 180. The discount is $180.
        </div>

        <h3 className="mt-6 mb-2">2. Finding What Percentage One Number is of Another</h3>
        <p>
          This calculation is frequently used when determining scores, completion rates, or proportions. For instance, if you scored 45 out of 60 on an exam, what percentage did you get? The formula requires dividing the part by the whole, and then multiplying the resulting decimal by 100 to convert it back into a percentage format.
        </p>
        <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontFamily: 'monospace' }}>
          (45 ÷ 60) × 100 = 0.75 × 100 = 75%
        </div>

        <h3 className="mt-6 mb-2">3. Calculating Percentage Change (Increase/Decrease)</h3>
        <p>
          Percentage change is heavily used in finance, business, and economics to show the growth or shrinkage of a value over time. If a company's revenue was $50,000 last year and is $65,000 this year, what is the percentage increase? The formula involves finding the absolute difference between the two values, dividing it by the <em>original</em> value, and multiplying by 100.
        </p>
        <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontFamily: 'monospace' }}>
          Difference = 65,000 - 50,000 = 15,000<br/>
          (15,000 ÷ 50,000) × 100 = 0.3 × 100 = 30% Increase
        </div>
        <p>
          Whether you are managing a corporate budget, doing your taxes, or just trying to figure out if that Black Friday sale is actually a good deal, bookmarking this tool will save you time and prevent costly mathematical errors.
        </p>
      </article>
    </div>
  );
};

export default PercentageCalculator;
