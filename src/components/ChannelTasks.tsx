import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../context/TelegramContext';
import ChannelTaskCard from '../card/ChannelTaskCard';
import "../styles/ChannelTasks.css";

const ChannelTasks: React.FC = () => {
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

  const channels = [
    { id: 1, name: 'Канал №5', reward: '100 LIBRA', completed: false, link: '/channel/1' },
    { id: 2, name: 'Канал №5', reward: '100 LIBRA', completed: false, link: '/channel/2' },
    { id: 3, name: 'Канал №5', reward: '100 LIBRA', completed: false, link: '/channel/3' },
    { id: 4, name: 'Канал №5', reward: '100 LIBRA', completed: false, link: '/channel/4' },
    { id: 5, name: 'Канал №5', reward: '100 LIBRA', completed: true, link: '/channel/5' },
  ];

  return (
    <div className="channel-tasks-container">
      <div className="channel-tasks-header">
        <h1>Задания по каналам</h1>
        <p>Подпишитесь на каналы, чтобы получить бонусы</p>
        <button className="refresh-button">↻</button>
      </div>
      <div className="channel-list">
        {channels.map((channel) => (
          <ChannelTaskCard key={channel.id} {...channel} />
        ))}
      </div>
    </div>
  );
};

export default ChannelTasks;