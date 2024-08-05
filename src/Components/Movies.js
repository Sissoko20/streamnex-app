import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Spin, Alert, Input, Button } from 'antd';
import axios from 'axios';
import './Movies.css';

const Movies = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('full movies');
  const [queryInput, setQueryInput] = useState('');
  const API_KEY = 'AIzaSyArebEkW6UumF3UvtqhgNUWHrgET5Rb_BE';

  useEffect(() => {
    const fetchVideos = async () => {
      if (!searchQuery) return; // Ne pas faire de requête si searchQuery est vide
      setLoading(true);
      setError(null);

      try {
        const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${API_KEY}`;
        const response = await axios.get(API_URL);
        const enrichedVideos = response.data.items.map(video => ({
          ...video,
          additionalInfo: 'Some additional info',
        }));
        setVideos(enrichedVideos);
      } catch (error) {
        console.error('Error fetching YouTube videos', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchQuery]);

  const handleSearch = () => {
    setSearchQuery(queryInput);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}><Spin size="large" /></div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Alert message="Error loading videos" description="Please try again later." type="error" showIcon />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Input
          placeholder="Search for videos"
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          style={{ width: '80%', marginRight: '10px' }}
        />
        <Button type="primary" onClick={handleSearch}>Search</Button>
      </div>

      <Row gutter={[16, 16]}>
        {videos.map(video => (
          <Col key={video.id.videoId} xs={24} sm={12} md={8} lg={6}>
            <Card
              cover={<img alt={video.snippet.title} src={video.snippet.thumbnails.high.url} />}
              hoverable
            >
              <Card.Meta title={video.snippet.title} description={video.snippet.description} />
              <iframe
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={video.snippet.title}
                style={{ width: '100%', height: '200px', marginTop: '10px' }}
              ></iframe>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Movies;
