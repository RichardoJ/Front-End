import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function TeacherAsssignment() {
  return (
    <div className="m-3">
      <Row className="align-items-center">
        <Col sm={12} md={9} className="d-flex justify-content-md-start justify-content-sm-center">
          <h1>Assignment</h1>
        </Col>
        <Col sm={12} md={3} className="d-flex justify-content-md-end justify-content-sm-center">
          <Link to={"/assignmentform"}>
            <Button>Add Assignment</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default TeacherAsssignment;
