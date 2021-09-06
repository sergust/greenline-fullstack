import React from "react";
import { Container, Row } from "react-bootstrap";
import Footer from "../../components/Footer/Footer.component";
import Header from "../../components/Header/Header.component";
import CreateProduct from "../../components/Products/CreateProduct.component";

function CreateProducts() {
  return (
    <Container fluid>
      <Header />
      <Row>
        <CreateProduct />
      </Row>
      <Row className="footer">
        <Footer />
      </Row>
    </Container>
  );
}

export default CreateProducts;
