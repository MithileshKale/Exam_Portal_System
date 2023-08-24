import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import setmode from '../Student/context/contexts'

export default function Content() {
  const theme= useContext(setmode)

  // states to store data 
  const [contents, setContents] = useState([])
  const [topics, setTopics] = useState([])
  const [contentTopic, setContentTopic] = useState([])

  // to show and hide update and add button
  const [buttonhidden, setButtonhidden] = useState(false)

  // to hide and show modal 
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    setButtonhidden(false)
  }
  const handleShow = () => setShow(true)

  // useeffect to load dato on component rendered
  useEffect(() => {
    fetchData()
    getTopic()
  }, [])

  // to get all components in database 
  function fetchData() {
    axios({
      url: 'http://localhost:9090/api/contents',
      method: 'get',
      ContentType: 'application/JSON'
    }).then((resp) => {
      setContents(resp.data)
    })
  }

  // to get all topics in database 
  function getTopic() {
    axios({
      url: 'http://localhost:9090/api/topic',
      method: 'get',
      ContentType: 'application/JSON'
    }).then((resp) => {
      setTopics(resp.data)
    })
  }

  // to add contents to database 
  const topicid = useRef()
  const content = useRef()
  function addContent() {
    var obj = { "content_name": content.current.value, "topics": { "topic_id": Number(topicid.current.value) } }
    console.log(obj)
    axios({
      url: 'http://localhost:9090/api/content',
      method: 'post',
      data: obj,
      ContentType: 'application/JSON'
    }).then((resp) => {
      alert(resp.data)
      fetchData()
      handleClose()
    })
  }

  // To delete content 
  function deleteContent(id) {
    axios({
      url: 'http://localhost:9090/api/content/' + id,
      method: 'delete',
      ContentType: 'application/JSON'
    }).then((resp) => {
      alert(resp.data)
      fetchData()
    })
  }

  // to view content on modal 
  function viewContent(id) {
    axios({
      url: 'http://localhost:9090/api/topicwisecontent/' + id,
      method: 'get',
      contentType: 'application.JSON'
    }).then((resp) => {
      console.log(resp.data)
      setContentTopic(resp.data)
      setButtonhidden(true)
      console.log(contentTopic.content_name)
      handleShow()
    })
  }

  // to update content 
  function updateContent() {
    var obj = {
      "content_id": contentTopic.content_id,
      "content_name": content.current.value,
      "topics": {
        "topic_id": contentTopic.contents.topics.topic_id
      }
    }
    axios({
      url: 'http://localhost:9090/api/topic',
      method: 'put',
      data: obj,
      contentType: 'application/JSON'
    }).then((resp) => {
      alert(resp.data)
    })
  }
  return (
    <>

      {/* modal to add content */}
      <div className='my-3'>
        <Button variant='primary' onClick={() => handleShow()}>New Content</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Content</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>

              {/* Topic select bar */}
              <Form.Group>
                <Form.Label>Topic Name</Form.Label>
                <Form.Select type='text' ref={topicid} defaultValue='Select Topic'>
                  <option className='' disabled>Select Topic</option>
                  {topics.map((d, k) => (
                    <option key={k} value={d.topic_id}>{d.topic_name}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* content name input */}
              <Form.Group>
                <Form.Label>content Name</Form.Label>
                <Form.Control type='text' placeholder='Content Name' ref={content} defaultValue={contentTopic.content_name} required></Form.Control>
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='outline-danger' onClick={handleClose}>Close</Button>
            <Button variant='outline-success' onClick={() => addContent()} hidden={buttonhidden}>Add</Button>
            <Button variant='outline-primary' onClick={() => updateContent()} hidden={!buttonhidden}>Update</Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* table for display contents  */}
      <div>
        <Table bordered variant={theme.mode}>
          <thead>
            <tr>
              <th>Sr no</th>
              <th>Content Name</th>
              <th>Topic Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contents.map((d, k) => (
              <tr key={k}>
                <td>{k + 1}</td>
                <td>{d.content_name}</td>
                <td>{d.topics.topic_name}</td>
                <td>
                  <Button variant='outline-info' size='sm' onClick={() => viewContent(d.content_id)}>View</Button>
                  &nbsp;
                  <Button variant='outline-danger' size='sm' onClick={() => deleteContent(d.content_id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}
