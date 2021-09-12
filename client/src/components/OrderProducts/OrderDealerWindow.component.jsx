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
import { listProducts } from "../../redux/actions/productAction";
import { API } from "../../backend";
import axios from "axios";

function OrderDealerWindow() {
  const { loading, orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const {
    userInfo: { token, userId },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(listProducts(token));
  }, [dispatch, token]);

  const products = useSelector((state) => state.productList.products);

  const [currentOrder, setCurrentOrder] = useState({});

  const [productsToAdd, setProductsToAdd] = useState([]);

  function selectOrder(index) {
    setCurrentOrder({ ...orders[index] });
  }

  function addProduct() {
    const productsToAddWithQuantity = productsToAdd.map((product) => {
      return {
        product: { ...product },
        quantity: 1,
      };
    });
    setCurrentOrder({
      ...currentOrder,
      products: [
        ...(currentOrder.products || []),
        ...productsToAddWithQuantity,
      ],
    });
  }

  async function placeOrder() {
    const copyProductOrder = { ...currentOrder };

    copyProductOrder.products.forEach((product) => product._id);

    try {
      const URL = `${API}/order`;

      const config = {
        headers: {
          "X-Auth-Token": `${token}`,
        },
      };

      await axios.post(URL, currentOrder, config);

      dispatch(listProducts(token));
    } catch (e) {
      console.error(e);
    }
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
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const orderUpdate = { ...currentOrder };
                        const index = oldData.tableData.id;
                        orderUpdate.products[index] = newData;
                        setCurrentOrder({ ...orderUpdate });
                        resolve();
                      }, 0);
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const orderUpdate = { ...currentOrder };
                        const index = oldData.tableData.id;
                        orderUpdate.products.splice(index, 1);
                        setCurrentOrder({ ...orderUpdate });
                        resolve();
                      }, 0);
                    }),
                }}
              />
              <Row className="mt-4 mb-4 justify-content-between">
                <Button className="btn float-left" onClick={addProduct}>
                  Add product
                </Button>

                <Button className="btn float-left" onClick={placeOrder}>
                  Place order
                </Button>
              </Row>
              <MaterialTable
                icons={tableIcons}
                columns={[
                  {
                    title: "Product name",
                    field: "name",
                    render: (rowData) => <>{rowData.name || ""}</>,
                  },
                  {
                    title: "Product ID",
                    field: "_id",
                    render: (rowData) => <>{rowData._id || ""}</>,
                  },
                ]}
                data={products || []}
                title="Add products to the order"
                options={{ selection: true }}
                onSelectionChange={(rows) => setProductsToAdd([...rows])}
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

export default OrderDealerWindow;
