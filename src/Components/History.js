import React, { useState } from 'react';
import { SearchOutlined, ShopTwoTone, RadarChartOutlined,HistoryOutlined } from '@ant-design/icons';

import { Button, Flex, Tooltip } from 'antd';
function History(){

const [position, setposition]=useState('end')

    return(
        <div style={{
            
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-around',


        }}>
       <HistoryOutlined />
       <Button ghost style={{
        border:'none'
       }}>History </Button>
          
        </div>
    )
}

export default History;