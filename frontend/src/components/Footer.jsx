import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footing">
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; KaraKum</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
