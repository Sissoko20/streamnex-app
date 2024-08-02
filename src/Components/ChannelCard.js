import React from 'react';
import { Card } from 'antd';

const ChannelCard = ({ channel, onClick }) => (
  <Card
    hoverable
    onClick={onClick}
    style={{ marginBottom: '16px' }}
    cover={<img alt={channel.name} src={channel.logo || 'placeholder-image.png'} />}
  >
    <Card.Meta title={channel.name} />
  </Card>
);

export default ChannelCard;
