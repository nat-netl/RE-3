import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useTonConnect } from './hooks/useTonConnect';
import OnboardingPages from './components/OnboardingPages';
import MainMenu from './components/MainMenu';
import TasksPage from './components/TasksPage';

const App: React.FC = () => {
  const { connected } = useTonConnect();

  return (
    <Routes>
      <Route 
        path="/" 
        element={connected ? <Navigate to="/main-menu" /> : <OnboardingPages />} 
      />
      <Route path="/main-menu" element={<MainMenu />} />
      <Route path="/tasks" element={<TasksPage />} />
    </Routes>
  );
};

export default App;