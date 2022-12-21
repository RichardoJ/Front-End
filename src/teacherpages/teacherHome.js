import React from "react";
import { Row, Col, Card } from "react-bootstrap";
// import { Route, Router, Routes } from "react-router-dom";
function TeacherHome() {
  return (
    <div className="ms-3 me-3">
      <h2
        className="mt-3"
        style={{ textAlignVertical: "center", textAlign: "center" }}
      >
        Teacher's View
      </h2>
      
      <Row xs={1} sm={3} className="m-2 d-flex">
        <Col sm={4}>
          <Card className="p-0 m-2">
            <Card.Header>Assignment</Card.Header>
            <Card.Body>
              <Card.Title>Add Assignment!</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                May the Force be with you
              </Card.Subtitle>
              <Card.Text>There is no time for procrastination!</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card className="p-0 m-2">
            <Card.Header>Courses</Card.Header>
            <Card.Body>
              <Card.Title>Add Course!</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                May the Force be with you
              </Card.Subtitle>
              <Card.Text>
                This is where you can see your courses for the semester
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card className="p-0 m-2">
            <Card.Header>Grades</Card.Header>
            <Card.Body>
              <Card.Title>Add Grades!</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                May the Force be with you
              </Card.Subtitle>
              <Card.Text>
                As long as you have done your best, it will be okay
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default TeacherHome;
