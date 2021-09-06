import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function ShowAllProducts({ product }) {
  return (
    <Card className="my-3 p-3" style={{ border: "none" }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={`${product.image}`} />
      </Link>
      <Card.Body className="px-0 text-center">
        <Link to={`/product/${product._id}`} className="product-title">
          <Card.Title as="div" className="text-dark">{product.name}</Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default ShowAllProducts;
