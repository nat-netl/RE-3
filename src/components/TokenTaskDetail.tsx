import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTelegram } from '../context/TelegramContext';
import { useUserBalance } from '../hooks/useUserBalance';
import { useTransactions } from '../hooks/useTransactions';
import { checkTokenOwnership } from '../utils/blockchain';
import { tokenTasks, TokenTask } from '../config/tokenTasks';
import { distributeReferralRewards } from '../utils/referralSystem';
import '../styles/TokenTaskDetail.css';

const TokenTaskDetail: React.FC = () => {
  const { tg, user } = useTelegram();
  const navigate = useNavigate();
  const { tokenId } = useParams<{ tokenId: string }>();
  const { addToBalance } = useUserBalance();
  const { addTransaction } = useTransactions();
  const [task, setTask] = useState<TokenTask | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [ownsToken, setOwnsToken] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  useEffect(() => {
    const currentTask = tokenTasks.find(t => t.id === Number(tokenId));
    if (currentTask) {
      setTask(currentTask);
    } else {
      navigate('/token-tasks');
    }
  }, [tokenId, navigate]);

  useEffect(() => {
    if (tg && tg.BackButton) {
      tg.BackButton.show();
      tg.BackButton.onClick(() => navigate('/token-tasks'));
    }
    return () => {
      if (tg && tg.BackButton) {
        tg.BackButton.offClick();
      }
    };
  }, [tg, navigate]);

  const handleSubscribe = () => {
    if (task) {
      window.open(task.channelLink, '_blank');
    }
  };

  const handleBuyTokens = () => {
    setMessage('Переход на страницу покупки токенов');
  };

  const handleCheckCompletion = async () => {
    if (isTaskCompleted) {
      setMessage('Вы уже выполнили это задание');
      return;
    }

    if (task && user) {
      const subscriptionStatus = await checkChannelSubscription(task.channelLink);
      const tokenOwnershipStatus = await checkTokenOwnership(user.id, task.tokenAddress, task.requiredTokenAmount);

      setIsSubscribed(subscriptionStatus);
      setOwnsToken(tokenOwnershipStatus);

      if (subscriptionStatus && tokenOwnershipStatus) {
        const rewardAmount = Number(task.reward.split(' ')[0]);
        addToBalance(rewardAmount);
        
        // Добавляем транзакцию
        addTransaction({
          type: 'Получение',
          amount: `${rewardAmount} REBA`,
          description: `Выполнение задания ${task.name}`
        });

        // Распределение реферальных наград
        await distributeReferralRewards(user.id, rewardAmount);

        setMessage(`Поздравляем! Вы выполнили задание и получили ${task.reward}!`);
        setIsTaskCompleted(true);
        setTimeout(() => navigate('/token-tasks'), 3000);
      } else {
        setMessage('Пожалуйста, выполните все шаги задания');
      }
    }
  };

  const checkChannelSubscription = async (channelLink: string) => {
    // Здесь должна быть реальная логика проверки подписки на канал
    return true;
  };

  if (!task) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="token-task-detail">
      <h1 className="task-name">{task.name}</h1>
      <p className="task-description">{task.description}</p>
      <div className="info-card">
        <h2>Награда</h2>
        <p className="reward">{task.reward}</p>
      </div>
      <div className="info-card">
        <h2>Выполнили</h2>
        <p className="progress">? из {task.maxParticipants}</p>
        <p className="progress-note">В этом задании ограниченное количество участников</p>
      </div>
      <div className="info-card">
        <h2>Задание</h2>
        <div className="task-step" onClick={handleSubscribe}>
          <p>1. Подписаться на канал {task.name}</p>
          {isSubscribed ? <span className="completed">✓</span> : <span className="arrow">›</span>}
        </div>
        <div className="task-step" onClick={handleBuyTokens}>
          <p>2. Купите минимум {task.requiredTokenAmount} {task.name.split(' ')[0]}</p>
          {ownsToken ? <span className="completed">✓</span> : <span className="arrow">›</span>}
        </div>
      </div>
      <button className="check-completion-button" onClick={handleCheckCompletion} disabled={isTaskCompleted}>
        {isTaskCompleted ? 'Задание выполнено' : 'Проверить выполнение'}
      </button>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default TokenTaskDetail;