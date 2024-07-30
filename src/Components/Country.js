import React, { useState, useEffect } from 'react';
import { Avatar, List, Spin, Modal} from 'antd';
import 'antd/dist/reset.css';

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [channels, setChannels] = useState([]);
  const [channelsLoading, setChannelsLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://iptv-org.github.io/api/countries.json');
        let data = await response.json();
        console.log(data); // Afficher toutes les données dans la console

        // Correction des URLs des drapeaux si nécessaire
        data = data.map(country => {
          if (!country.flag) {
            // Si l'URL du drapeau est manquante, assigner une URL par défaut ou corriger l'URL ici
            country.flag = `https://example.com/flags/${country.code.toLowerCase()}.png`;
          }
          return country;
        });

        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const fetchChannels = async (countryCode) => {
    setChannelsLoading(true);
    try {
      const response = await fetch(`https://iptv-org.github.io/iptv/countries/${countryCode.toLowerCase()}.m3u`);
      const m3uData = await response.text();
      const parsedChannels = parseM3U(m3uData);
      setChannels(parsedChannels);
      setChannelsLoading(false);
    } catch (error) {
      console.error("Error fetching channels:", error);
      setChannelsLoading(false);
    }
  };

  const parseM3U = (data) => {
    const lines = data.split('\n');
    const channels = [];
    let currentChannel = {};

    lines.forEach((line) => {
      if (line.startsWith('#EXTINF:')) {
        const info = line.split(',');
        currentChannel.name = info[1];
      } else if (line.startsWith('http')) {
        currentChannel.url = line;
        channels.push(currentChannel);
        currentChannel = {};
      }
    });

    return channels;
  };
  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    fetchChannels(country.code);
  };

  if (loading) {
    return <Spin tip="Loading countries..." />;
  }



  return (
    <div style={{ padding: '20px' }}>
      <h2>Affichage des chaines par pays</h2>
      <List
        bordered
        dataSource={countries}
        renderItem={country => (
          <List.Item 
            key={country.code} 
            style={{ display: 'flex', alignItems: 'flex-start', justifyContent:'flex-start', cursor: 'pointer' }} 
            onClick={() => handleCountryClick(country)}
            
          >
            <Avatar icon={country.flag} />
            <div style={{ marginLeft: '10px' }}>
              <strong>{country.name}</strong> ({country.code})
      
            </div>
          </List.Item>
        )}
      />

      <Modal
        title={selectedCountry ? `Chaînes de ${selectedCountry.name}` : ''}
        visible={!!selectedCountry}
        onCancel={() => setSelectedCountry(null)}
        footer={null}
      >
        {channelsLoading ? (
          <Spin tip="Loading channels..." />
        ) : (
          <List
            bordered
            dataSource={channels}
            renderItem={channel => (
              <List.Item key={channel.url}>
                <a href={channel.url}  rel="noopener noreferrer">{channel.name}</a>
              </List.Item>
            )}
          />
        )}
      </Modal>
    </div>
  );
};

export default Country;
