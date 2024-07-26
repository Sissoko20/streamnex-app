import React, { useState } from 'react';
import { SearchOutlined, ShopTwoTone } from '@ant-design/icons';

import { Button, Flex, Tooltip } from 'antd';
function LiveTV(){

const [position, setposition]=useState('end')

    return(
        <div style={{
            
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-around',


        }}>
       <ShopTwoTone />
       <Button ghost style={{
        border:'none'
       }}>LiveTV</Button>
          
        </div>
    )
}

export default LiveTV;