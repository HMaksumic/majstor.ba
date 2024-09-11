import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import './Header.css';

const SimpleHeader = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
    <div className='headercontainer'>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} to="/">Majstor.ba</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Pocetna</Nav.Link>
            <Nav.Link as={Link} to="/usluge">Usluge</Nav.Link>
            <Nav.Link as={Link} to={user ? "/objavi-oglas" : "/login"}>
              Objavi oglas
            </Nav.Link>
            {user && (
              <>
                <Nav.Link as={Link} to="/profile">
                  Moja stranica
                </Nav.Link>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Odjava
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      </div>
    </>
  );
}

export default SimpleHeader;