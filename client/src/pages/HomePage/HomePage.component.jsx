import React from "react";
import { Container, Row } from "react-bootstrap";
import "./HomePage.styles.scss";
import Feed from "../Feed/Feed.component";
import Footer from "../../components/Footer/Footer.component";
import Header from "../../components/Header/Header.component";


const HomePage = () => {
  return (
      <Container fluid>
        <Header />
        <Row>
          <Feed />
        </Row>
        <Row className="footer">
          <Footer />
        </Row>
      </Container>
    
  );
};

export default HomePage;
