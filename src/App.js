import React from 'react';
import { Layout, Menu, Card, Carousel } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import Search from './Components/Search';
import Country from './Components/Country';
import LiveTV from './Components/LiveTV';
import Radio from './Components/Radio';
import Category from './Components/Category';
import Movies from './Components/Movies';
import TvShows from './Components/TvShows';
import History from './Components/History';
import Setting from './Components/Settings';




const { Sider, Content } = Layout;
const App = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider className='ItemMenu'
        theme="dark"
        width={200}
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
          paddingTop:'20vh',
          textAlign:'center'

         }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{
         background: 'transparent' 
        }}>
          <Menu.Item key="1" style={{
            background:'transparent'
          }}>
        <Search />
          </Menu.Item>
          <Menu.Item key="2">
            <Country />
          </Menu.Item>
          <Menu.Item key="3">
          <Category/>
          </Menu.Item>
          <Menu.Item key="4">
            <LiveTV/>
          </Menu.Item>
          <Menu.Item key="5">
          <Movies/>
          </Menu.Item>
          <Menu.Item key="6">
            <TvShows/>
          </Menu.Item>
          <Menu.Item key="7">
            <Radio/>
          </Menu.Item>
          <div className='historySettings' style={{
            paddingTop:'10vh'
          }}>
          <Menu.Item key="8">
            <History/>
          </Menu.Item>
          <Menu.Item key="9">
          <Setting/>

          </Menu.Item>
          </div>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Card
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              width: '60%',
              margin: 'auto',
              textAlign: 'left'
            }}
          >
            <h1>Greta</h1>
            <p>A young woman returns an abandoned handbag...</p>
          </Card>
          <Carousel autoplay>
            <div>
              <img src="path_to_image1.jpg" alt="Movie 1" />
            </div>
            <div>
              <img src="path_to_image2.jpg" alt="Movie 2" />
            </div>
            <div>
              <img src="path_to_image3.jpg" alt="Movie 3" />
            </div>
          </Carousel>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
