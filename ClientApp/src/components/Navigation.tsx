import React, { ReactChild } from 'react';
import {
    Navbar,
    Nav,
    Container
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const Navigation = ({children}: any) => {
    return <>
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-3 px-3">
            <Navbar.Brand href="#home">React .NET</Navbar.Brand>
                <Nav className="me-auto">
                <LinkContainer to="/"><Nav.Link>Gestion des utilisateurs</Nav.Link></LinkContainer>
                </Nav>
        </Navbar>
        <Container>
            {children}
        </Container>
    </>
}