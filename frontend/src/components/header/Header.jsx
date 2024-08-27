import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Header = () => {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} to="/">Majstor.ba</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Pocetna</Nav.Link>
            <Nav.Link as={Link} to="/usluge">Usluge</Nav.Link>
            <Nav.Link as={Link} to="/login">Objavi oglas</Nav.Link>
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