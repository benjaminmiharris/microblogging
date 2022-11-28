import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../style/nav-bar.css";

import { NavLink } from "react-router-dom";

const Navbarstrip = () => {
  return (
    <Navbar className="nav-bar-container">
      <Container md="8">
        <Nav>
          <NavLink to="/home" activeClassName="current">
            <li>Home</li>
          </NavLink>
          <NavLink to="/profile" activeClassName="current">
            <li>Profile</li>
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navbarstrip;
