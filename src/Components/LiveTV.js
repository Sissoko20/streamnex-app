import React, { useState, useEffect, Suspense } from "react";
import ReactPlayer from "react-player";
import { Row, Col, message, Spin, Modal, Button } from "antd";
import "antd/dist/reset.css";
import { db, collection, getDocs } from "../firebase"; // Assurez-vous que le chemin est correct
import "../Components/LiveTV.css";

const ChannelCard = React.lazy(() => import("./ChannelCard"));

const LiveTV = () => {
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");
  const [currentChannelName, setCurrentChannelName] = useState("");

  const timeout = (ms) => {
    return new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), ms));
  };

  const fetchWithTimeout = async (url, options, timeoutDuration) => {
    return Promise.race([
      fetch(url, options),
      timeout(timeoutDuration),
    ]);
  };

  const checkUrlAvailability = async (url) => {
    try {
      const response = await fetchWithTimeout(url, {}, 20000); // 20 seconds timeout
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
      setCurrentChannelUrl(""); // Clear current URL if the channel is unavailable
      setCurrentChannelName("");
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const fetchChannels = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "channels"));
      const channelsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChannels(channelsData);
    } catch (error) {
      console.error("Error fetching channels:", error);
      message.error("Erreur lors de la récupération des chaînes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

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
          <ReactPlayer
            url={currentChannelUrl}
            controls
            width="100%"
            height="auto"
          />
        </div>
      </Modal>
      
      <div className="channel-list">
        <h3>Liste des chaînes ({channels.length})</h3>
        {loading ? (
          <Spin tip="Chargement des chaînes..." />
        ) : (
          <Row gutter={[16, 16]}>
            <Suspense fallback={<Spin tip="Chargement des chaînes..." />}>
              {channels.map((channel) => (
                <Col xs={24} sm={12} md={8} lg={6} key={channel.id}>
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
