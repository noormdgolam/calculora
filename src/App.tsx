import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

import PaycheckCalculator from './pages/tools/PaycheckCalculator';
import MortgageCalculator from './pages/tools/MortgageCalculator';
import SalesTaxCalculator from './pages/tools/SalesTaxCalculator';
import TipCalculator from './pages/tools/TipCalculator';
import BmiCalculator from './pages/tools/BmiCalculator';
import AgeCalculator from './pages/tools/AgeCalculator';
import GpaCalculator from './pages/tools/GpaCalculator';
import PercentageCalculator from './pages/tools/PercentageCalculator';
import WordCounter from './pages/tools/WordCounter';
import CarLoanCalculator from './pages/tools/CarLoanCalculator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          
          <Route path="tools/paycheck-calculator" element={<PaycheckCalculator />} />
          <Route path="tools/mortgage-calculator" element={<MortgageCalculator />} />
          <Route path="tools/sales-tax-calculator" element={<SalesTaxCalculator />} />
          <Route path="tools/tip-calculator" element={<TipCalculator />} />
          <Route path="tools/bmi-calculator" element={<BmiCalculator />} />
          <Route path="tools/age-calculator" element={<AgeCalculator />} />
          <Route path="tools/gpa-calculator" element={<GpaCalculator />} />
          <Route path="tools/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="tools/word-counter" element={<WordCounter />} />
          <Route path="tools/car-loan-calculator" element={<CarLoanCalculator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
