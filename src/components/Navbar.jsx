import {
  HomeOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Typography } from "antd";
import { Link, NavLink } from "react-router-dom";

import icon from "../images/cryptocurrency.png";
import { useState } from "react";
import { useEffect } from "react";

const menuLinks = [
  {
    label: "Home",
    url: "/",
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: "Exchanges",
    url: "/exchanges",
    key: "exchanges",
    icon: <MoneyCollectOutlined />,
  },
  {
    label: "Cryptocurrencies",
    url: "/cryptocurrencies",
    key: "cryptocurrencies",
    icon: <FundOutlined />,
  },
  {
    label: "News",
    url: "/news",
    key: "news",
    icon: <BulbOutlined />,
  },
];

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handlResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handlResize);

    handlResize();

    return () => window.removeEventListener("resize", handlResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" style={{ marginTop: "-10px" }} />
        <Typography.Title level={2} className="logo">
          <Link to="/" className="logo">
            Cryptoverse
          </Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <div className="nav-menu">
          {menuLinks.map((link) => (
            <NavLink end to={link.url} key={link.key}>
              {link.icon} {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
