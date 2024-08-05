import React, { useState, useEffect } from "react";
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
import { useMediaQuery } from 'react-responsive';
import { throttle } from "lodash";
import LazyLoadComponent from './Components/LazyLoadComponent';

// Utilisation du hook personnalisé pour l'IntersectionObserver
const useIntersectionObserver = (options) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      options
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isVisible];
};

const { Sider, Content } = Layout;

const App = () => {
  const [selectedKey, setSelectedKey] = useState("4");
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleResize = () => {
    setCollapsed(isMobile);
  };

  const throttledHandleResize = throttle(handleResize, 200);

  useEffect(() => {
    window.addEventListener("resize", throttledHandleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", throttledHandleResize);
    };
  }, [isMobile]);

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <SearchBar />;
      case "2":
        return <Country />;
      case "3":
        return <Category />;
      case "4":
        return (
          <LazyLoadComponent>
            <LiveTV />
          </LazyLoadComponent>
        );
      case "5":
        return (
          <LazyLoadComponent>
            <Movies />
          </LazyLoadComponent>
        );
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

  const menuItems = [
    {
      key: "1",
      icon: <SearchOutlined />,
      label: "Search",
      style: menuItemStyle,
    },
    {
      key: "4",
      icon: <VideoCameraOutlined />,
      label: "LiveTV",
      style: menuItemStyle,
    },
    {
      key: "5",
      icon: <PlayCircleOutlined />,
      label: "Movies",
      style: menuItemStyle,
    },
    {
      key: "7",
      icon: <AudioOutlined />,
      label: "Radio",
      style: menuItemStyle,
    },
    {
      key: "8",
      icon: <HistoryOutlined />,
      label: "History",
      style: { ...menuItemStyle, paddingTop: "10vh" },
    },
    {
      key: "9",
      icon: <SettingOutlined />,
      label: "Setting",
      style: menuItemStyle,
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        theme="dark"
        width={200}
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        className={isMobile ? "hide-sider" : ""}
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
          defaultSelectedKeys={["5"]}
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
          items={menuItems}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {renderContent()}
          <SpeedInsights />
          <Analytics />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
