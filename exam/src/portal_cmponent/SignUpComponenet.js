import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import setmode from "../Student/context/contexts";

export default function SignUpComponenet() {
  const theme = useContext(setmode);
  const [msg, setmsg] = useState("");
  const [alert, setAlert] = useState("danger");
  const [isHidden, setIsHidden] = useState(true);
  const navigate = useNavigate();
  const fname = useRef();
  const mname = useRef();
  const lname = useRef();
  const degree = useRef();
  const special = useRef();
  const mnumber = useRef();
  const city = useRef();
  const email = useRef();

  // function for sign up
  const signUp = () => {
    console.log("hello");
    let obj = {
      student_name:
        fname.current.value +
        " " +
        mname.current.value +
        " " +
        lname.current.value,
      qualification: degree.current.value + "(" + special.current.value + ")",
      mobile: mnumber.current.value,
      email: email.current.value,
      city: city.current.value,
    };
    axios({
      url: "http://localhost:9090/api/student",
      method: "post",
      data: obj,
      contentType: "application/JSON",
    }).then((resp) => {
      if (resp.data) {
        getMessage("Account Created successfully");
        setAlert("success");
        setTimeout(() => {
          tonavigate();
        }, 2000);
      } else {
        getMessage("Email already register");
        setAlert("danger");
      }
    });
  };
  const tonavigate = () => {
    navigate("/");
  };

  const getMessage = (msg) => {
    setmsg(msg);
    setIsHidden(false);
    setTimeout(() => {
      setIsHidden(true);
    }, 4000);
  };
  return (
    <>
      <Navbar expand="lg" bg={theme.mode} variant={theme.mode}>
        <Navbar.Brand className="display-1">Exam Portal</Navbar.Brand>
        <Navbar id="basic-navbar-nav" className="ms-auto m-0 p-0">
          <Nav>
            <Nav.Item>
              <Nav.Link className="m-0 p-0">
                <span onClick={theme.changeMode}>{theme.icon}</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Log In</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
      </Navbar>
      <div className="mx-5 my-2">
        <Row>
          <Col sm={6}></Col>
          <Col>
            <Alert variant={alert} hidden={isHidden}>
              <Alert.Heading>{msg}</Alert.Heading>
            </Alert>
            <Card className="shadow-lg">
              <Form>
                <Card.Header>
                  <Card.Title>
                    <h1 className="text-center text-info">Sign Up Here</h1>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          placeholder="Enter First name"
                          type="text"
                          className="mb-2"
                          ref={fname}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Middle Name</Form.Label>
                        <Form.Control
                          placeholder="Enter Middle name"
                          type="text"
                          ref={mname}
                          className="mb-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          placeholder="Enter last name"
                          type="text"
                          ref={lname}
                          className="mb-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Digree</Form.Label>
                        <Form.Control
                          placeholder="enter digree"
                          type="text"
                          ref={degree}
                          className="mb-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>specialisation</Form.Label>
                        <Form.Control
                          placeholder="enter specialisation"
                          type="text"
                          ref={special}
                          className="mb-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Mobile no</Form.Label>
                        <Form.Control
                          placeholder="enter mobile no"
                          type="number"
                          ref={mnumber}
                          className="mb-2"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          placeholder="enter City"
                          type="text"
                          ref={city}
                          className="mb-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          placeholder="enter email"
                          type="email"
                          ref={email}
                          className="mb-2 required"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Button
                    type="button"
                    variant="success"
                    onClick={() => signUp()}
                  >
                    Sign Up
                  </Button>
                  <span className=" h6 ps-5">
                    if allredy have account
                    <span
                      className="text-info"
                      style={{ cursor: "pointer" }}
                      onClick={() => tonavigate()}
                    >
                      {" "}
                      sign in
                    </span>
                  </span>
                </Card.Footer>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
