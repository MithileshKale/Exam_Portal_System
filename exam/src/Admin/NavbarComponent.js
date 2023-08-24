import React, { useContext } from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import setmode from '../Student/context/contexts'

export default function NavbarComponent() {
  const navigate = useNavigate()
  const theme = useContext(setmode)
  function redirect() {
    navigate("/")
  }
  return (
    <>
      <Navbar bg={theme.mode} expand="lg" variant={theme.mode}>
        <Navbar.Brand className='ms-2'><Link to="" className='text-decoration-none text-dark'>Exam Portal-admin</Link></Navbar.Brand>
        <Navbar id="basic-navbar-nav" className='ms-auto m-0 p-0'>
          <Nav>
            <Nav.Item >
              <Nav.Link className='m-0 p-0'><span onClick={theme.changeMode}>{theme.icon}</span></Nav.Link>
            </Nav.Item>
            <Nav.Item className="my-auto me-2">
              <Button variant='outline-danger' onClick={() => redirect()}>Log Out</Button>
            </Nav.Item>
          </Nav>
        </Navbar>
      </Navbar>
    </>
  )
}
