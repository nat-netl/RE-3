import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from "../context/TelegramContext";
import './TasksPage.css';

const TasksPage: React.FC = () => {
  const { tg } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    if (tg) {
      tg.BackButton.show();
      tg.BackButton.onClick(() => navigate('/main-menu'));
    }

    return () => {
      if (tg) {
        tg.BackButton.offClick();
      }
    };
  }, [tg, navigate]);

  return (
    <div className="tasks-container">
      <h1 className="tasks-title">Выполняйте задания и получайте токены</h1>
      
      <div className="refresh-button">
        <span>⟳</span>
      </div>

      <div className="task-section">
        <h2 className="section-title">База – Академия REBA</h2>
        <p className="section-description">Для доступа к заданиям, сперва необходимо пройти академию</p>
      </div>

      <div className="task-list">
        <div className="task-item">
          <span className="task-name">Задания по каналам</span>
          <span className="task-count">5 &gt;</span>
        </div>
        <div className="task-item">
          <span className="task-name">Задания по токенам</span>
          <span className="task-count">5 &gt;</span>
        </div>
        <div className="task-item">
          <span className="task-name">Задания по стейкингу</span>
          <span className="task-count">5 &gt;</span>
        </div>
        <div className="task-item">
          <span className="task-name">Задания по фармингу</span>
          <span className="task-count">5 &gt;</span>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;