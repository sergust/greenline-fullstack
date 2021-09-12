import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header.component";
import Footer from "../../components/Footer/Footer.component";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import { getOrders } from "../../redux/actions/orderAction";
import MaterialTable from "material-table";
import tableIcons from "../../utils/icons";
import moment from "moment";
import { listProducts } from "../../redux/actions/productAction";
import { API } from "../../backend";
import axios from "axios";

function Orders() {
  const { loading, orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const {
    userInfo: { token, userId },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(listProducts(token, true));
  }, [dispatch, token]);

  const [currentOrder, setCurrentOrder] = useState({});

  function selectOrder(index) {
    setCurrentOrder({ ...orders[index] });
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
                      <ListGroup.Item
                        action
                        key={index}
                        onClick={() => selectOrder(index)}
                      >
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
                    render: (rowData) => <>{rowData.product.name}</>,
                    editable: "never",
                  },
                  {
                    title: "Description",
                    field: "description",
                    render: (rowData) => <>{rowData.product.description}</>,
                    editable: "never",
                  },
                  { title: "Quantity", field: "quantity", type: "numeric" },
                ]}
                data={currentOrder.products || []}
                title="Order"
              />
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

export default Orders;
