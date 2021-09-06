import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer.component";
import Header from "../../components/Header/Header.component";
import ProductsSidebar from "../../components/Products/ProductsSidebar.component";
import ShowAllProducts from "../../components/Products/ShowAllProducts.component";
import {listProducts} from "../../redux/actions/productAction";

function ShowProducts() {
  const dispatch = useDispatch();
  const {userInfo: {token}} = useSelector(state => state.auth);
  const {productList} = useSelector(state => state)

  useEffect(() => {
    dispatch(listProducts(token));
  }, [dispatch, token])

  return (
    <Container fluid>
      <Header />
      <Row style={{ margin: "20px" }}>
        <Col lg={3}>
          <ProductsSidebar />
        </Col>
        <Col lg={9}>
          <h6 className="text-center px-4 py-2" style={{lineHeight: "1.5"}}>
            A powerful range of scale removing products eliminating both visible
            and hidden
            <br /> residue, scum and deposits.
          </h6>
          <Row>
            {productList?.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ShowAllProducts product={product} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Row className="footer">
        <Footer />
      </Row>
    </Container>
  );
}

export default ShowProducts;
