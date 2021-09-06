import "./AuthWrapper.styles.scss";
import {Card, Row, Col} from 'react-bootstrap'
import Logo from '../../assets/logo.png'

const AuthWrapper = ({ children, title }) => {
  return (
    <Row className="mx-0" id="login-form">
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Card className="align-items-center">
          <Card.Img top="true" width='100%' src={Logo} alt="Card Image cap" />
          <Card.Body>
            {children}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AuthWrapper;
