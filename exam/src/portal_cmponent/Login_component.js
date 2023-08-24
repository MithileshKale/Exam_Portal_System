import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import setmode from "../Student/context/contexts";
import student from "../student.jpg";
function LoginComponent() {
  const theme = useContext(setmode);
  // to display alert box
  const [hidden, setHidden] = useState(true);

  // onclick button set button disabled
  const [disabled,setDisabled]=useState(false)
  // to display message
  const [msg, setmsg] = useState("");

  // to render page
  const navigate = useNavigate();

  // to get form data
  const user = useRef();
  const pass = useRef();

  // To chech user is exist or not
  const check = () => {

    // to set button disabled or not 
    setButton()
    var uname = user.current.value;
    var upass = pass.current.value;
    var obj = {
      username: uname,
      password: upass,
    };
    if (uname!=="" && upass!=="") {
      axios({
        url: "http://localhost:9090/api/isexist",
        method: "post",
        data: obj,
        contentType: "application/JSON",
      }).then((resp) => {
        console.log(resp);
        let data = resp.data;
        // alert(resp.data)
        if (uname === "admin" && upass === "admin") {
          navigate("/admin/");
        } else {
          if (data !== "") {
            console.log(data.student_id);
            localStorage.setItem("student_id", data.student_id);
            navigate("/student/");
          } else {
            wrongDetails("Check your Username or Password");
            
          }
        }
      });

    }
    else {
      uname === ""
        ? wrongDetails("Enter username")
        : wrongDetails("Enter Password");
    }
  };
  const setButton = () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
}
  // to set display msg 
  const wrongDetails = (msg) => {
    setmsg(msg);
    setHidden(false);
    setTimeout(() => {
      setHidden(true);
    }, 5000);
  }
  return (
    <>
      <Container fluid>
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
        <Row className="mt-4">
          <Col xs={7}>
            <Image
              src={student}
              alt="this is a image"
              width={400}
              className="ms-auto "
            />
          </Col>

          {/* login form  */}
          <Col xs={4}>
            <Alert hidden={hidden} variant="danger">
              <Alert.Heading>{msg}</Alert.Heading>
            </Alert>
            <Card className="shadow-lg mt-5">
              <Card.Header className="bg-white">
                <Card.Text className="h1 text-center text-info">
                  Login Here
                </Card.Text>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Username / Email Id</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Username or Email Id"
                      ref={user}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Password"
                      ref={pass}
                    ></Form.Control>
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer className="bg-white teal">
                <Button
                  type="submit"
                  className="d-inline"
                  variant="outline-primary"
                  onClick={() => check()}
                  disabled={disabled}
                >
                  Login
                </Button>
                <span className="d-inline ms-4">
                  Don't have Account{" "}
                  <Link to='signup' className="text-decoration-none">
                    Sign Up
                  </Link>
                </span>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginComponent;
