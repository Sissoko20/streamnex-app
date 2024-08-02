// src/components/ChannelCard.js
import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const ChannelCard = React.memo(({ channel, onClick }) => {
  return (
    <Card
      hoverable
      cover={<img alt={channel.name} src={channel.image} />}
      onClick={() => onClick(channel.url)}
      style={{ cursor: 'pointer' }}
    >
      <Meta title={channel.name} description={channel.description} />
    </Card>
  );
});

export default ChannelCard;
