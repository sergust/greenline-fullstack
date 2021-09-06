import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { RiDeleteBin6Fill } from "react-icons/ri";
import "./Products.styles.scss";
import { listProducts, deleteProduct } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";

function ListProducts() {
  const dispatch = useDispatch();
  const {
    userInfo: { token },
  } = useSelector((state) => state.auth);
  const { productList, productDelete } = useSelector((state) => state);
  const { success: successDelete } = productDelete;

  useEffect(() => {
    dispatch(listProducts(token));
  }, [dispatch, token, successDelete]);

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) {
      return;
    }
    dispatch(deleteProduct(productId));
  };

  return (
    <>
      <Row className="align-items-center" style={{ margin: "40px" }}>
        <Col>
          <h3>Products</h3>
        </Col>
        <Col className="text-right">
          <Link to="/admin/product/create">
            <Button className="my-3">
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </Link>
        </Col>
      </Row>
      <div style={{ margin: "40px", marginTop: "-40px" }}>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr style={{ padding: 20 }}>
              <th>ID</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productList?.products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.category.name}</td>
                <td>
                  <button
                    className="dlt-btn"
                    onClick={() => handleDelete(product._id)}
                  >
                    <RiDeleteBin6Fill color="#c21808" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ListProducts;
