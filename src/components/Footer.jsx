import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Footer() {
  return (
    <footer className="positon-fixed fixed-bottom bg-dark text-white mt-4">
      <Container>
        <Row>
          <Col className="text-center py-3">
            <NavLink to="/brand" className="text-white text-decoration-none">
              Brand
            </NavLink>
          </Col>
          <Col className="text-center py-3">
            <NavLink to="/about" className="text-white text-decoration-none">
              About
            </NavLink>
          </Col>
          <Col className="text-center py-3">
            <NavLink
              to="/contactus"
              className="text-white text-decoration-none"
            >
              Contact Us
            </NavLink>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
