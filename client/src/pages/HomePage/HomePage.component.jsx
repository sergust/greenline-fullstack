import React from "react";
import "./HomePage.styles.scss";
import { Container, Row } from "react-bootstrap";
import Feed from "../Feed/Feed.component";
import Footer from "../../components/Footer/Footer.component";

const HomePage = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Feed />
        </Row>
        <Row className="footer">
          <Footer />
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
