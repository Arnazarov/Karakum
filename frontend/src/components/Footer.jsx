import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3 text-dark">
            Copyright &copy; KaraKum
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
