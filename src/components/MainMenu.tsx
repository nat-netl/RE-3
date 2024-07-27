import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTonConnect } from '../hooks/useTonConnect';
import { useTelegram } from '../context/TelegramContext';
import { useUserBalance } from '../hooks/useUserBalance';
import { referralLevels } from '../utils/referralSystem';
import '../styles/MainMenu.css';
import backgroundVideo from '../assets/video.mp4';

const MainMenu: React.FC = () => {
  const { wallet, connected, connectWallet } = useTonConnect();
  const { balance } = useUserBalance();
  const { tg, user } = useTelegram();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleInvite = () => {
    if (tg && tg.shareUrl) {
      const referralLink = `https://t.me/your_bot?start=REF${user?.id}`;
      tg.shareUrl(referralLink);
    }
  };

  const handleCopyReferralLink = () => {
    const referralLink = `https://t.me/your_bot?start=REF${user?.id}`;
    navigator.clipboard.writeText(referralLink).then(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    });
  };

  return (
    <div className="container">
      {showNotification && (
        <div className="notification">
          Пригласительная ссылка скопирована в буфер обмена
        </div>
      )}
      <div className="balance-card">
        <video autoPlay loop muted playsInline>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <h2 className="balance-title">Баланс</h2>
        <p className="balance-amount">{balance} REBA</p>
        <p className="balance-change">↑ 6,18% • $10,34</p>
        <p className="wallet-label">Кошелек</p>
        <p className="wallet-address">
          {wallet ? wallet.address : ''}
        </p>
        {connected ? (
          <button className="withdraw-button">
            <span style={{marginRight: '5px'}}>↑</span> Вывод
          </button>
        ) : (
          <button className="connect-wallet-button" onClick={handleConnectWallet}>
            Подключить кошелек
          </button>
        )}
      </div>

      <div className="card">
        <div className="referrals-header">
          <div>
            <h3 className="referrals-title">Рефералы</h3>
            <p className="referrals-count">0</p>
          </div>
          <div style={{display: 'flex', gap: '10px'}}>
            <button className="invite-button" onClick={handleInvite}>Пригласить</button>
            <button className="copy-button" onClick={handleCopyReferralLink}>⧉</button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr className="table-header">
              <th className="table-cell">Уровень</th>
              <th className="table-cell">Процент</th>
              <th className="table-cell">Кол-во</th>
              <th className="table-cell">Награда</th>
            </tr>
          </thead>
          <tbody>
            {referralLevels.map((level) => (
              <tr key={level.level} className="table-row">
                <td className="table-cell">{level.level}</td>
                <td className="table-cell">{level.percentage}%</td>
                <td className="table-cell">0</td>
                <td className="table-cell">0 REBA</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 className="list-title">Как купить или продать LIBRA?</h3>
        <ol className="ordered-list">
          <li>Перейти в Dedust.io</li>
          <li>Подключите свой кошелёк</li>
          <li>Перейдите в раздел «Swap»</li>
          <li>Обменяйте LIBRA на другую монету или другую монету на LIBRA</li>
          <li>LIBRA можно купить или продать только за другие токены. Мы рекомендуем использовать TON.</li>
        </ol>
      </div>

      <div className="card">
        <h3 className="list-title">История транзакций</h3>
        {[
          { type: 'Получение', amount: '+2 000 LIBRA', date: '22.07.2024 14:02' },
          { type: 'Вывод', amount: '-2 000 LIBRA', date: '22.07.2024 14:02:02' },
          { type: 'Получение', amount: '+2 000 LIBRA', date: '22.07.2024 14:02' },
          { type: 'Получение', amount: '+2 000 LIBRA', date: '22.07.2024 14:02' },
        ].map((transaction, index) => (
          <div key={index} className="transaction">
            <span className={transaction.type === 'Получение' ? 'transaction-receive' : 'transaction-withdraw'}>
              {transaction.type}
            </span>
            <span>{transaction.amount}</span>
            <span className="transaction-date">{transaction.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainMenu;