import React, { useContext } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import setmode from '../Student/context/contexts'
import './AdminComponent.css'

import NavbarComponent from './NavbarComponent'

export default function AdminComponenet() {
    const theme=useContext(setmode)
    return (
        <>
            <div>
                <NavbarComponent />
            </div>
            <Row>
                <Col sm={3}>
                    <div className={theme.mode === 'dark' ? 'p-3 text-bg-dark mt-1 rounded border border-light' : 'p-3 bg-light bg-gradient mt-1 rounded border border-danger'} >
                        <p className='h4'>Student Section</p>
                        <ListGroup >
                            <Link to='' className='text-decoration-none rounded-top '><ListGroup.Item className='change'>Dashboard</ListGroup.Item></Link>
                            <Link to='students' className='text-decoration-none'><ListGroup.Item className='change'>Students</ListGroup.Item></Link>
                            <Link to='exams' className='text-decoration-none rounded-bottom'><ListGroup.Item className='change'>Exams</ListGroup.Item></Link>
                        </ListGroup>
                    </div>
                    <div className={theme.mode === 'dark' ? 'p-3 text-bg-dark mt-1 rounded border border-light' : 'p-3 bg-light bg-gradient mt-1 rounded border border-primary'}>
                        <p className='h4'>Admin Section</p>
                        <ListGroup >
                            <Link to='topics' className='text-decoration-none rounded-top '><ListGroup.Item className='change'>Topics</ListGroup.Item></Link>
                            <Link to='contents' className='text-decoration-none'><ListGroup.Item className='change'>Contents</ListGroup.Item></Link>
                            <Link to='content-questions' className='text-decoration-none'><ListGroup.Item className='change'>Content Questions</ListGroup.Item></Link>
                            <Link to='questions-level' className='text-decoration-none'><ListGroup.Item className='change'>Questions Level</ListGroup.Item></Link>
                            <Link to='role' className='text-decoration-none rounded-bottom'><ListGroup.Item className='change'>Role</ListGroup.Item></Link>
                        </ListGroup>
                    </div>
                </Col>
                <Col sm={9}>
                    <Outlet />
                </Col>
            </Row>
        </>

    )
}
