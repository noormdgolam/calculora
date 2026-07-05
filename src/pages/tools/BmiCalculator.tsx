import React, { useState } from 'react';

const BmiCalculator = () => {
  const [system, setSystem] = useState<'imperial' | 'metric'>('imperial');
  const [heightFt, setHeightFt] = useState<number | ''>('');
  const [heightIn, setHeightIn] = useState<number | ''>('');
  const [heightCm, setHeightCm] = useState<number | ''>('');
  const [weightLbs, setWeightLbs] = useState<number | ''>('');
  const [weightKg, setWeightKg] = useState<number | ''>('');
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    let bmiValue = 0;

    if (system === 'imperial') {
      if (heightFt === '' || heightIn === '' || weightLbs === '') return;
      const totalInches = (Number(heightFt) * 12) + Number(heightIn);
      bmiValue = 703 * (Number(weightLbs) / (totalInches * totalInches));
    } else {
      if (heightCm === '' || weightKg === '') return;
      const heightMeters = Number(heightCm) / 100;
      bmiValue = Number(weightKg) / (heightMeters * heightMeters);
    }

    let category = '';
    let color = '';

    if (bmiValue < 18.5) {
      category = 'Underweight';
      color = '#3b82f6'; // Blue
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      category = 'Normal weight';
      color = '#10b981'; // Green
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      category = 'Overweight';
      color = '#f59e0b'; // Yellow/Orange
    } else {
      category = 'Obesity';
      color = '#ef4444'; // Red
    }

    setResult({ bmi: bmiValue, category, color });
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="mb-2">BMI Calculator</h1>
        <p>Check your Body Mass Index quickly and easily.</p>
      </div>

      <div className="card" style={{ maxWidth: '500px', margin: '0 auto 3rem' }}>
        <div className="flex justify-center gap-4 mb-6">
          <button 
            className={`btn ${system === 'imperial' ? 'btn-primary' : ''}`} 
            onClick={() => { setSystem('imperial'); setResult(null); }}
            style={system !== 'imperial' ? { backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' } : {}}
          >Imperial (lb, in)</button>
          <button 
            className={`btn ${system === 'metric' ? 'btn-primary' : ''}`} 
            onClick={() => { setSystem('metric'); setResult(null); }}
            style={system !== 'metric' ? { backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' } : {}}
          >Metric (kg, cm)</button>
        </div>

        <form onSubmit={calculateBMI}>
          {system === 'imperial' ? (
            <>
              <div className="flex gap-4">
                <div className="input-group" style={{ flex: 1 }}>
                  <label className="input-label" htmlFor="heightFt">Height (Feet)</label>
                  <input type="number" id="heightFt" value={heightFt} onChange={(e) => setHeightFt(Number(e.target.value) || '')} className="input-field" required />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label className="input-label" htmlFor="heightIn">Height (Inches)</label>
                  <input type="number" id="heightIn" max="11" value={heightIn} onChange={(e) => setHeightIn(Number(e.target.value) || '')} className="input-field" required />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="weightLbs">Weight (Pounds)</label>
                <input type="number" step="0.1" id="weightLbs" value={weightLbs} onChange={(e) => setWeightLbs(Number(e.target.value) || '')} className="input-field" required />
              </div>
            </>
          ) : (
            <>
              <div className="input-group">
                <label className="input-label" htmlFor="heightCm">Height (Centimeters)</label>
                <input type="number" id="heightCm" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value) || '')} className="input-field" required />
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="weightKg">Weight (Kilograms)</label>
                <input type="number" step="0.1" id="weightKg" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value) || '')} className="input-field" required />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Calculate BMI</button>
        </form>

        {result && (
          <div className="mt-8 p-6 animate-fade-in text-center" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: `2px solid ${result.color}` }}>
            <h3 className="mb-2">Your BMI is:</h3>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: result.color, lineHeight: 1 }}>
              {result.bmi.toFixed(1)}
            </div>
            <p className="mt-4" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 0 }}>
              Category: <span style={{ color: result.color }}>{result.category}</span>
            </p>
          </div>
        )}
      </div>

      <article className="content-section">
        <h2>What is Body Mass Index (BMI)?</h2>
        <p>
          Body Mass Index, commonly known as BMI, is a straightforward mathematical tool used to estimate human body fat based on an individual's weight and height. Developed in the 19th century, it has become a standard diagnostic tool used by medical professionals and health organizations worldwide, including the World Health Organization (WHO) and the Centers for Disease Control and Prevention (CDC), to categorize people's weight status.
        </p>

        <h3 className="mt-6 mb-2">How is BMI Calculated?</h3>
        <p>
          The BMI calculation is universally the same for all adult men and women. It involves dividing a person's weight by the square of their height. 
        </p>
        <ul style={{ paddingLeft: '2rem', marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
          <li className="mb-2"><strong>Metric Formula:</strong> weight (kg) / [height (m)]²</li>
          <li className="mb-2"><strong>Imperial Formula:</strong> 703 × weight (lbs) / [height (in)]²</li>
        </ul>
        <p>
          Our calculator handles this math for you instantly. By selecting either the imperial or metric system, you can input your stats and see where you fall on the standardized scale.
        </p>

        <h3 className="mt-6 mb-2">Understanding the BMI Categories</h3>
        <p>
          Once you have your BMI number, it is mapped to specific categories designed to indicate potential health risks. According to the CDC, the standard categories are:
        </p>
        <ul style={{ paddingLeft: '2rem', marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
          <li className="mb-2"><strong>Below 18.5:</strong> Underweight. This may indicate malnutrition, an eating disorder, or other health problems.</li>
          <li className="mb-2"><strong>18.5 to 24.9:</strong> Normal weight. This range is associated with the lowest risk of weight-related illnesses and conditions.</li>
          <li className="mb-2"><strong>25.0 to 29.9:</strong> Overweight. Individuals in this range may have an increased risk of developing cardiovascular disease or type 2 diabetes.</li>
          <li className="mb-2"><strong>30.0 and above:</strong> Obesity. This range carries the highest risk for severe health conditions, including heart disease, high blood pressure, and certain cancers.</li>
        </ul>

        <h3 className="mt-6 mb-2">Limitations of BMI</h3>
        <p>
          While BMI is a useful, quick screening tool, it is not a perfect measure of health or body composition. Because it only accounts for weight and height, it does not distinguish between muscle mass, bone density, and fat. For example, a highly trained athlete or bodybuilder with significant muscle mass may be classified as "overweight" or "obese" according to their BMI, despite having a very low body fat percentage and excellent cardiovascular health. 
        </p>
        <p>
          Additionally, BMI does not account for the distribution of fat around the body (e.g., visceral vs. subcutaneous fat) or demographic differences such as age and sex. Therefore, while our BMI calculator is a great starting point, any concerns about weight or health should be discussed with a certified healthcare provider who can perform a more comprehensive assessment.
        </p>
      </article>
    </div>
  );
};

export default BmiCalculator;
