import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Col, Row} from 'react-bootstrap'

export default function ProfileComponent() {
    const [student, setStudent] = useState([])
    useEffect(() => {
        getstudent()
        console.log("hello")
    }, [])
    const getstudent = () => {
        let id = localStorage.getItem("student_id")
        console.log(id)
        axios({
            url: 'http://localhost:9090/api/student/' + id,
            method: 'get',
            contentType: 'application/JSON'
        }).then(resp => {
            setStudent(resp.data)
        })
        console.log("...")
    }

    return (
        <div>
            <Card >
                <Card.Header bg='primary' border='danger'>
                    <Card.Title>Student Profile</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row className='mb-1'>
                        <Col>
                            <Card.Text  >Student Id: <span>{student.student_id}</span></Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>Name: <span>{student.student_name}</span></Card.Text>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col>
                            <Card.Text>Email Address:  <span>{student.email}</span></Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>Mobile Number: <span>{student.mobile}</span></Card.Text>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col>
                            <Card.Text>Local Address: <span>{student.city}</span></Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>Birth date:<span>-</span></Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            
        </div>
    )
}
