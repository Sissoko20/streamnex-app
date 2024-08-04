import React, { useState, useEffect, useRef, Suspense } from "react";
import Hls from "hls.js";
import { Row, Col, message, Spin, Modal, Button } from "antd";
import "antd/dist/reset.css";
import { channels } from "../dataChannels/channels";
import "../Components/LiveTV.css";

const ChannelCard = React.lazy(() => import("./ChannelCard"));

const LiveTV = () => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");
  const [currentChannelName, setCurrentChannelName] = useState("");

  useEffect(() => {
    if (videoRef.current && currentChannelUrl) {
      const video = videoRef.current;
      let hls;

      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(currentChannelUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(error => {
            message.error("Erreur lors de la lecture de la chaîne. Veuillez réessayer.");
            console.error("Error playing the channel:", error);
          });
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = currentChannelUrl;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(error => {
            message.error("Erreur lors de la lecture de la chaîne. Veuillez réessayer.");
            console.error("Error playing the channel:", error);
          });
        });
      }

      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    }
  }, [currentChannelUrl]);

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
    if (await checkUrlAvailability(url)) {
      setCurrentChannelUrl(url);
      setCurrentChannelName(name);
      setIsModalVisible(true);
    } else {
      message.error("Chaîne non disponible.");
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  };

  return (
    <div>
      <Modal
        title={currentChannelName || "Lecteur Vidéo"}
        open={isModalVisible}
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
            ref={videoRef}
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
