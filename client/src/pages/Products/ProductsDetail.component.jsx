import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer.component";
import Header from "../../components/Header/Header.component";
import "./Products.styles.scss";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegFilePdf } from "react-icons/fa";
import { listProductDetails } from "../../redux/actions/productAction";
import Loading from "../../components/Loading/Loader.component";

function ProductsDetail({ match }) {
  const dispatch = useDispatch();
  const {
    userInfo: { token },
  } = useSelector((state) => state.auth);
  const { product, loading } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(listProductDetails(match.params.id, token));
  }, [dispatch, token, match.params.id]);

  return (
    <Container fluid>
      <Header />
      <div style={{ marginTop: "20px", marginBottom: "30px" }}>
        <Link to="/products" style={{ textDecoration: "none" }}>
          <span className="goBack">
            <IoIosArrowBack />
          </span>
          <span className="goBack">Products</span>
        </Link>
      </div>
      {loading ? (
        <Loading padding="100px" />
      ) : (
        <Row
          style={{ margin: "20px", paddingLeft: "30px", paddingRight: "30px" }}
        >
          <Col md={4}>
            <Image
              src={product?.image}
              alt={product?.name}
              width="400"
              height="400"
              fluid
            />
          </Col>
          <Col md={7}>
            <ListGroup>
              <ListGroup.Item style={{ border: "none" }}>
                <h3>{product?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item style={{ border: "none" }}>
                <p>{product?.description}</p>
              </ListGroup.Item>
              <ListGroup.Item style={{ border: "none" }}>
                <h5 className="font-weight-bold">Surfaces:</h5>
                <p>{product.additionalInfo?.surfaces}</p>
              </ListGroup.Item>
              <ListGroup.Item style={{ border: "none" }}>
                <h5 className="font-weight-bold">Directions:</h5>
                <p>{product.additionalInfo?.directions}</p>
              </ListGroup.Item>
              <ListGroup.Item style={{ border: "none" }}>
                <h5 className="font-weight-bold">Active Ingredients:</h5>
                <p>{product.additionalInfo?.activeIngredients}</p>
              </ListGroup.Item>
              <ListGroup.Item style={{ border: "none" }}>
                <h5 className="font-weight-bold">Cautions:</h5>
                <p>{product.additionalInfo?.cautions}</p>
              </ListGroup.Item>
              <ListGroup.Item style={{ border: "none" }}>
                <h5 className="font-weight-bold">Shelf Life:</h5>
                <p>{product.additionalInfo?.shelfLife}</p>
              </ListGroup.Item>
              <ListGroup.Item style={{ border: "none" }}>
                <h5 className="font-weight-bold">Documents/Certificates:</h5>
                {product.additionalDocuments?.map((doc, index) => (
                  <p style={{ fontSize: "13px" }} key={index + 1}>
                  <span>
                    <FaRegFilePdf size={12} className="mr-2" />
                  </span>
                  <a href={`${doc.url}`} style={{textDecoration: "none"}}>{doc.fileName}</a>
                </p>
                ))}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}

      <Row className="footer">
        <Footer />
      </Row>
    </Container>
  );
}

export default ProductsDetail;
