import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PortfolioDebug = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getPortfolios();
        console.log('Debug - Full API Response:', response);
        setData(response);
      } catch (error) {
        console.error('Debug - Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', background: 'white', color: 'black', margin: '20px' }}>
      <h2>Portfolio Debug</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default PortfolioDebug;
