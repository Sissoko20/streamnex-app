import React from "react";
import { Row, Card, Col } from "antd";

const Playlist = ({ movies }) => {
  return (
    <div>
      <Row gutter={16}>
        {movies.map((movie, index) => (
          <Col span={8} key={index}>
            <Card title={movie.title} bordered={false}>
              <a href={movie.link} target="_blank" rel="noopener noreferrer">
                Watch
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Playlist;
