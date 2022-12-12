import { NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../style/nav-bar.css";

const Navbarstrip = () => {
  return (
    <Navbar className="nav-bar-container" variant="light">
      <Container md="8">
        <Nav className="me-auto">
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          <NavLink to="/profile">
            <li>Profile</li>
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navbarstrip;
