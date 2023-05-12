import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const StoreHeader = () => {
    const storeDetails = useSelector(state => state.storeDetails)
    const { error, loading, store } = storeDetails
    console.log(store)

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to={`/stores/${store.id}`}>
          <Navbar.Brand>Home</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to={`/stores/${store.id}/contact`}>
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>

            <LinkContainer to={`/stores/${store.id}/blog`}>
              <Nav.Link>Blog</Nav.Link>
            </LinkContainer>
          </Nav>

       
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default StoreHeader;
