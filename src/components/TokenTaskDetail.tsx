import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTelegram } from '../context/TelegramContext';
import '../styles/TokenTaskDetail.css';

interface TaskStep {
  id: number;
  description: string;
}

const TokenTaskDetail: React.FC = () => {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const { tokenId } = useParams<{ tokenId: string }>();

  useEffect(() => {
    if (tg) {
      tg.BackButton.show();
      tg.BackButton.onClick(() => navigate('./token-task'));
    }
    return () => {
      if (tg) {
        tg.BackButton.offClick();
      }
    };
  }, [tg, navigate]);

  // Здесь вы можете загрузить данные о задании на основе tokenId
  const taskData = {
    name: 'REBA',
    description: 'Ознакомтесь с токеном и получите вознаграждение в DMT токене. Не продавайте токены до аирдропа, иначе не получите награду',
    reward: '100 REBA',
    progress: '75 из 100',
    progressNote: 'В этом задании ограниченное количество участников',
    steps: [
      { id: 1, description: 'Подписаться на канал Rebalancer' },
      { id: 2, description: 'Купите минимум 5000 REBA' },
    ],
  };

  return (
    <div className="token-task-detail">
      <h1 className="task-name">{taskData.name}</h1>
      <p className="task-description">{taskData.description}</p>
      
      <div className="info-card">
        <h2>Награда</h2>
        <p className="reward">{taskData.reward}</p>
      </div>
      
      <div className="info-card">
        <h2>Выполнили</h2>
        <p className="progress">{taskData.progress}</p>
        <p className="progress-note">{taskData.progressNote}</p>
      </div>
      
      <div className="info-card">
        <h2>Задание</h2>
        {taskData.steps.map((step) => (
          <div key={step.id} className="task-step">
            <p>{`${step.id}. ${step.description}`}</p>
            <span className="arrow">›</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenTaskDetail;