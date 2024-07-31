import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  SearchOutlined,
  GlobalOutlined,
  AppstoreOutlined,
  VideoCameraOutlined,
  PlayCircleOutlined,
  AudioOutlined,
  HistoryOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import SearchBar from "./Components/SearchBar";
import Country from "./Components/Country";
import LiveTV from "./Components/LiveTV";
import Radio from "./Components/Radio";
import Category from "./Components/Category";
import Movies from "./Components/Movies";
import TvShows from "./Components/TvShows";
import History from "./Components/History";
import Setting from "./Components/Settings";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const { Sider, Content } = Layout;

const App = () => {
  const [selectedKey, setSelectedKey] = useState("5");
  const [collapsed, setCollapsed] = useState(false);

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <SearchBar />;
      case "2":
        return <Country />;
      case "3":
        return <Category />;
      case "4":
        return <LiveTV />;
      case "5":
        return <Movies />;
      case "6":
        return <TvShows />;
      case "7":
        return <Radio />;
      case "8":
        return <History />;
      case "9":
        return <Setting />;
      default:
        return <div>Select an option</div>;
    }
  };

  const menuItemStyle = {
    background: "transparent",
  };

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Sider
          theme="dark"
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            paddingTop: "20vh",
            textAlign: "center",
          }}
        >
          <Button
            type="primary"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              marginBottom: 16,
              background: "none",
              borderBottom: "2px solid white",
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Menu
            theme="dark"
            mode="inline"
            className="menuItem"
            defaultSelectedKeys={["5"]}
            selectedKeys={[selectedKey]}
            onClick={(e) => setSelectedKey(e.key)}
          >
            <Menu.Item
              key="1"
              icon={
                <SearchOutlined
                  style={{
                    borderBottom: "2px solid white",
                  }}
                />
              }
              style={menuItemStyle}
            >
              Search
            </Menu.Item>
            <Menu.Item key="2" icon={<GlobalOutlined />} style={menuItemStyle}>
              Country
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={
                <AppstoreOutlined
                  style={{
                    borderBottom: "2px solid white",
                  }}
                />
              }
              style={menuItemStyle}
            >
              Category
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<VideoCameraOutlined />}
              style={menuItemStyle}
            >
              LiveTV
            </Menu.Item>
            <Menu.Item
              key="5"
              icon={
                <PlayCircleOutlined
                  style={{
                    borderBottom: "2px solid white",
                  }}
                />
              }
              style={menuItemStyle}
            >
              Movies
            </Menu.Item>
            <Menu.Item
              key="6"
              icon={<VideoCameraOutlined />}
              style={menuItemStyle}
            >
              TvShows
            </Menu.Item>
            <Menu.Item key="7" icon={<AudioOutlined />} style={menuItemStyle}>
              Radio
            </Menu.Item>
            <div className="historySettings" style={{ paddingTop: "10vh" }}>
              <Menu.Item key="8" icon={<HistoryOutlined />} style={menuItemStyle}>
                History
              </Menu.Item>
              <Menu.Item key="9" icon={<SettingOutlined />} style={menuItemStyle}>
                Setting
              </Menu.Item>
            </div>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            {renderContent()}
            <SpeedInsights />
            <Analytics />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
