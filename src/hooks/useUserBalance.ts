import { useState, useEffect } from 'react';
import { useTonConnect } from './useTonConnect';

export const useUserBalance = () => {
  const [balance, setBalance] = useState<number>(0);
  const { wallet, connected } = useTonConnect();

  useEffect(() => {
    if (connected && wallet) {
      // Здесь должна быть логика получения баланса из кошелька
      // Для примера используем случайное число
      setBalance(Math.floor(Math.random() * 1000));
    }
  }, [connected, wallet]);

  const addToBalance = (amount: number) => {
    setBalance(prevBalance => prevBalance + amount);
    // Здесь должна быть логика обновления баланса в кошельке или на бэкенде
    console.log(`Баланс увеличен на ${amount} LIBRA`);
  };

  const subtractFromBalance = (amount: number) => {
    if (balance >= amount) {
      setBalance(prevBalance => prevBalance - amount);
      // Здесь должна быть логика обновления баланса в кошельке или на бэкенде
      console.log(`Баланс уменьшен на ${amount} LIBRA`);
      return true;
    } else {
      console.log('Недостаточно средств');
      return false;
    }
  };

  return {
    balance,
    addToBalance,
    subtractFromBalance
  };
};