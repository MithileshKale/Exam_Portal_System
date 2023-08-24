import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import AllExams from "../exam/AllExams";
export default function ExamsComponent() {
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [ishidden, setIsHidden] = useState(true);
  const [startTime, setStartTime] = useState("");
  // eslint-disable-next-line
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getAllTopics();
  }, []);

  // to show and hide modal
  const [show, setShow] = useState(false);
  const showmodal = () => {
    setShow(true);
  };
  const hideModal = () => {
    setShow(false);
  };

  // get all topics from database
  const getAllTopics = () => {
    axios({
      url: "http://localhost:9090/api/topic",
      method: "get",
      contentType: "application/JSON",
    }).then((resp) => {
      setTopics(resp.data);
    });
  };

  // to get question by id
  const queid = useRef();
  const getQuestions = () => {
    let id = queid.current.value;
    axios({
      url: "http://localhost:9090/api/questions/" + id,
      method: "get",
      contentType: "application/JSON",
    }).then((resp) => {
      setQuestions(resp.data);
      setShow(false);
      countTime();
      setIsHidden(false);
      setStartTime(new Date().toLocaleTimeString());
    });
  };

  // send data to api
  const submitExam = () => {
    console.log(localStorage.getItem("student_id"));
    let obj = {
      exame_date: new Date().toLocaleDateString(),
      start_time: startTime,
      end_time: new Date().toLocaleTimeString(),
      students_details: { student_id: localStorage.getItem("student_id") },
      exame_questions: options,
    };
    axios({
      url: "http://localhost:9090/api/examdetails",
      method: "post",
      data: obj,
      contentType: "application/JSON",
    }).then((resp) => {
      alert(resp.data);
      setIsHidden(true);
      options.splice(0, options.length);
    });
  };

  const [minutes, setMinutes] = useState(9);
  const [second, setSecond] = useState(60);
  let minute = 9;
  let seconds = 60;
  const countTime = () => {
    const time=setInterval(() => {
      
      if (seconds === 0) {
        minute -= 1;
        setMinutes(minute);
        seconds = 60;
        console.log("hello2");
      } else {
        console.log(seconds - 1);
        seconds -= 1;
        setSecond(seconds);
      }
    }, 1000);
    if (minute === 0) {
      // submitExam();
      clearInterval(time);
    }
  };
  // get selected option
  const getOption = (id, opt) => {
    options.forEach((d, k) => {
      if (d.content_questions.question_id === id) {
        options[k] = {
          submited_option_number: opt,
          content_questions: { question_id: id },
        };
      }
    });
    console.log(options);
  };

  // push all questions answer as 0
  const defaultPush = (id) => {
    let cnt = 0;
    options.forEach((d) => {
      if (d.content_questions.question_id === id) {
        cnt++;
        return;
      }
    });
    if (cnt === 0) {
      const obj = {
        submited_option_number: 0,
        content_questions: { question_id: id },
      };
      options.push(obj);
    }
  };
  return (
    <>
      <Button
        variant="success"
        onClick={showmodal}
        className="mt-1"
        hidden={!ishidden}
      >
        New Exam
      </Button>
      <Button
        variant="success"
        className="mt-1 ms-auto"
        hidden={ishidden}
      >
        {minutes}:{second}
      </Button>
      <Modal show={show} onHide={hideModal}>
        <Modal.Header closeButton>
          <h1>Exam topic</h1>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={9}>
              <select
                defaultValue="Select Topic"
                className="form-control"
                ref={queid}
              >
                <option disabled>Select Topic</option>
                {topics.map((t, k) => {
                  return (
                    <option value={t.topic_id} key={k}>
                      {t.topic_name}
                    </option>
                  );
                })}
              </select>
            </Col>
            <Col xs={3}>
              <Button variant="success" onClick={() => getQuestions()}>
                Start
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* Topic wise questions  */}
      <div hidden={ishidden}>
        <h1>Solve All Questions</h1>
        <Card>
          {questions.map((que, key) => {
            defaultPush(que.question_id);
            return (
              <>
                <Card.Body key={key}>
                  <Card.Title>
                    Q{key + 1}. {que.question}
                  </Card.Title>

                  <Form.Check
                    type="radio"
                    id="option1"
                    value="1"
                    name={key}
                    label={que.option1}
                    onChange={() => getOption(que.question_id, 1)}
                  />

                  <Form.Check
                    type="radio"
                    id="option2"
                    value="2"
                    name={key}
                    label={que.option2}
                    onChange={() => getOption(que.question_id, 2)}
                  />

                  <Form.Check
                    type="radio"
                    name={key}
                    value="3"
                    id="option3"
                    label={que.option3}
                    onChange={() => getOption(que.question_id, 3)}
                  />

                  <Form.Check
                    type="radio"
                    id="option4"
                    value="4"
                    name={key}
                    label={que.option4}
                    onChange={() => getOption(que.question_id, 4)}
                  />
                </Card.Body>
                <hr className="m-0 p-0" />
              </>
            );
          })}
          {/* Exam submit button  */}
          <Card.Footer className="d-flex justify-content-end">
            <Button variant="outline-primary" onClick={submitExam}>
              Submit
            </Button>
          </Card.Footer>
        </Card>
      </div>
      <div hidden={!ishidden}>
        <hr />
        <AllExams />
      </div>
    </>
  );
}
