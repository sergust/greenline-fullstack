import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header.component";
import Footer from "../Footer/Footer.component";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import "./OrderProducts.styles.scss";
import Products from "../Products/Products.component";
import { getOrders } from "../../redux/actions/orderAction";
import MaterialTable from "material-table";
import tableIcons from "../../utils/icons";
import OrderItem from "../OrderItem/OrderItem.component";
import moment from "moment";

function OrderDealerWindow() {
  const { loading, orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const [currentOrder, setCurrentOrder] = useState({});

  function selectOrder(index) {
    setCurrentOrder(orders[index]);
  }

  return (
    <div>
      <Header />
      <div className="m-4">
        <Row>
          <h4>Reorder Products</h4>
        </Row>
        <Col>
          <Row>
            <Col lg="2">
              <Row>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <ListGroup>
                    {orders.map((order, index) => (
                      <ListGroup.Item action onClick={() => selectOrder(index)}>
                        {moment(order.createdAt).format("MMMM Do YY") ||
                          "no date"}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Row>
            </Col>
            <Col lg="10">
              <MaterialTable
                icons={tableIcons}
                columns={[
                  {
                    title: "Product",
                    field: "name",
                    render: (rowData) => <span>{rowData.product.name}</span>,
                  },
                  {
                    title: "Description",
                    field: "description",
                    render: (rowData) => (
                      <span>{rowData.product.description}</span>
                    ),
                  },
                  { title: "Quantity", field: "quantity", type: "numeric" },
                ]}
                data={currentOrder.products || []}
                title="Previous Order"
              />
              <Row className="mt-4">
                <Col lg="11" md="10" sm="10">
                  <Button className="btn float-left">Remove Selected</Button>
                </Col>
                <Col lg="1" md="2" sm="2">
                  <Button className="btn float-left">Order</Button>
                </Col>
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
