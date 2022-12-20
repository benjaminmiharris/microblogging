import { NavLink } from "react-router-dom";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../style/nav-bar.css";
import { UsernameContext } from "../context/UsernameContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import Button from "react-bootstrap/Button";

const Navbarstrip = () => {
  const { isAuth, setIsAuth } = useContext(UsernameContext);

  const signUserOut = () => {
    signOut(auth).then(() => {
      setIsAuth(false);
    });
  };

  console.log(isAuth);
  return (
    <Navbar className="nav-bar-container" variant="light">
      <Container md="8">
        <Nav className="me-auto">
          {isAuth && (
            <>
              <NavLink to="/">
                <li>Home</li>
              </NavLink>
              <NavLink to="/profile">
                <li>Profile</li>
              </NavLink>
            </>
          )}
          <NavLink to="/login">
            {!isAuth ? (
              <li className="login-button">Login </li>
            ) : (
              <Button className="logout-button" onClick={signUserOut}>
                Sign-out
              </Button>
            )}
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navbarstrip;
