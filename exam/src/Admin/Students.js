import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Button, Col, Form, FormGroup, Modal, Row, Table } from 'react-bootstrap'
import setmode from '../Student/context/contexts'

export default function Students() {
  const theme=useContext(setmode)
  // state hooks for store data 
  const [studentInfo, setStudentInfo] = useState([])

  // call function when page is loded 
  useEffect(() => {
    getStudentInfo()
  }, [])


  // to get all student through api 
  function getStudentInfo() {
    axios({
      url: 'http://localhost:9090/api/student',
      method: 'get',
      contentType: 'application/JSON'
    }).then((resp) => (
      setStudentInfo(resp.data)
    ))
  }
  
  // to handle modal 
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  // Submit Button disabled 
  const [disabled, setDisabled] = useState(false)

  // add Student to database 
  const firstname = useRef()
  const middlename = useRef()
  const lastname = useRef()
  const degree = useRef()
  const special = useRef()
  const mobile = useRef()
  const email = useRef()
  const city = useRef()
  function addStudent() {
    setDisabled(true)
    var obj = {
      "student_name": firstname.current.value + " " + middlename.current.value + " " + lastname.current.value,
      "qualification": degree.current.value + "(" + special.current.value + ")",
      "mobile": mobile.current.value,
      "email": email.current.value,
      "city": city.current.value
    }
    axios({
      url: 'http://localhost:9090/api/student',
      method: 'post',
      data: obj,
      contentType: 'application/JSON'
    }).then((resp) => {
      alert(resp.data)
      handleClose()
      setDisabled(false)
      getStudentInfo()
  })
  }


  // To delete student from database 
  function dropStudent(id) {
  axios({
    url:'http://localhost:9090/api/student/'+id,
    method:'delete',
    contentType:'application/JSON'
  }).then((resp)=>{
    alert(resp.data)
    getStudentInfo()
  })
}

  return (
    <>
      {/* modal to add student  */}
      <div className='my-1'>
        <div>
          <Button variant='primary' onClick={handleShow}>Add Student</Button>
        </div>
        <div>
          <Modal variant='dark' show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <h1>Add Student</h1>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col>
                    <FormGroup>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type='text' placeholder='First Name' ref={firstname}></Form.Control>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Form.Label>Middle Name</Form.Label>
                      <Form.Control type='text' placeholder='Middle Name' ref={middlename}></Form.Control>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type='text' placeholder='Last Name' ref={lastname}></Form.Control>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Form.Label>Degree</Form.Label>
                      <Form.Control type='text' placeholder='Enter Degree Name' ref={degree}></Form.Control>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Form.Label>Specialization</Form.Label>
                      <Form.Control type='text' placeholder='Enter Specialization' ref={special}></Form.Control>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control type='number' placeholder='Enter Mobile Number' ref={mobile}></Form.Control>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control type='text' placeholder='Enter Email Address' ref={email}></Form.Control>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Form.Label>City</Form.Label>
                  <Form.Control type='text' placeholder='Enter City Name' ref={city}></Form.Control>
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='outline-danger' onClick={handleClose}>Close</Button>
              <Button variant='outline-success' onClick={() => addStudent()} disabled={disabled}>Add</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>

      {/* table for display all students  */}
      <div>
        <Table bordered variant={theme.mode}>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Student Name</th>
              <th>Qualification</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {studentInfo.map((d, k) => (
              <tr key={k}>
                <td>{k + 1}</td>
                <td>{d.student_name}</td>
                <td>{d.qualification}</td>
                <td>{d.mobile}</td>
                <td>{d.email}</td>
                <td>{d.city}</td>
                <td><Button variant='outline-danger' size='sm' onClick={() => dropStudent(d.student_id)}>Drop</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}
