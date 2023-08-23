import React from 'react'
import { Button, Form, FormControl, Nav, Navbar, Image, } from 'react-bootstrap'
import logo from '../logo.svg';


const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" className='justify-content-between'>
            <Navbar.Brand href="/">
                Logo
            </Navbar.Brand>

            <Nav >
                <Button variant="outline-info me-4">EUR-USD Details</Button>
                <Button variant="outline-info me-2">EUR-GBP Details</Button>
            </Nav>
        </Navbar>
    )
}

export default Header
