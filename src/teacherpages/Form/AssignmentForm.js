import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function AssignmentForm() {
  return (
    <Row className="m-1">
      <h2 className="mt-3" style={{ textAlignVertical: "center", textAlign: "center" }}>Add assignment</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formAssignmentName">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Assignment name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAssignmentDetails">
          <Form.Label>Assignment Details</Form.Label>
          <Form.Control as="textarea" placeholder="Enter Assignment Details" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Row>
  );
}

export default AssignmentForm;
