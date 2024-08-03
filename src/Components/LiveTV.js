import React, { useState, useEffect, useRef, Suspense } from "react";
import "video.js/dist/video-js.css";
import videojs from "video.js";
import { Row, Col, message, Spin, Modal, Button } from "antd";
import "antd/dist/reset.css"; // Assurez-vous d'importer le style d'Ant Design
import { channels } from "../dataChannels/channels"; // Importer les chaînes
import "../Components/LiveTV.css";

const ChannelCard = React.lazy(() => import("./ChannelCard"));

const LiveTV = () => {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");
  const [currentChannelName, setCurrentChannelName] = useState("");

  useEffect(() => {
    if (playerRef.current && !player) {
      const videoPlayer = videojs(playerRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
        controlBar: {
          volumePanel: { inline: false }
        }
      });
      setPlayer(videoPlayer);
    }

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [player]);

  useEffect(() => {
    if (player && isModalVisible) {
      console.log("Setting player source:", currentChannelUrl);
      player.src({ src: currentChannelUrl, type: "application/x-mpegURL" });
      player.play().catch(error => {
        message.error("Erreur lors de la lecture de la chaîne. Veuillez réessayer.");
        console.error("Error playing the channel:", error);
      });
    }
  }, [player, isModalVisible, currentChannelUrl]);

  const checkUrlAvailability = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      console.error("Error checking URL availability:", error);
      return false;
    }
  };

  const handleChannelChange = async (channel) => {
    const { url, name } = channel;
    setLoading(true);
    const isAvailable = await checkUrlAvailability(url);
    setLoading(false);

    if (isAvailable) {
      setCurrentChannelUrl(url);
      setCurrentChannelName(name);
      setIsModalVisible(true);
    } else {
      message.error("Chaîne non disponible.");
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    if (player) {
      player.pause();
    }
  };

  return (
    <div>
      <Modal
        title={currentChannelName || "Lecteur Vidéo"}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Fermer
          </Button>
        ]}
        width="80%"
      >
        <div className="video-player">
          <video
            ref={playerRef}
            className="video-js vjs-default-skin vjs-big-play-centered"
            controls
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </Modal>
      <div className="channel-list">
        <h3>Liste des chaînes</h3>
        {loading ? (
          <Spin tip="Chargement des chaînes..." />
        ) : (
          <Row gutter={[16, 16]}>
            <Suspense fallback={<Spin tip="Chargement des chaînes..." />}>
              {channels.map((channel) => (
                <Col xs={24} sm={12} md={8} key={channel.id}>
                  <ChannelCard
                    channel={channel}
                    onClick={() => handleChannelChange(channel)}
                  />
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
