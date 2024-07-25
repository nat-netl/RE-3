import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TokenTaskCardProps {
  id: number;
  name: string;
  reward: string;
}

const TokenTaskCard: React.FC<TokenTaskCardProps> = ({ id, name, reward }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/token-task/${id}`)}
      className="token-item"
    >
      <div className="token-icon">₭</div>
      <div className="token-info">
        <span className="token-name">{name}</span>
        <span className="token-reward">{reward}</span>
      </div>
      <span className="arrow-icon">›</span>
    </div>
  );
};

export default TokenTaskCard;