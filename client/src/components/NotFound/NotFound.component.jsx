import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import NotFoundSVG from "../../assets/page_not_found.svg";

const NotFound = () => {
  return (
    <Container>
      <Row className="pt-4 mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Page Not Found</h1>
          <img src={NotFoundSVG} alt="not found" style={{ width: "400px"}} />
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
