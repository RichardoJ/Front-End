import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function TeacherEnrollment() {
  return (
    <div className="m-3">
    <Row className="align-items-center">
      <Col sm={12} md={9} className="d-flex justify-content-md-start justify-content-sm-center">
        <h1>Enrollment</h1>
      </Col>
      <Col sm={12} md={3} className="d-flex justify-content-md-end justify-content-sm-center">
      <Link to={"/enrollmentform"}>
            <Button>Enrollment Form</Button>
          </Link>
      </Col>
    </Row>
  </div>
  );
}

export default TeacherEnrollment;