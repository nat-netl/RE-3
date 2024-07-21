import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTonConnect } from '../hooks/useTonConnect';

const pages = [
  {
    subtitle: "Rebalancer",
    title: "Welcome to",
    description: "Rebalancer is a platform on TON for passive income. Increase your crypto earnings with Auto-Reinvestment just with one click",
    buttonText: "Continue"
  },
  {
    title: "Boost your APY through",
    subtitle: "reinvestment",
    description: "Reinvest your earnings automatically, boosting your APY from 5% to 150%. Let your money work for you.",
    buttonText: "Connect wallet"
  }
];

const OnboardingPages: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { connectWallet, connected } = useTonConnect();
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    if (currentPage === 0) {
      setCurrentPage(1);
    } else {
      try {
        await connectWallet();
        navigate('/main-menu');
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        // Здесь вы можете добавить обработку ошибки, например, показать пользователю сообщение об ошибке
      }
    }
  };

  const handleSkip = () => {
    navigate('/main-menu');
  };

  const page = pages[currentPage];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{width: '100%', maxWidth: '300px'}}>
        <h2 style={{fontSize: '32px', color: '#3498db', marginBottom: '16px'}}>{page.subtitle}</h2>
        
        {/* Добавленное изображение */}
        <img 
          src="/safe.png" 
          alt="Rebalancer Logo" 
          style={{
            width: '200px', // или другой подходящий размер
            height: 'auto',
            marginBottom: '24px'
          }}
        />

        <h1 style={{fontSize: '24px', marginBottom: '8px'}}>{page.title}</h1>
        
        <p style={{fontSize: '16px', color: '#a0a0a0', marginBottom: '24px'}}>{page.description}</p>
        <button 
          onClick={handleButtonClick}
          style={{
            width: '100%',
            backgroundColor: '#3498db',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            marginBottom: '12px',
            cursor: 'pointer'
          }}
        >
          {page.buttonText}
        </button>
        <button 
          onClick={handleSkip}
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            color: '#a0a0a0',
            padding: '12px',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default OnboardingPages;