import React, { useState } from 'react';

const AgeCalculator = () => {
  const [dob, setDob] = useState<string>('');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob || !targetDate) return;

    const birthDate = new Date(dob);
    const dateAt = new Date(targetDate);

    if (birthDate > dateAt) {
      alert("Date of birth cannot be after the target date.");
      return;
    }

    let years = dateAt.getFullYear() - birthDate.getFullYear();
    let months = dateAt.getMonth() - birthDate.getMonth();
    let days = dateAt.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      // Get the number of days in the previous month
      const prevMonth = new Date(dateAt.getFullYear(), dateAt.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setResult({ years, months, days });
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="mb-2">Age Calculator</h1>
        <p>Calculate your exact chronological age in years, months, and days.</p>
      </div>

      <div className="card" style={{ maxWidth: '500px', margin: '0 auto 3rem' }}>
        <form onSubmit={calculateAge}>
          <div className="input-group">
            <label className="input-label" htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} className="input-field" required />
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="targetDate">Calculate age at this date</label>
            <input type="date" id="targetDate" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="input-field" required />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Calculate Age</button>
        </form>

        {result && (
          <div className="mt-8 p-6 animate-fade-in text-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <h3 className="mb-4">Your Exact Age Is:</h3>
            
            <div className="flex justify-center gap-4">
              <div className="flex flex-col items-center">
                <strong style={{ fontSize: '2.5rem', color: 'var(--accent-primary)', lineHeight: 1 }}>{result.years}</strong>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Years</span>
              </div>
              <div className="flex flex-col items-center" style={{ marginTop: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>:</span>
              </div>
              <div className="flex flex-col items-center">
                <strong style={{ fontSize: '2.5rem', color: 'var(--accent-primary)', lineHeight: 1 }}>{result.months}</strong>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Months</span>
              </div>
              <div className="flex flex-col items-center" style={{ marginTop: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>:</span>
              </div>
              <div className="flex flex-col items-center">
                <strong style={{ fontSize: '2.5rem', color: 'var(--accent-primary)', lineHeight: 1 }}>{result.days}</strong>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Days</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <article className="content-section">
        <h2>How an Age Calculator Works</h2>
        <p>
          Calculating someone's age seems like the easiest math problem in the world—until you try to do it accurately down to the exact day. Because months have varying numbers of days, and leap years throw an extra day into February every four years, computing chronological age manually can quickly become confusing. Our Age Calculator uses precise calendar logic to compute the exact time difference between two dates, providing your age in years, months, and days.
        </p>

        <h3 className="mt-6 mb-2">Chronological Age vs. Biological Age</h3>
        <p>
          When you enter your date of birth into the calculator, it outputs your <strong>chronological age</strong>. This is the literal amount of time that has passed since you were born, measured by the Gregorian calendar system. It is the number used for all legal and official purposes, from obtaining a driver's license to qualifying for Social Security benefits.
        </p>
        <p>
          This is completely distinct from <strong>biological age</strong>, which refers to how old your cells and tissues appear to be based on physiological markers. While you can't change the chronological age returned by our calculator, healthy lifestyle choices like diet and exercise can influence your biological aging process.
        </p>

        <h3 className="mt-6 mb-2">Why Do We Need an Exact Age Calculator?</h3>
        <p>
          You probably know how many years old you are, but this tool provides a level of granularity required for many specific situations:
        </p>
        <ul style={{ paddingLeft: '2rem', marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
          <li className="mb-2"><strong>Medical Assessments:</strong> Pediatricians track infant development by exact months and days.</li>
          <li className="mb-2"><strong>Legal Applications:</strong> Determining exact age is crucial for contract signing limits, insurance policy brackets, and retirement planning.</li>
          <li className="mb-2"><strong>Genealogy and History:</strong> Historians use age calculators to determine the exact age of historical figures at the time of significant events by setting a custom "target date" in the past.</li>
          <li className="mb-2"><strong>Fun Milestones:</strong> Figuring out exactly when you turn 10,000 days old to throw a unique celebration.</li>
        </ul>

        <h3 className="mt-6 mb-2">How Leap Years Affect the Math</h3>
        <p>
          A common pitfall in calculating age manually is leap years. A standard year is 365 days, but every four years we add an extra day (February 29) to keep our calendars synced with Earth's orbit around the sun. If you were born on a leap day, determining your exact age in years, months, and days requires complex conditional logic that our calculator handles effortlessly in the background. Simply input your dates and get an instant, error-free result.
        </p>
      </article>
    </div>
  );
};

export default AgeCalculator;
