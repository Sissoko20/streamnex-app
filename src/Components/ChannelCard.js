import React from 'react';
import { Card, Avatar } from 'antd';
import "./ChannelCard.css"

const ChannelCard = ({ channel, onClick }) => (
  <Card className='cardChannel'
    hoverable
    onClick={onClick}
    style={{ marginBottom: '16px' }}
    cover={<img alt={channel.name} src={channel.logo || '/placeholder-image.png'} />}
    
  >
    <Card.Meta title={channel.name} />
  </Card>
);

export default ChannelCard;
