import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useTonConnect } from './hooks/useTonConnect';
import { TelegramProvider } from "./context/TelegramContext";
import OnboardingPages from './components/OnboardingPages';
import MainMenu from './components/MainMenu';
import TasksPage from './components/TasksPage';
import NavigationBar from './components/NavigationBar';
import './App.css';

const App: React.FC = () => {
  const { connected } = useTonConnect();

  return (
    <TelegramProvider>
      <div className="app-container">
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
        <NavigationBar />
      </div>
    </TelegramProvider>
  );
};

export default App;