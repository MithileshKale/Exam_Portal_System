import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import setmode from "../Student/context/contexts";

export default function ContentQuestions() {
  const theme = useContext(setmode);
  // states for storing variables
  const [contQuestions, setContQuestions] = useState([]);
  const [show, setshow] = useState(false);
  const [topics, setTopics] = useState([]);
  const [contents, setContents] = useState([]);
  const [ques, setQues] = useState([]);

  // for add and update visiblity
  const [buttonVisiblity, setButtonVisiblity] = useState(false);

  // functions for hide and close modal
  const handleshow = () => setshow(true);
  const handleclose = () => {
    setshow(false);
    setButtonVisiblity(false);
  };

  // onload call functions
  useEffect(() => {
    fetchQuestions();
    fetchTopics();
    // fetchContents()
  }, []);

  // To get content questions
  function fetchQuestions() {
    axios({
      url: "http://localhost:9090/api/contentquestions",
      method: "get",
      contentType: "application/JSON",
    }).then((resp) => {
      setContQuestions(resp.data);
    });
  }

  // to get all topics
  function fetchTopics() {
    axios({
      url: "http://localhost:9090/api/topic",
      method: "get",
      contentType: "application/JSON",
    }).then((resp) => {
      setTopics(resp.data);
    });
  }

  // to get Contents by Topic
  const tid = useRef();
  function fetchContents() {
    var id = tid.current.value;
    axios({
      url: "http://localhost:9090/api/topicwisecontent/" + id,
      method: "get",
      contentType: "application/JSON",
    }).then((resp) => {
      setContents(resp.data);
    });
  }

  // To add questions
  const question = useRef();
  const opt1 = useRef();
  const opt2 = useRef();
  const opt3 = useRef();
  const opt4 = useRef();
  const crtopt = useRef();
  const cid = useRef();
  const level = useRef();

  function addQuestion() {
    var obj = {
      question: question.current.value,
      option1: opt1.current.value,
      option2: opt2.current.value,
      option3: opt3.current.value,
      option4: opt4.current.value,
      correct_option: crtopt.current.value,
      question_level: level.current.value,
      contents: { content_id: cid.current.value },
    };
    axios({
      url: "http://localhost:9090/api/contentquestion",
      method: "post",
      data: obj,
      contentType: "application/JSON",
    }).then((resp) => {
      alert(resp.data);
      handleclose();
      fetchQuestions();
    });
  }

  // to delete content question
  function deleteQue(id) {
    axios({
      url: "http://localhost:9090/api/contentquestion/" + id,
      method: "delete",
      contentType: "applicaton/JSON",
    }).then((resp) => {
      alert(resp.data);
      fetchQuestions();
    });
  }

  // to update contents questions
  function updateQuestion() {}

  // to view data in modal
  function viewData(id) {
    axios({
      url: "http://localhost:9090/api/questionwisecontenttopic/" + id,
      method: "get",
      contentType: "application/JSON",
    }).then((resp) =>
      // console.log(resp.data)
      setQues(resp.data)
    );
    console.log(ques.contents);
    setButtonVisiblity(true);
    handleshow();
  }
  return (
    <>
      <div className="my-3">
        <Button variant="primary" onClick={handleshow}>
          New Question
        </Button>
        <Modal show={show} onHide={handleclose} variant="dark">
          <Modal.Header closeButton>
            <Modal.Title>Add Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  {/* topic name selecter */}
                  <Form.Group>
                    <Form.Label>Topic Name</Form.Label>
                    <Form.Select
                      ref={tid}
                      defaultValue="Select Topic"
                      onChange={fetchContents}
                    >
                      <option defaultValue="Select Topic" disabled>
                        Select Topic
                      </option>
                      {topics.map((d, k) => (
                        <option key={k} value={d.topic_id}>
                          {d.topic_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  {/* Content Name selecter  */}
                  <Form.Group>
                    <Form.Label>Content Name</Form.Label>
                    <Form.Select ref={cid} defaultValue="Select Content">
                      <option disabled defaultValue="Select Content" selected>
                        Select Content
                      </option>
                      {contents.map((d, k) => (
                        <option key={k} value={d.content_id}>
                          {d.content_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Question"
                  ref={question}
                  defaultValue={ques.question}
                ></Form.Control>
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Option 1</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Option 1"
                      ref={opt1}
                      defaultValue={ques.option1}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Option 2</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Option 2"
                      ref={opt2}
                      defaultValue={ques.option2}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Option 3</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Option 3"
                      ref={opt3}
                      defaultValue={ques.option3}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Option 4</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Option 4"
                      ref={opt4}
                      defaultValue={ques.option4}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Correct option</Form.Label>
                    <Form.Select
                      type="text"
                      ref={crtopt}
                      defaultValue="Select Correct option"
                    >
                      <option value="Select Correct option" disabled>
                        Select Correct option
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Level</Form.Label>
                    <Form.Select ref={level} defaultValue="Select Level">
                      <option disabled>Select Level</option>
                      <option defaultValue="Easy">Easy</option>
                      <option defaultValue="Medium">Medium</option>
                      <option defaultValue="Hard">Hard</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              variant="outline-danger"
              onClick={handleclose}
            >
              Close
            </Button>
            <Button
              type="button"
              variant="outline-primary"
              onClick={addQuestion}
              hidden={buttonVisiblity}
            >
              Add
            </Button>
            <Button
              type="button"
              variant="outline-info"
              onClick={updateQuestion}
              hidden={!buttonVisiblity}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <hr />
      <Row>
        <Col sm={9}></Col>
        <Col className="me-2">
          <Form.Control placeholder="Search by Topic" />
        </Col>
      </Row>
      {/* table to display content question */}
      <div className="table-responsive mt-2">
        <Table bordered variant={theme.mode}>
          <thead>
            <tr>
              <th>Sr no</th>
              <th>Questions</th>
              <th>Option 1</th>
              <th>Option 2</th>
              <th>Option 3</th>
              <th>Option 4</th>
              <th>Correct Option</th>
              <th>Level</th>
              <th>Content Name</th>
              <th>Topic</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contQuestions.map((d, k) => (
              <tr key={k}>
                <td>{k + 1}</td>
                <td>{d.question}</td>
                <td>{d.option1}</td>
                <td>{d.option2}</td>
                <td>{d.option3}</td>
                <td>{d.option4}</td>
                <td>{d.correct_option}</td>
                <td>{d.question_level}</td>
                <td>{d.contents.content_name}</td>
                <td>{d.contents.topics.topic_name}</td>
                <td>
                  <Row>
                    <Col className="mb-2">
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => viewData(d.question_id)}
                      >
                        View
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteQue(d.question_id)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
