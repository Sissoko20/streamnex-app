import React, { useState, useEffect, useRef } from 'react';
import { Avatar, List, Spin, Modal } from 'antd';
import Hls from 'hls.js';
import 'antd/dist/reset.css';

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [channels, setChannels] = useState([]);
  const [channelsLoading, setChannelsLoading] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const videoRef = useRef(null);
  const hlsRef = useRef(null); // Utilisez une référence pour le lecteur HLS

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://iptv-org.github.io/api/countries.json');
        let data = await response.json();

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

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
  };

  useEffect(() => {
    if (selectedChannel && videoRef.current) {
      if (Hls.isSupported()) {
        hlsRef.current = new Hls();
        hlsRef.current.loadSource(selectedChannel.url);
        hlsRef.current.attachMedia(videoRef.current);
      }
    } else {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    }
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [selectedChannel]);

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
              <List.Item 
                key={channel.url}
                onClick={() => handleChannelClick(channel)}
                style={{ cursor: 'pointer' }}
              >
                {channel.name}
              </List.Item>
            )}
          />
        )}
      </Modal>

      <Modal
        title={selectedChannel ? `Lecture de ${selectedChannel.name}` : ''}
        visible={!!selectedChannel}
        onCancel={() => setSelectedChannel(null)}
        footer={null}
      >
        {selectedChannel && (
          <video ref={videoRef} controls style={{ width: '100%' }} />
        )}
      </Modal>
    </div>
  );
};

export default Country;
