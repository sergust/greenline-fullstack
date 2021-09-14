import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import "./Menu.styles.scss";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";

const links = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Videos",
    link: "/videos",
  },
  {
    text: "Chat",
    link: "/message",
  },
  {
    text: "Information Directory",
    link: "/products",
  },
  {
    text: "Change Password",
    link: "/change/password",
  },
  {
    text: "Reordering",
    link: "/dealer",
  },
  {
    text: "Orders",
    link: "/admin/orders",
  },
];

const Menu = ({ location }) => {
  const {
    userInfo: { role },
  } = useSelector((state) => state.auth);

  return (
    <div className="menu">
      <Nav activeKey={location.pathname} as="ul" className="menu-ul">
        {links.map(({ text, link }, index) => {
          return role !== "superAdmin" ? (
            <Nav.Link
              as="a"
              to={link}
              key={`menu-${index}`}
              href={link}
              style={{
                fontWeight: location.pathname === link && "600",
              }}
            >
              {text}
            </Nav.Link>
          ) : text !== "Information Directory" ? (
            <Nav.Link
              as="a"
              to={link}
              key={`menu-${index}`}
              href={link}
              style={{
                fontWeight: location.pathname === link && "600",
              }}
            >
              {text}
            </Nav.Link>
          ) : (
            <NavDropdown
              title="Information Directory"
              id="basic-nav-dropdown"
              key={`menu-${index}`}
            >
              <NavDropdown.Item
                className="dropdown-item"
                href="/admin/productlist"
              >
                <p style={{ color: "#000000" }}>Products</p>
              </NavDropdown.Item>
              <NavDropdown.Item
                className="dropdown-item"
                href="/admin/categorylist"
              >
                <p style={{ color: "#000000" }}>Category</p>
              </NavDropdown.Item>
            </NavDropdown>
          );
        })}
      </Nav>
    </div>
  );
};

export default withRouter(Menu);
