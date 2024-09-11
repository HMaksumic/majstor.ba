import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Nav , Navbar, Container, Form, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
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
      <Navbar bg="light" className="justify-content-center">
        <Container>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Pretraga"
              className="me-2"
              aria-label="Pretraga"
            />
            <Button variant="outline-secondary" className="me-2">Trazi</Button>
            <DropdownButton id="dropdown-basic-button" title="Lokacija" variant="outline-secondary">
              <Dropdown.Item href="#/action-1">Sarajevo</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Mostar</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Banja Luka</Dropdown.Item>
            </DropdownButton>
          </Form>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;