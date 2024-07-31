import React, { useState, useEffect, useRef } from "react";
import { Card, Col, Row, Spin, Modal, List, Avatar } from "antd";
import Hls from "hls.js";
import "antd/dist/reset.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import SearchBar from "./SearchBar"; // Assurez-vous d'importer le nouveau composant

const { Meta } = Card;

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [channelsLoading, setChannelsLoading] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [epgData, setEpgData] = useState([]);
  const [epgLoading, setEpgLoading] = useState(false);
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://iptv-org.github.io/api/categories.json");
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchChannels = async (categoryId) => {
    setChannelsLoading(true);
    try {
      const response = await fetch(
        `https://iptv-org.github.io/iptv/categories/${categoryId.toLowerCase()}.m3u`
      );
      const m3uData = await response.text();
      const parsedChannels = parseM3U(m3uData);
      setChannels(parsedChannels);
      setFilteredChannels(parsedChannels);
      setChannelsLoading(false);
    } catch (error) {
      console.error("Error fetching channels:", error);
      setChannelsLoading(false);
    }
  };

  const fetchEpgData = async (channelId) => {
    setEpgLoading(true);
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/iptv-org/epg/master/channels/${channelId}.json`
      );
      const data = await response.json();
      setEpgData(data.programs);
      setEpgLoading(false);
    } catch (error) {
      console.error("Error fetching EPG data:", error);
      setEpgLoading(false);
    }
  };

  const parseM3U = (data) => {
    const lines = data.split("\n");
    const channels = [];
    let currentChannel = {};

    lines.forEach((line) => {
      if (line.startsWith("#EXTINF:")) {
        const info = line.split(",");
        currentChannel.name = info[1];
        const attrs = info[0].split(" ");
        attrs.forEach((attr) => {
          if (attr.startsWith("tvg-logo=")) {
            currentChannel.logo = attr.split("=")[1].replace(/"/g, '');
          }
          if (attr.startsWith("tvg-id=")) {
            currentChannel.id = attr.split("=")[1].replace(/"/g, '');
          }
        });
      } else if (line.startsWith("http")) {
        currentChannel.url = line;
        channels.push(currentChannel);
        currentChannel = {};
      }
    });

    return channels;
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchChannels(category.name);
  };

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
    fetchEpgData(channel.id);
  };

  const handleSearch = (value) => {
    const filtered = channels.filter((channel) =>
      channel.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredChannels(filtered);
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
    return <Spin tip="Loading categories..." />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chaines par catégorie</h2>
      <Row gutter={[16, 16]}>
        {categories.map((category) => (
          <Col xs={24} sm={12} md={8} lg={6} key={category.name}>
            <Card
              hoverable
              onClick={() => handleCategoryClick(category)}
              cover={<img alt={category.name} src={category.icon} />}
            >
              <Meta title={category.name} />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={selectedCategory ? `Chaînes de ${selectedCategory.name}` : ""}
        visible={!!selectedCategory}
        onCancel={() => setSelectedCategory(null)}
        footer={null}
      >
        <SearchBar onSearch={handleSearch} />
        {channelsLoading ? (
          <Spin tip="Loading channels..." />
        ) : (
          <List
            bordered
            dataSource={filteredChannels}
            renderItem={(channel) => (
              <List.Item
                key={channel.url}
                onClick={() => handleChannelClick(channel)}
                style={{ cursor: "pointer" }}
              >
                {channel.logo && (
                  <Avatar src={channel.logo} style={{ marginRight: "10px" }} />
                )}
                {channel.name}
              </List.Item>
            )}
          />
        )}
      </Modal>

      <Modal
        title={selectedChannel ? `Lecture de ${selectedChannel.name}` : ""}
        visible={!!selectedChannel}
        onCancel={() => setSelectedChannel(null)}
        footer={null}
      >
        {selectedChannel && (
          <video ref={videoRef} controls style={{ width: "100%" }} />
        )}
        {epgLoading ? (
          <Spin tip="Loading EPG..." />
        ) : (
          <List
            bordered
            dataSource={epgData}
            renderItem={(program) => (
              <List.Item>
                <div>
                  <strong>{program.title}</strong>
                  <p>{program.description}</p>
                  <p>{new Date(program.start).toLocaleString()} - {new Date(program.stop).toLocaleString()}</p>
                </div>
              </List.Item>
            )}
          />
        )}
      </Modal>
      <SpeedInsights />
      <Analytics />
    </div>
  );
};

export default Category;
