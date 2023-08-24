import React, { useContext } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import setmode from "./context/contexts";
import NavbarComponent from "./NavbarComponent";
import "./StudentComponent.css";

export default function StudentComponent() {
  const theme = useContext(setmode);
  return (
    <>
      <div>
        <NavbarComponent />
      </div>
      <Row>
        <Col sm={3}>
          <div
            className={
              theme.mode === "dark"
                ? "p-3 text-bg-dark mt-1 rounded border border-light"
                : "p-3 bg-light bg-gradient mt-1 rounded"
            }
          >
            <p className="h4 ">Student Section</p>
            <ListGroup>
              <Link
                to=""
                className="text-decoration-none text-dark rounded-top "
              >
                <ListGroup.Item action className="cool">
                  Dashboard
                </ListGroup.Item>
              </Link>
              <Link to="profile" className="text-decoration-none text-dark">
                <ListGroup.Item action className="cool">
                  Profile
                </ListGroup.Item>
              </Link>
              <Link to="tutorials" className="text-decoration-none text-dark">
                <ListGroup.Item action className="cool">
                  Video Tutorials
                </ListGroup.Item>
              </Link>
              <Link
                to="exams"
                className="text-decoration-none text-dark rounded-bottom"
              >
                <ListGroup.Item action className="cool">
                  Exams
                </ListGroup.Item>
              </Link>
            </ListGroup>
          </div>
        </Col>
        <Col sm={9}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
}
