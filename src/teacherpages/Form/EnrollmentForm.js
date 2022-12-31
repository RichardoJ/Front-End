import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import useInput from "../Hooks/use-input";

function EnrollmentForm() {

  //Student ID
  const {
    value: enteredStudentId,
    isValid: enteredStudentIdIsValid,
    hasError: studentIdInputHasError,
    valueChangeHandler: studentIdChangeHandler,
    inputBlurHandler: studentIdBlurHandler,
    reset: resetStudentIdInput
  } = useInput((value) => value.trim() !== "");

  //Course ID
  const {
    value: enteredCourseId,
    isValid: enteredCourseIdIsValid,
    hasError: courseIdInputHasError,
    valueChangeHandler: courseIdChangeHandler,
    inputBlurHandler: courseIdBlurHandler,
    reset: resetCourseIdInput
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if(enteredStudentIdIsValid && enteredCourseIdIsValid){
    formIsValid = true;
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    
    const enrollment={
      student_id: enteredStudentId,
      course_id: enteredCourseId
    };

    fetch("/enrollment/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enrollment),
    }).then((res) => {
      if (res.ok) {
        alert('Student Enrolled Successfully');
      }
    })
    .catch((err) => {
      alert('Failed to Enroll');
    });

    resetStudentIdInput();
    resetCourseIdInput();
  };

  return (
    <Row className="m-1">
      <h2
        className="mt-3"
        style={{ textAlignVertical: "center", textAlign: "center" }}
      >
        Add Enrollment
      </h2>
      <Form onSubmit={formSubmissionHandler}>
        <Form.Group className="mb-3" controlId="formStudentID">
          <Form.Label placeholder="Enter email">Student ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Student ID"
            onChange={studentIdChangeHandler}
            onBlur={studentIdBlurHandler}
            value={enteredStudentId}
          />
          {studentIdInputHasError && <p>Please enter a valid student number</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCourseID">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Course ID"
            onChange={courseIdChangeHandler}
            onBlur={courseIdBlurHandler}
            value={enteredCourseId}
          />
          {courseIdInputHasError && <p>Please enter a valid student number</p>}
        </Form.Group>

        {/* <Form.Select aria-label="Default select example">
          <option>Select Courses</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select> */}
        <Button variant="primary" type="submit" className="mt-3" disabled={!formIsValid}>
          Submit
        </Button>
      </Form>
    </Row>
  );
}

export default EnrollmentForm;
