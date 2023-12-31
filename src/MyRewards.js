import React, { useEffect, useState } from 'react';

const RewardCalculator = () => {
  const [transactionData, setTransactionData] = useState([]);

  // Simulate an asynchronous API call to fetch transaction data
  useEffect(() => {
    const fetchData = async () => {
      // Simulated API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Simulated transaction data for three months
      const data = [
        { customer: 'Luke', transactionAmount: 120, transactionDate: '2023-04-15' },
        { customer: 'Laila', transactionAmount: 80, transactionDate: '2023-04-20' },
        { customer: 'Laila', transactionAmount: 150, transactionDate: '2023-05-05' },
        { customer: 'Luke', transactionAmount: 90, transactionDate: '2023-06-10' },
        { customer: 'Laila', transactionAmount: 110, transactionDate: '2023-06-05' },
        { customer: 'Luke', transactionAmount: 80, transactionDate: '2023-05-17' }
        // Add more transaction data here...
      ];
      setTransactionData(data);
    };

    fetchData();
  }, []);

  // Calculate reward points for each customer per month and total
  const calculateRewards = () => {
    const monthlyRewards = {};
    const totalRewards = {};

    transactionData.forEach((transaction) => {
      const { customer, transactionAmount, transactionDate } = transaction;
      const month = new Date(transactionDate).toLocaleString('default', { month: 'long' });
      const points =
        transactionAmount > 100
          ? (transactionAmount - 100) * 2 + 50
          : transactionAmount > 50
          ? transactionAmount - 50
          : 0;

      // Calculate rewards per month
      monthlyRewards[customer] = {
        ...monthlyRewards[customer],
        [month]: (monthlyRewards[customer]?.[month] || 0) + points,
      };

      // Calculate total rewards
      totalRewards[customer] = (totalRewards[customer] || 0) + points;
    });

    return { monthlyRewards, totalRewards };
  };

  // Render rewards data
  const renderRewards = () => {
    const { monthlyRewards, totalRewards } = calculateRewards();

    return (
      <div>
        <h2>Monthly Rewards</h2>
        <ul>
          {Object.entries(monthlyRewards).map(([customer, rewards]) => (
            <li key={customer}>
              {customer}:
              {Object.entries(rewards).map(([month, points]) => (
                <span key={month}>
                  {month}: {points} points,{' '}
                </span>
              ))}
            </li>
          ))}
        </ul>
        <h2>Total Rewards</h2>
        <ul>
          {Object.entries(totalRewards).map(([customer, points]) => (
            <li key={customer}>
              {customer}: {points} points
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>Rewards Program Calculator</h1>
      {transactionData.length === 0 ? <p>Loading transaction data...</p> : renderRewards()}
    </div>
  );
};

export default RewardCalculator;
