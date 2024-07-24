import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTonConnect } from '../hooks/useTonConnect';
import { useTelegram } from '../context/TelegramContext';

const pages = [
  {
    title: "Добро пожаловать в Rebalancer",
    description: "Выполняйте задания, получайте вознаграждения, включайте майнинг для генерации прибыли и наслаждайтесь ежедневными airdrop-ами.",
    buttonText: "Продолжить"
  },
  {
    title: "Реинвестируйте заработанное",
    description: "Увеличьте свой крипто-заработок, занимайтесь стейкингом и фармингом, получая доход до 300% более.",
    buttonText: "Продолжить"
  },
  {
    title: "Инвестиционная платформа на TON",
    description: "Rebalancer — генерирующий комиссии жетон в пулах ликвидности за счет ребалансировки. Инвестируя в Rebalancer вы инвестируете в ТОП проектов TON.",
    buttonText: "Подключить кошелек"
  }
];

const OnboardingPages: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { connectWallet, connected } = useTonConnect();
  const { tg } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    if (connected) {
      navigate('/main-menu');
    }
  }, [connected, navigate]);

  useEffect(() => {
    console.log('Current page:', currentPage);
    console.log('Connected:', connected);
  }, [currentPage, connected]);

  const handleButtonClick = async () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      try {
        if (typeof connectWallet === 'function') {
          await connectWallet();
          navigate('/main-menu');
        } else {
          setError('Функция подключения кошелька недоступна');
        }
      } catch (error) {
        setError('Не удалось подключить кошелек');
        console.error('Failed to connect wallet:', error);
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
      justifyContent: 'space-between',
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <img
          src="/safe.png"
          alt="Rebalancer Logo"
          style={{
            width: '200px',
            height: 'auto',
            marginBottom: '24px'
          }}
        />
        <h1 style={{fontSize: '24px', marginBottom: '16px'}}>{page.title}</h1>
        <p style={{fontSize: '16px', color: '#a0a0a0', marginBottom: '24px'}}>{page.description}</p>
        {error && <p style={{color: 'red', marginBottom: '16px'}}>{error}</p>}
      </div>
      <div>
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
        {currentPage < pages.length - 1 && (
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
            Пропустить
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingPages;