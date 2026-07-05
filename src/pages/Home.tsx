import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  Home as HomeIcon, 
  ShoppingCart, 
  Coffee, 
  Activity, 
  Calendar, 
  GraduationCap, 
  Percent, 
  Type, 
  Car 
} from 'lucide-react';

const tools = [
  { id: 'paycheck', name: 'Paycheck Calculator', icon: DollarSign, color: '#10b981', path: '/tools/paycheck-calculator', desc: 'Estimate your take-home pay after taxes.' },
  { id: 'mortgage', name: 'Mortgage Calculator', icon: HomeIcon, color: '#8b5cf6', path: '/tools/mortgage-calculator', desc: 'Calculate your monthly mortgage payments.' },
  { id: 'sales-tax', name: 'Sales Tax Calculator', icon: ShoppingCart, color: '#f59e0b', path: '/tools/sales-tax-calculator', desc: 'Find total cost including state sales tax.' },
  { id: 'tip', name: 'Tip Calculator', icon: Coffee, color: '#f43f5e', path: '/tools/tip-calculator', desc: 'Easily calculate tips and split bills.' },
  { id: 'bmi', name: 'BMI Calculator', icon: Activity, color: '#06b6d4', path: '/tools/bmi-calculator', desc: 'Check your Body Mass Index quickly.' },
  { id: 'age', name: 'Age Calculator', icon: Calendar, color: '#8b5cf6', path: '/tools/age-calculator', desc: 'Calculate exact age in years, months, and days.' },
  { id: 'gpa', name: 'GPA Calculator', icon: GraduationCap, color: '#10b981', path: '/tools/gpa-calculator', desc: 'Track your high school or college GPA.' },
  { id: 'percentage', name: 'Percentage Calculator', icon: Percent, color: '#f59e0b', path: '/tools/percentage-calculator', desc: 'Solve basic and complex percentage problems.' },
  { id: 'word-counter', name: 'Word Counter', icon: Type, color: '#f43f5e', path: '/tools/word-counter', desc: 'Count words, characters, and reading time.' },
  { id: 'car-loan', name: 'Car Loan Calculator', icon: Car, color: '#06b6d4', path: '/tools/car-loan-calculator', desc: 'Estimate your monthly auto loan payments.' },
];

const Home = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center" style={{ padding: '4rem 0 3rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Premium Tools for Everyday Life.
        </h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Free, accurate, and lightning-fast calculators designed to help you make better financial, health, and academic decisions.
        </p>
      </div>

      <div className="tools-grid mb-8">
        {tools.map((tool) => (
          <Link to={tool.path} key={tool.id} className="card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ 
              display: 'inline-flex', 
              padding: '14px', 
              borderRadius: 'var(--radius-lg)', 
              backgroundColor: `rgba(${parseInt(tool.color.slice(1, 3), 16)}, ${parseInt(tool.color.slice(3, 5), 16)}, ${parseInt(tool.color.slice(5, 7), 16)}, 0.15)`,
              color: tool.color,
              marginBottom: '1rem',
              boxShadow: `0 0 20px rgba(${parseInt(tool.color.slice(1, 3), 16)}, ${parseInt(tool.color.slice(3, 5), 16)}, ${parseInt(tool.color.slice(5, 7), 16)}, 0.2)`
            }}>
              <tool.icon size={32} strokeWidth={2.5} />
            </div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{tool.name}</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
