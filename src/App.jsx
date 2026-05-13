import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import ResultBasic from './pages/ResultBasic';
import ResultPremium from './pages/ResultPremium';

function ResultRouter() {
  const [searchParams] = useSearchParams();
  const tier = searchParams.get('tier');
  
  if (tier === 'premium') {
    return <ResultPremium />;
  }
  return <ResultBasic />;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/analise" element={<Dashboard />} />
        <Route path="/resultado" element={<ResultRouter />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/cadastro" element={<Auth mode="cadastro" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
