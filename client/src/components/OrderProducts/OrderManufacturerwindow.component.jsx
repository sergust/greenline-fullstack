import React, {useState} from 'react'
import Header from "../Header/Header.component";
import Footer from "../Footer/Footer.component";
import { Row, Col, Button } from "react-bootstrap";
import "./OrderProducts.styles.scss";
import Products from "../Products/Products.component";
import User from '../User/User.component';


function OrderManufacturerwindow() {

    return (
        <div>
      <Header />
      <div style={{ margin: 25, alignItems: 'center' }}>
        <Row>
          <h4>Reorder Products</h4>
        </Row>
        <Col className="orderContainer">
          <Row>
            <Col lg="2" style = {{marginTop: 20}}>
            <User />
            <User />
            <User />
            <User />
            <User />
            </Col>
            <Col lg="10" className="column2">
              <Row className="containerTitle">
                <Col lg='10' md='10' sm='10'>
                </Col>
                <Col lg = '2' md='2' sm='2' className = 'float-left'>
                  <Button className="btn">Confirm Order</Button>
                </Col>
                <Col lg = '2' md='2' sm='2' className = 'float-left'>
                  {/* <Button className="btn" >Confirm Order</Button>
                  <CreatePostModal show = {visible} hide = {() => setVisible(false)} /> */}
                </Col>
              </Row>
              <Row className="title">
                  <Col lg='1'></Col>
                  <Col lg='3'>Product</Col>
                  <Col lg='4'>Description</Col>
                  <Col lg='2'>In Stock</Col>
                  <Col lg='2'>Reorder Quantity</Col>
              </Row>
              
              <Products />
              <Products />
              <Products />
              <Products />
              <Products />
              <Products />
              <Products />
              <Products />
              <Products />
              
            </Col>
          </Row>
        </Col>
      </div>
      <Row className="footer">
        <Footer />
      </Row>
    </div>
    )
}

export default OrderManufacturerwindow
