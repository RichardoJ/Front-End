import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function EnrollmentForm() {
  return (
    <Row className="m-1">
      <h2 className="mt-3" style={{ textAlignVertical: "center", textAlign: "center" }}>Add Enrollment</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formStudentID">
          <Form.Label>Student ID</Form.Label>
          <Form.Control type="text" placeholder="Enter Student ID" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCourseID">
          <Form.Label>Course ID</Form.Label>
          <Form.Control type="text" placeholder="Enter Course ID" />
        </Form.Group>

        <Form.Select aria-label="Default select example">
          <option>Select Courses</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Row>
  );
}

export default EnrollmentForm;
