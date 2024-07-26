import React, { useState } from 'react';
import { SearchOutlined, ShopTwoTone,GroupOutlined  } from '@ant-design/icons';

import { Button, Flex, Tooltip } from 'antd';
function Category(){

const [position, setposition]=useState('end')

    return(
        <div style={{
            
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-around',


        }}>
       <GroupOutlined />
       <Button ghost style={{
        border:'none'
       }}>Category</Button>
          
        </div>
    )
}

export default Category;