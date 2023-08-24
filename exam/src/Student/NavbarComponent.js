import React, { useContext, useEffect } from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import setmode from './context/contexts'

export default function NavbarComponent() {
  const navigate = useNavigate()
  const cont = useContext(setmode)
  useEffect(() => {
    if (localStorage.getItem("student_id") === null) {
      navigate("/")
    }
  }, [navigate])

  function reditect() {
    localStorage.removeItem("student_id")
    navigate("/")
  }
  
  return (
    <div>
      <Navbar expand='lg' variant={cont.mode} className='p-2' bg={cont.mode}>
        <Navbar.Brand className='display-1'>Exam Portal</Navbar.Brand>
        <Navbar className='ms-auto'>
          <Nav >
            <Nav.Item>
              <Nav.Link className='m-0 p-0'><span onClick={cont.changeMode}>{cont.icon}</span></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Button onClick={() => reditect()} variant='outline-danger'>Logout</Button>
            </Nav.Item>
          </Nav>
        </Navbar>
      </Navbar>
    </div>
  )
}
