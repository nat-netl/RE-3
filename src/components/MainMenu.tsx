import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTonConnect } from '../hooks/useTonConnect';
import { useTelegram } from '../context/TelegramContext';
import './MainMenu.css';

const MainMenu: React.FC = () => {
  const { wallet, balance, connected, connectWallet } = useTonConnect();
  const { tg } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    if (tg) {
      tg.BackButton.hide();
    }
  }, [tg]);

  useEffect(() => {
    if (connected) {
      console.log('Wallet connected successfully');
    }
  }, [connected]);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div className="container">
      <div className="balance-card">
        <h2 className="balance-title">Баланс</h2>
        <p className="balance-amount">{balance || '0'} REBA</p>
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
            <button className="invite-button">Пригласить</button>
            <button className="copy-button">⧉</button>
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
            {[
              { level: 1, percent: "10%", count: 0, reward: 0 },
              { level: 2, percent: "5%", count: 0, reward: 0 },
              { level: 3, percent: "3%", count: 0, reward: 0 },
              { level: 4, percent: "3%", count: 0, reward: 0 },
              { level: 5, percent: "2%", count: 0, reward: 0 },
            ].map((row, index) => (
              <tr key={index} className="table-row">
                <td className="table-cell">{row.level}</td>
                <td className="table-cell">{row.percent}</td>
                <td className="table-cell">{row.count}</td>
                <td className="table-cell">{row.reward}</td>
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