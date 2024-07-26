import React, { useState } from 'react';
import { SearchOutlined, ShopTwoTone, RadarChartOutlined } from '@ant-design/icons';

import { Button, Flex, Tooltip } from 'antd';
function TvShows(){

const [position, setposition]=useState('end')

    return(
        <div style={{
            
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-around',


        }}>
       <RadarChartOutlined />
       <Button ghost style={{
        border:'none'
       }}>TV Shows</Button>
          
        </div>
    )
}

export default TvShows;