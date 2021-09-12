import React from "react";
import { Row, Container } from "react-bootstrap";
import ListProducts from "../../components/Products/ListProducts.component";
import products from "../../utils/product";
import Header from "../../components/Header/Header.component";
import Footer from "../../components/Footer/Footer.component";

function Productslist() {
  return (
    <Container fluid>
      <Header />
      <ListProducts products={products} />
      <Row className="footer">
        <Footer />
      </Row>
    </Container>
  );
}

export default Productslist;
