import React, { useState } from 'react';
import { SearchOutlined, ShopTwoTone, RadarChartOutlined,HistoryOutlined, SettingOutlined } from '@ant-design/icons';

import { Button, Flex, Tooltip } from 'antd';
function Setting(){

const [position, setposition]=useState('end')

    return(
        <div style={{
            
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-around',


        }}>
       <SettingOutlined />
       <Button ghost style={{
        border:'none'
       }}>Settings </Button>
          
        </div>
    )
}

export default Setting;