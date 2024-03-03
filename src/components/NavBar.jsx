import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";
import { tokenContext } from "../context/tokenContext";

function NavBar() {
  let { token, setToken } = useContext(tokenContext);
  console.log(token);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Hello World</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto"></Nav>
          <Nav>
            <NavLink to="/home" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/product" className="nav-link">
              Products
            </NavLink>

            {token ? (
              <>
                <NavLink to="/settings" className="nav-link">
                  Settings
                </NavLink>
                <NavLink to="/cart" className="nav-link">
                  Cart
                </NavLink>
                <NavLink to="/order" className="nav-link">
                  Order History
                </NavLink>
                <NavLink to="/home" className="nav-link" onClick={logout}>
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/auth/signup" className="nav-link">
                  Signup
                </NavLink>
                <NavLink to="/auth/login" className="nav-link">
                  Login
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
