import React from "react";
import { Row, Col, InputGroup, Form } from "react-bootstrap";
import "./Products.styles.scss";

function Products() {
  return (
    <Row className="product">
      <Col lg="1">
        <input type="checkbox" className="check" />
      </Col>
      <Col lg="3">Kitchen Cleaner</Col>
      <Col lg="4">
        Greenline Bathroom and Shower Cleaner, is ready to use, 2-in-1
      </Col>
      <Col lg="2">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" value="10" />
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}

export default Products;
