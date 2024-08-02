// src/components/LiveTV.js
import React, { useState, useEffect, useRef, Suspense } from 'react';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import { Row, Col, message, Spin } from 'antd';
import 'antd/dist/reset.css'; // Assurez-vous d'importer le style d'Ant Design
import { channels } from '../dataChannels/channels'; // Importer les chaînes

const ChannelCard = React.lazy(() => import('./ChannelCard'));

const LiveTV = () => {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (playerRef.current && !player) {
      const videoPlayer = videojs(playerRef.current, {
        controls: true,
        autoplay: false,
        preload: 'auto'
      });
      setPlayer(videoPlayer);
    }

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [player]);

  // Vérifie la disponibilité d'une URL
  const checkUrlAvailability = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error('Error checking URL availability:', error);
      return false;
    }
  };

  const handleChannelChange = async (url) => {
    if (player) {
      if (await checkUrlAvailability(url)) {
        try {
          player.src({ src: url, type: 'application/x-mpegURL' });
          await player.play();
        } catch (error) {
          message.error('Erreur lors de la lecture de la chaîne. Veuillez réessayer.');
          console.error('Error playing the channel:', error);
        }
      } else {
        message.error('Chaîne non disponible.');
      }
    }
  };

  const playFirstAvailableChannel = async () => {
    setLoading(true);
    for (let channel of channels) {
      if (await checkUrlAvailability(channel.url)) {
        handleChannelChange(channel.url);
        setLoading(false);
        return;
      }
    }
    setLoading(false);
    message.error('Aucune chaîne disponible.');
  };

  return (
    <div onClick={playFirstAvailableChannel}>
      <div>
        <video ref={playerRef} className="video-js vjs-default-skin" controls />
      </div>
      <div>
        <h3>Channels</h3>
        {loading ? (
          <Spin tip="Chargement des chaînes..." />
        ) : (
          <Row gutter={16}>
            <Suspense fallback={<Spin tip="Chargement des chaînes..." />}>
              {channels.map((channel) => (
                <Col span={8} key={channel.name}>
                  <ChannelCard channel={channel} onClick={handleChannelChange} />
                </Col>
              ))}
            </Suspense>
          </Row>
        )}
      </div>
    </div>
  );
};

export default LiveTV;
