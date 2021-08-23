import React from "react";
import { Nav } from "react-bootstrap";
import "./Menu.styles.scss";
import { withRouter } from "react-router";

const links = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Information Directory",
    link: "/information-directory",
  },
  {
    text: "Videos",
    link: "/videos"
  },
  {
    text: "User",
    link: "/user",
  },
  {
    text: "Chat",
    link: "/message",
  },
];

const Menu = ({ location }) => {
  return (
    <div className="menu">
      <Nav activeKey={location.pathname} as="ul" className="menu-ul">
        {links.map(({ text, link }, index) => {
          return (
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
          );
        })}
      </Nav>
    </div>
  );
};

export default withRouter(Menu);
