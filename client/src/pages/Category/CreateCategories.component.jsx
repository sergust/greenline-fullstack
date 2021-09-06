import React from "react";
import CreateCategory from "../../components/Category/CreateCategory.component";
import Header from "../../components/Header/Header.component";
import Footer from "../../components/Footer/Footer.component";
import { Row, Container } from "react-bootstrap";

function CreateCategories() {
  return (
    <Container fluid>
      <Header />
      <CreateCategory />
      <Row className="footer">
        <Footer />
      </Row>
    </Container>
  );
}

export default CreateCategories;
