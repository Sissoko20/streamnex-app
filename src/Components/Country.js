import React, { useState } from 'react';
import { SearchOutlined, WechatWorkOutlined } from '@ant-design/icons';

import { Button, Flex, Tooltip } from 'antd';
function Country(){

const [position, setposition]=useState('end')

    return(
        <div style={{
            
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-around',


        }}>
       <WechatWorkOutlined />
       <Button ghost style={{
        border:'none'
       }}>Country</Button>
          
        </div>
    )
}

export default Country;