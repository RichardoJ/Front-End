import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import useInput from "../Hooks/use-input";
import classes from "./AssignmentForm.module.css";

function AssignmentForm() {
  const params = useParams();
  //Name
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  //Details
  const {
    value: enteredDetails,
    isValid: enteredDetailsIsValid,
    hasError: detailsInputHasError,
    valueChangeHandler: detailsChangeHandler,
    inputBlurHandler: detailsBlurHandler,
    reset: resetDetailsInput,
  } = useInput((value) => value.trim() !== "");

  //Deadline
  const {
    value: enteredDeadline,
    isValid: enteredDeadlineIsValid,
    hasError: deadlineInputHasError,
    valueChangeHandler: deadlineChangeHandler,
    inputBlurHandler: deadlineBlurHandler,
    reset: resetDeadlineInput
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if(enteredNameIsValid && enteredDetailsIsValid && enteredDeadlineIsValid){
    formIsValid = true;
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    const assignment = {
      assignment_name: enteredName,
      details: enteredDetails,
      course_id_assignment: params.courseID,
      deadline: enteredDeadline
    };

    fetch("/assignment/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignment),
    }).then((res) => {
      if (res.ok) {
        alert('Assignment Created Successfully');
      }
    })
    .catch((err) => {
      alert('Failed to Create');
    });

    resetNameInput();
    resetDetailsInput();
    resetDeadlineInput();
  };

  return (
    <Row className="m-1">
      <h2
        className="mt-3"
        style={{ textAlignVertical: "center", textAlign: "center" }}
      >
        Add assignment
      </h2>
      <Form onSubmit={formSubmissionHandler}>
        <Form.Group className="mb-3" controlId="formAssignmentName">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Assignment name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          />
          {nameInputHasError && <p className={classes.error}>Name must not be empty</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAssignmentDetails">
          <Form.Label>Assignment Details</Form.Label>
          <Form.Control as="textarea" placeholder="Enter Assignment Details" 
          onChange={detailsChangeHandler}
          onBlur={detailsBlurHandler}
          value={enteredDetails}/>
          {detailsInputHasError && <p className={classes.error}>Details must not be empty</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDeadline">
          <Form.Label>Deadline</Form.Label>
          <Form.Control 
          type="date" 
          placeholder="Enter Deadline" 
          onChange={deadlineChangeHandler}
          onBlur={deadlineBlurHandler}
          value={enteredDeadline}/>
          {deadlineInputHasError && (
            <p className={classes.error}>Please Enter a Start Date</p>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!formIsValid}>
          Submit
        </Button>
      </Form>
    </Row>
  );
}

export default AssignmentForm;
