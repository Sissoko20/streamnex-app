// src/Components/Country.js
import React, { useState, useEffect } from 'react';
import { List, Spin } from 'antd';
import 'antd/dist/reset.css';
const Country = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://iptv-org.github.io/api/countries.json');
        const data = await response.json();
        setCountries(data.filter(country => country.languages.includes('fra')));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <Spin tip="Loading countries..." />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>French Speaking Countries</h2>
      
    </div>
  );
};

export default Country;
