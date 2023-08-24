import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import setmode from '../Student/context/contexts'

export default function ViewExamsMarks() {
 const theme=useContext(setmode)
  const [questions, setQuestions] = useState([]);
  const [isHidden, setIsHidden] = useState(true)

  useEffect(() => {
    getExamQuestion()
  }, [])


  const getExamQuestion = () => {
    axios({
      url: 'http://localhost:9090/api/exammarks/' + localStorage.getItem("exam_id"),
      method: 'get',
      contentType: 'application/JSON'
    }).then((resp) => {
      setQuestions(resp.data)
    })
  }
  let ttlquestions = 0;
  let atempt = 0;
  let mark = 0;
  const details = (data) => {
    ttlquestions += 1;
    if (data.submited_opt === 0) {
      atempt+=1;
    }
    mark = data.marks + mark;
    
  };
  return (
    <>
      <div className="d-flex row mx-3">
        <Button
          variant="success"
          className="my-2 order-2"
          onClick={() => setIsHidden(!isHidden)}
        >
          {isHidden === true ? "View Details" : "Hide Details"}
        </Button>
        <Table
          bordered
          variant={theme.mode}
          responsive
          hover
          className="mt-1 order-3"
          hidden={isHidden}
        >
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Question</th>
              <th>Submited Option</th>
              <th>Correct Option</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((d, k) => {
              details(d);
              return (
                <tr key={k}>
                  <td>{k + 1}</td>
                  <td>{d.examQuestion}</td>
                  <td>{d.submited_opt}</td>
                  <td>{d.correct_opt}</td>
                  <td
                    className={d.marks === 0 ? "text-danger" : "text-success"}
                  >
                    {d.marks}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Card className="my-2 shadow order-1" border="none">
          <Card.Body>
            <Row>
              <Col>
                <h6>Total no Questions : {ttlquestions}</h6>
              </Col>
              <Col>
                <h6>Atempted Questions : {ttlquestions - atempt}</h6>
              </Col>
              <Col>
                <h6>Unatempted Questions : {atempt}</h6>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <h6>Total Marks : {mark}</h6>
              </Col>
              <Col>
                <h6>
                  Percentage : {((mark / ttlquestions) * 100).toFixed(2)} %
                </h6>
              </Col>
              <Col>
                <h6>
                  Result :
                  {((mark / ttlquestions) * 100).toFixed(2) < 30
                    ? "Fail"
                    : "Pass"}
                </h6>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
