import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Form, FormGroup, Modal, Table } from 'react-bootstrap'
import setmode from '../Student/context/contexts'
import './Topic.css'

export default function Topic() {
  const theme= useContext(setmode)
  const [topicdata, setTopicdata] = useState([])
  const [topic, setTopic] = useState('')
  const [show, setShow] = useState(false);

  // to hide and show add and update buttons 
  const [isHidden, setIsHidden] = useState(false)

  const txttopic = useRef()

  // to add topic in database
  function addTopic() {
    var obj = { 'topic_name': txttopic.current.value };
    axios({
      url: 'http://localhost:9090/api/topic',
      method: 'post',
      data: obj,
      contentType: 'application/JSON'
    }).then((resp) => {
      alert(resp.data)
      handleClose()
      fetchData()
  })
  }
 
  // To handel model close and open 
  const handleClose = () => {
    setShow(false)
    setIsHidden(false)
  };
  const handleShow = () => setShow(true);

  // to call function on page load
  useEffect(() => {
    fetchData();
  }, [])

  // To get all topics from api 
  function fetchData(){
    axios({
      url: 'http://localhost:9090/api/topic',
      method: 'get',
      contentType: 'application/JSON'
    }).then((resp) => (
      setTopicdata(resp.data)
    ))
  }

  // to delete topic 
  function deleteTopic(id) {
    axios({
      url:'http://localhost:9090/api/topic/'+id,
      method:'delete',
      contentType:'application/JSON'
    }).then((resp)=>{
      alert(resp.data)
      fetchData()
  })
  }

  // To update topic 
  function updateTopic() {
    
  }

  // to view topic in mpdal 
  function viewTopic(obj) {
    setTopic(obj.topic_name)
    handleShow()
    setIsHidden(true)
  }
  return (
    <>
      <div className='my-1'>
        <Button variant='primary' onClick={() => handleShow()}>New Topic</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Topic</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <Form.Label >Topic Name</Form.Label>
                <Form.Control type='text' placeholder='Topic name' ref={txttopic} defaultValue={topic} />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='outline-danger' onClick={handleClose}>close</Button>
            <Button variant='outline-primary' onClick={() => addTopic()} hidden={isHidden}>Add</Button>
            <Button variant='outline-primary' onClick={() => updateTopic()} hidden={!isHidden}>Update</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Table bordered variant={theme.mode}>
        <thead>
          <tr>
            <th>Sr no</th>
            <th>Topic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {topicdata.map((d, k) => (
            <tr key={k}>
              <td>{k + 1}</td>
              <td>{d.topic_name}</td>
              <td>
              <Button variant='outline-info'size='sm' onClick={()=>viewTopic(d)}>View</Button>
              &nbsp;
              <Button variant='outline-danger'size='sm' onClick={()=>deleteTopic(d.topic_id)}>Delete</Button>
              &nbsp;
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
