import React, { useState } from 'react';
import { SearchOutlined, ShopTwoTone, RadarChartOutlined , VideoCameraOutlined} from '@ant-design/icons';

import { Button, Flex, Tooltip } from 'antd';
function Movies(){

const [position, setposition]=useState('end')

    return(
        <div style={{
            
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-around',


        }}>
       <VideoCameraOutlined />
       <Button ghost style={{
        border:'none'
       }}>Movies</Button>
          
        </div>
    )
}

export default Movies;