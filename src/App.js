import React, { useState, useEffect, useRef } from "react";
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
import { FixedSizeList as List } from "react-window";
import { throttle } from "lodash";

const { Sider, Content } = Layout;

const LazyLoadComponent = ({ children }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return <div ref={ref}>{isVisible ? children : null}</div>;
};

const App = () => {
  const [selectedKey, setSelectedKey] = useState("5");
  const [collapsed, setCollapsed] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  const throttledHandleResize = throttle(handleResize, 200);

  useEffect(() => {
    window.addEventListener("resize", throttledHandleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", throttledHandleResize);
    };
  }, []);

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
        ); // Assure-toi de passer les données de films ici
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
      icon: <SearchOutlined style={{ borderBottom: "2px solid white" }} />,
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
      icon: <PlayCircleOutlined style={{ borderBottom: "2px solid white" }} />,
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
    <>
      <Layout style={{ height: "100vh" }}>
        <Sider
          theme="dark"
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          className={window.innerWidth <= 768 ? "hide-sider" : ""}
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
            items={menuItems} // Utilisez items ici
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
    </>
  );
};

export default App;
