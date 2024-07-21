import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useTonConnect } from './hooks/useTonConnect';
import OnboardingPages from './components/OnboardingPages';
import MainMenu from './components/MainMenu';

const App: React.FC = () => {
  const { connected } = useTonConnect();

  return (
    <Routes>
      <Route path="/" element={connected ? <Navigate to="/main-menu" /> : <OnboardingPages />} />
      <Route path="/main-menu" element={<MainMenu />} />
    </Routes>
  );
};

export default App;