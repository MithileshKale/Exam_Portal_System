import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

export default function DashBord() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getcount();
  }, []);
  const getcount = () => {
    axios({
      url: "http://localhost:9090/api/count",
      method: "get",
      contentType: "application/json",
    }).then((resp) => {
      setData(resp.data);
    });
  };

  return (
    <>
      <div className="my-5 mx-auto" style={{"width":"25vw"}} >
        <Card className="w-5 shadow-lg">
          <Card.Header className="text-center text-bg-success">
            <Card.Title>Total Students</Card.Title>
          </Card.Header>
          <Card.Body>
            <h1 className="text-center">{data[0]}</h1>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Row>
          <Col>
            <Card className="shadow ms-1">
              <Card.Header className="text-center text-bg-info">
                <Card.Title>Total Topics</Card.Title>
              </Card.Header>
              <Card.Body>
                <h1 className="text-center">{data[1]}</h1>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="shadow ms-3">
              <Card.Header className="text-center text-bg-info">
                <Card.Title>Total Contents</Card.Title>
              </Card.Header>
              <Card.Body>
                <h1 className="text-center">{data[2]}</h1>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="shadow ms-3">
              <Card.Header className="text-center text-bg-info">
                <Card.Title>Total Questions</Card.Title>
              </Card.Header>
              <Card.Body>
                <h1 className="text-center">{data[3]}</h1>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
