import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header.component";
import NotFound from "../../components/NotFound/NotFound.component";

const NotFoundPage = () => {
  return (
    <div>
      <Container fluid>
        <Header />
        <Row>
          <NotFound />
        </Row>
      </Container>
    </div>
  );
};

export default NotFoundPage;
