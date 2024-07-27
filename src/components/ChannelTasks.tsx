import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../context/TelegramContext';
import ChannelTaskCard from '../card/ChannelTaskCard';
import { useUserBalance } from '../hooks/useUserBalance';
import "../styles/ChannelTasks.css";

const ChannelTasks: React.FC = () => {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const { balance, addToBalance } = useUserBalance();

  const [channels, setChannels] = useState([
    { id: 1, name: 'Канал №1', reward: '100 LIBRA', completed: false, link: '/channel/1', channelLink: 'https://t.me/devrezvan' },
    { id: 2, name: 'Канал №2', reward: '150 LIBRA', completed: false, link: '/channel/2', channelLink: 'https://t.me/channel2' },
    { id: 3, name: 'Канал №3', reward: '200 LIBRA', completed: false, link: '/channel/3', channelLink: 'https://t.me/channel3' },
    { id: 4, name: 'Канал №4', reward: '120 LIBRA', completed: false, link: '/channel/4', channelLink: 'https://t.me/channel4' },
    { id: 5, name: 'Канал №5', reward: '180 LIBRA', completed: false, link: '/channel/5', channelLink: 'https://t.me/channel5' },
  ]);

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

  const handleSubscribe = (id: number) => {
    setChannels(prevChannels => 
      prevChannels.map(channel => 
        channel.id === id ? { ...channel, completed: true } : channel
      )
    );

    const channel = channels.find(c => c.id === id);
    if (channel) {
      const rewardAmount = parseInt(channel.reward.split(' ')[0]);
      addToBalance(rewardAmount);
      tg.showAlert(`Вы получили ${channel.reward} за подписку на ${channel.name}!`);
    }
  };

  const handleRefresh = () => {
    // Реализация логики обновления
    tg.showAlert('Обновление списка каналов...');
  };

  return (
    <div className="channel-tasks-container">
      <div className="channel-tasks-header">
        <h1>Задания по каналам</h1>
        <p>Подпишитесь на каналы, чтобы получить бонусы</p>
        <p>Ваш текущий баланс: {balance} LIBRA</p>
        <button className="refresh-button" onClick={handleRefresh}>↻</button>
      </div>
      <div className="channel-list">
        {channels.map((channel) => (
          <ChannelTaskCard 
            key={channel.id} 
            {...channel} 
            onSubscribe={handleSubscribe}
          />
        ))}
      </div>
    </div>
  );
};

export default ChannelTasks;