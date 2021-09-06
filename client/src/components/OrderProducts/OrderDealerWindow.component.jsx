import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header.component";
import Footer from "../Footer/Footer.component";
import { Row, Col, Button } from "react-bootstrap";
import "./OrderProducts.styles.scss";
import Products from "../Products/Products.component";
import { getOrders } from "../../redux/actions/orderAction";

function OrderDealerWindow() {
  const { loading, orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div style={{ margin: 25 }}>
        <Row>
          <h4>Reorder Products</h4>
        </Row>
        <Col className="orderContainer">
          <Row>
            <Col lg="2">
              <Row>
                {orders.map((order) => {
                  return <p>{order.createdAt}</p>;
                })}
              </Row>
            </Col>
            <Col lg="10" className="column2">
              <Row className="containerTitle">
                <Col lg="11" md="10" sm="10">
                  <Button className="btn float-left">Remove Selected</Button>
                </Col>
                <Col lg="1" md="2" sm="2">
                  <Button className="btn float-left">Order</Button>
                </Col>
              </Row>
              <Row className="title">
                <Col lg="1"></Col>
                <Col lg="3">Product</Col>
                <Col lg="4">Description</Col>
                <Col lg="2">Reorder Quantity</Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </div>
      <Row className="footer">
        <Footer />
      </Row>
    </div>
  );
}

export default OrderDealerWindow;
