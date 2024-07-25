import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useTonConnect } from './hooks/useTonConnect';
import { TelegramProvider } from './context/TelegramContext';
import OnboardingPages from './components/OnboardingPages';
import MainMenu from './components/MainMenu';
import TasksPage from './components/TasksPage';
import NavigationBar from './components/NavigationBar';
import './App.css';

const App: React.FC = () => {
  const { connected } = useTonConnect();
  const location = useLocation();

  const isOnboarding = location.pathname === '/' && !connected;

  return (
    <TelegramProvider>
      <div className={`app-container ${isOnboarding ? 'onboarding' : ''}`}>
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={connected ? <Navigate to="/main-menu" /> : <OnboardingPages />}
            />
            <Route path="/main-menu" element={<MainMenu />} />
            <Route path="/tasks" element={<TasksPage />} />
          </Routes>
        </div>
        {!isOnboarding && <NavigationBar />}
      </div>
    </TelegramProvider>
  );
};

export default App;