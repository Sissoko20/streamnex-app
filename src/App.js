// src/App.js
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  SearchOutlined,
  GlobalOutlined,
  AppstoreOutlined,
  VideoCameraOutlined,
  PlayCircleOutlined,
  AudioOutlined,
  HistoryOutlined,
  SettingOutlined,
} from '@ant-design/icons';
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
  const [selectedKey, setSelectedKey] = useState('5');

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <Search />;
      case '2':
        return <Country />;
      case '3':
        return <Category />;
      case '4':
        return <LiveTV />;
      case '5':
        return <Movies />;
      case '6':
        return <TvShows />;
      case '7':
        return <Radio />;
      case '8':
        return <History />;
      case '9':
        return <Setting />;
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        theme="dark"
        width={200}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          paddingTop: '20vh',
          textAlign: 'center'
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['5']}
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
          style={{
            background: 'transparent'
          }}
        >
          <Menu.Item key="1" icon={<SearchOutlined />} style={{ background: 'transparent' }}>
            Search
          </Menu.Item>
          <Menu.Item key="2" icon={<GlobalOutlined />} style={{ background: 'transparent' }}>
            Country
          </Menu.Item>
          <Menu.Item key="3" icon={<AppstoreOutlined />} style={{ background: 'transparent' }}>
            Category
          </Menu.Item>
          <Menu.Item key="4" icon={<VideoCameraOutlined />} style={{ background: 'transparent' }}>
            LiveTV
          </Menu.Item>
          <Menu.Item key="5" icon={<PlayCircleOutlined />} style={{ background: 'transparent' }}>
            Movies
          </Menu.Item>
          <Menu.Item key="6" icon={<VideoCameraOutlined />} style={{ background: 'transparent' }}>
            TvShows
          </Menu.Item>
          <Menu.Item key="7" icon={<AudioOutlined />} style={{ background: 'transparent' }}>
            Radio
          </Menu.Item>
          <div className='historySettings' style={{ paddingTop: '10vh' }}>
            <Menu.Item key="8" icon={<HistoryOutlined />} style={{ background: 'transparent' }}>
              History
            </Menu.Item>
            <Menu.Item key="9" icon={<SettingOutlined />} style={{ background: 'transparent' }}>
              Setting
            </Menu.Item>
          </div>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
