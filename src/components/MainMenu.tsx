import React from 'react';
import { useTonConnect } from '../hooks/useTonConnect';

const MainMenu: React.FC = () => {
  const { wallet, balance } = useTonConnect();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #3498db, #8e44ad)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h2 style={{fontSize: '20px', marginBottom: '10px'}}>Balance</h2>
        <p style={{fontSize: '32px', fontWeight: 'bold', marginBottom: '5px'}}>{balance || '0'} LIBRA</p>
        <p style={{color: '#2ecc71'}}>↑ 6,18% • $10,34</p>
        <p style={{fontSize: '14px', marginTop: '10px'}}>Wallet</p>
        <p style={{fontSize: '12px', wordBreak: 'break-all'}}>
  {wallet ? wallet.address : 'Not connected'}
</p>
      </div>

      <button style={{
        width: '100%',
        backgroundColor: '#3498db',
        color: 'white',
        padding: '12px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '16px',
        marginBottom: '20px',
        cursor: 'pointer'
      }}>
        Withdraw
      </button>

      <div style={{
        backgroundColor: '#333',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
          <h3 style={{fontSize: '20px'}}>Referrals</h3>
          <p style={{fontSize: '20px', fontWeight: 'bold'}}>1,024</p>
        </div>
        <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
          <button style={{
            flex: 1,
            backgroundColor: '#444',
            color: 'white',
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            cursor: 'pointer'
          }}>
            Invite
          </button>
          <button style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#444',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
        <table style={{width: '100%', fontSize: '14px', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{color: '#888'}}>
              <th style={{textAlign: 'left'}}>Level</th>
              <th style={{textAlign: 'left'}}>Percent</th>
              <th style={{textAlign: 'left'}}>Referrals</th>
              <th style={{textAlign: 'left'}}>Reward</th>
            </tr>
          </thead>
          <tbody>
            {[
              { level: 1, percent: "10%", referrals: 3, reward: 2390 },
              { level: 2, percent: "5%", referrals: 4, reward: 1080 },
              { level: 3, percent: "3%", referrals: 5, reward: 980 },
              { level: 4, percent: "3%", referrals: 1, reward: 750 },
              { level: 5, percent: "2%", referrals: 1, reward: 510 },
            ].map((row, index) => (
              <tr key={index}>
                <td>{row.level}</td>
                <td>{row.percent}</td>
                <td>{row.referrals}</td>
                <td>{row.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        backgroundColor: '#333',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h3 style={{fontSize: '20px'}}>Bonuses</h3>
          <p style={{fontSize: '20px', fontWeight: 'bold'}}>1,024</p>
        </div>
      </div>

      <div style={{display: 'flex', gap: '10px'}}>
        <button style={{
          flex: 1,
          backgroundColor: '#3498db',
          color: 'white',
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer'
        }}>Home</button>
        <button style={{
          flex: 1,
          backgroundColor: '#444',
          color: 'white',
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer'
        }}>Miner</button>
        <button style={{
          flex: 1,
          backgroundColor: '#444',
          color: 'white',
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer'
        }}>Miner</button>
      </div>
    </div>
  );
};

export default MainMenu;