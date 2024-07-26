import React, { useState } from 'react';
import { SearchOutlined, WechatWorkOutlined } from '@ant-design/icons';

import { Button, Flex, Tooltip } from 'antd';
function Search(){

const [position, setposition]=useState('end')

    return(
        <div style={{
            
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-around',


        }}>
       <SearchOutlined />
       <Button ghost style={{
        border:'none'
       }}>Search</Button>
          
        </div>
    )
}

export default Search;