import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ChannelTaskCardProps {
  id: number;
  name: string;
  reward: string;
  completed: boolean;
  link: string;
}

const ChannelTaskCard: React.FC<ChannelTaskCardProps> = ({ id, name, reward, completed, link }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(link)}
      className={`channel-item ${completed ? 'completed' : ''}`}
    >
      <img src="/path-to-channel-icon.png" alt="Channel icon" className="channel-icon" />
      <div className="channel-info">
        <span className="channel-name">{name}</span>
        <span className="channel-reward">{reward}</span>
      </div>
      {completed ? (
        <span className="completed-icon">✓</span>
      ) : (
        <span className="arrow-icon">›</span>
      )}
    </div>
  );
};

export default ChannelTaskCard;