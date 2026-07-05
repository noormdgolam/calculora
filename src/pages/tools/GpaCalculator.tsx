import React, { useState } from 'react';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

const gradeValues: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'F': 0.0
};

const GpaCalculator = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Course 1', credits: 3, grade: 'A' },
    { id: '2', name: 'Course 2', credits: 3, grade: 'B' },
  ]);
  const [gpa, setGpa] = useState<number | null>(null);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now().toString(), name: `Course ${courses.length + 1}`, credits: 3, grade: 'A' }]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculateGPA = (e: React.FormEvent) => {
    e.preventDefault();
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const credits = Number(course.credits);
      if (credits > 0 && gradeValues[course.grade] !== undefined) {
        totalPoints += gradeValues[course.grade] * credits;
        totalCredits += credits;
      }
    });

    if (totalCredits > 0) {
      setGpa(totalPoints / totalCredits);
    } else {
      setGpa(0);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="mb-2">GPA Calculator</h1>
        <p>Calculate your college or high school Grade Point Average.</p>
      </div>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto 3rem' }}>
        <form onSubmit={calculateGPA}>
          <div className="flex gap-4 mb-2" style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
            <div style={{ flex: 2 }}>Course Name (Optional)</div>
            <div style={{ flex: 1 }}>Credits / Hours</div>
            <div style={{ flex: 1 }}>Letter Grade</div>
            <div style={{ width: '40px' }}></div>
          </div>

          {courses.map(course => (
            <div key={course.id} className="flex gap-4 mb-4 items-center">
              <div style={{ flex: 2 }}>
                <input type="text" value={course.name} onChange={(e) => updateCourse(course.id, 'name', e.target.value)} className="input-field" placeholder="e.g. Biology 101" />
              </div>
              <div style={{ flex: 1 }}>
                <input type="number" min="0" step="0.5" value={course.credits} onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value) || 0)} className="input-field" required />
              </div>
              <div style={{ flex: 1 }}>
                <select value={course.grade} onChange={(e) => updateCourse(course.id, 'grade', e.target.value)} className="input-field" required>
                  {Object.keys(gradeValues).map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div style={{ width: '40px' }}>
                <button type="button" onClick={() => removeCourse(course.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.25rem', padding: '0.5rem' }}>&times;</button>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <button type="button" className="btn" onClick={addCourse} style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>+ Add Course</button>
            <button type="submit" className="btn btn-primary">Calculate GPA</button>
          </div>
        </form>

        {gpa !== null && (
          <div className="mt-8 p-6 animate-fade-in text-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <h3 className="mb-2">Your Cumulative GPA</h3>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-secondary)', lineHeight: 1 }}>
              {gpa.toFixed(2)}
            </div>
          </div>
        )}
      </div>

      <article className="content-section">
        <h2>How Does a GPA Calculator Work?</h2>
        <p>
          Your Grade Point Average (GPA) is one of the most important metrics of your academic career. It is used by high schools to determine class rank, by universities for admission decisions, and by employers to assess your academic discipline. However, calculating it manually can be tedious, especially when dealing with varying credit hours per course. Our GPA calculator automates the math, utilizing the standard 4.0 scale to give you an accurate read on your academic standing instantly.
        </p>

        <h3 className="mt-6 mb-2">The 4.0 Grading Scale Explained</h3>
        <p>
          Most high schools and colleges in the United States use an unweighted 4.0 scale. In this system, each letter grade you receive is assigned a numerical value:
        </p>
        <ul style={{ paddingLeft: '2rem', marginBottom: '1.25rem', color: 'var(--text-secondary)', columns: 2 }}>
          <li>A or A+ = 4.0</li>
          <li>A- = 3.7</li>
          <li>B+ = 3.3</li>
          <li>B = 3.0</li>
          <li>B- = 2.7</li>
          <li>C+ = 2.3</li>
          <li>C = 2.0</li>
          <li>C- = 1.7</li>
          <li>D+ = 1.3</li>
          <li>D = 1.0</li>
          <li>F = 0.0</li>
        </ul>
        <p>
          This numerical value is then multiplied by the number of credits (or credit hours) the course is worth. This results in your total "quality points" for that course.
        </p>

        <h3 className="mt-6 mb-2">Weighted vs. Unweighted GPA</h3>
        <p>
          It is important to note that our standard calculator computes an <strong>unweighted GPA</strong>. This means an "A" in a standard high school biology class is worth the same 4.0 points as an "A" in a rigorous Advanced Placement (AP) Physics class. 
        </p>
        <p>
          Many high schools offer a <strong>weighted GPA</strong> system to reward students taking difficult courses. In a weighted system, Honors, AP, or IB courses might be graded on a 5.0 scale (meaning an A is worth 5 points instead of 4). If your school uses a weighted system, you will need to manually adjust the letter grade point values according to your specific school's handbook guidelines.
        </p>

        <h3 className="mt-6 mb-2">How to Use the Calculator</h3>
        <p>
          Using the tool is simple: For every class you took during the semester, enter the number of credits the class was worth (usually 3 or 4 for college courses, or 1 for standard high school year-long courses) and select the letter grade you earned. The "Course Name" field is purely for your organizational convenience. 
        </p>
        <p>
          When you click "Calculate GPA," the system tallies all your quality points and divides them by the total number of credits attempted, yielding your final GPA on the 4.0 scale. Use this tool frequently throughout the semester by inputting your expected grades to see what finals you need to ace to maintain your target GPA.
        </p>
      </article>
    </div>
  );
};

export default GpaCalculator;
