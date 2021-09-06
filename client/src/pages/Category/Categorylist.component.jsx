import React from "react";
import { Container, Row } from "react-bootstrap";
import ListCategory from "../../components/Category/ListCategory.component";
import Header from "../../components/Header/Header.component";
import Footer from "../../components/Footer/Footer.component";

function Categorylist() {
  return (
    <Container fluid>
      <Header />
      <ListCategory />
      <Row className="footer">
        <Footer />
      </Row>
    </Container>
  );
}

export default Categorylist;
