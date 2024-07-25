import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../context/TelegramContext';
import TokenTaskCard from '../card/TokenTaskCard';
import '../styles/TokenTasks.css';

const TokenTasks: React.FC = () => {
  const { tg } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    if (tg) {
      tg.BackButton.show();
      tg.BackButton.onClick(() => navigate('/tasks'));
    }
    return () => {
      if (tg) {
        tg.BackButton.offClick();
      }
    };
  }, [tg, navigate]);

  const tokens = [
    { id: 1, name: 'DMT Invest', reward: '100 LIBRA', link: '/token/1' },
    { id: 2, name: 'HYDRA', reward: '100 LIBRA', link: '/token/2' },
    { id: 3, name: 'REBA', reward: '100 LIBRA', link: '/token/3' },
    { id: 4, name: 'LIBRA', reward: '100 LIBRA', link: '/token/4' },
  ];

  return (
    <div className="token-tasks-container">
      <div className="token-tasks-header">
        <h1>Задания по токенам</h1>
        <button className="refresh-button">↻</button>
      </div>
      <div className="token-list">
        {tokens.map((token) => (
          <TokenTaskCard key={token.id} {...token} />
        ))}
      </div>
    </div>
  );
};

export default TokenTasks;