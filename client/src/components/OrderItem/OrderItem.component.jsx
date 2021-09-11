import React from "react";
import moment from "moment";
import { ListGroup } from "react-bootstrap";

function OrderItem({ orderCreated }) {
  return (
    <ListGroup.Item action>
      {moment(orderCreated).format("MMMM Do YY") || "no date"}
    </ListGroup.Item>
  );
}

export default OrderItem;
