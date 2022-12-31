import React, { useContext, useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import AuthContext from "../../store/auth-context";
import classes from "./CourseForm.module.css";

import useInput from "../Hooks/use-input";

function CourseForm() {
  const authCtx = useContext(AuthContext);
  const [success, setSuccess] = useState(false);

  //Name
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput((value) => value.trim() !== "");

  //Start Date
  const {
    value: enteredStartDate,
    isValid: enteredStartDateIsValid,
    hasError: startDateInputHasError,
    valueChangeHandler: startDateChangeHandler,
    inputBlurHandler: startDateBlurHandler,
    reset: resetStartDateInput
  } = useInput((value) => value.trim() !== "");

  //End Date
  const {
    value: enteredEndDate,
    isValid: enteredEndDateIsValid,
    hasError: endDateInputHasError,
    valueChangeHandler: endDateChangeHandler,
    inputBlurHandler: endDateBlurHandler,
    reset: resetEndDateInput
  } = useInput((value) => value.trim() !== "");

  //Details
  const {
    value: enteredDetail,
    isValid: enteredDetailIsValid,
    hasError: detailInputHasError,
    valueChangeHandler: detailChangeHandler,
    inputBlurHandler: detailBlurHandler,
    reset: resetDetailInput
  } = useInput((value) => value.trim() !== "");

  //Link
  const {
    value: enteredLink,
    isValid: enteredLinkIsValid,
    hasError: linkInputHasError,
    valueChangeHandler: linkChangeHandler,
    inputBlurHandler: linkBlurHandler,
    reset: resetLinkInput
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if(enteredNameIsValid && enteredStartDateIsValid && enteredEndDateIsValid && enteredDetailIsValid && enteredLinkIsValid){
    formIsValid = true;
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    // if (!enteredNameIsValid) {
    //   return;
    // }

    const course = {
      course_name: enteredName,
      start_date: enteredStartDate,
      end_date:enteredEndDate,
      course_link:enteredLink,
      details: enteredDetail,
    };

    let url = '/course/add/' + authCtx.idDB;

    fetch(url, {
      method: "POST",
      body: JSON.stringify(course),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage = data;
          throw new Error(errorMessage);
        });
      }
    }).then((data) => {
      resetNameInput()
      resetStartDateInput()
      resetEndDateInput()
      resetDetailInput()
      resetLinkInput()
      setSuccess(true);
    })

    

  };

  return (
    <Row className="m-1">
      <h2 className="mt-3" style={{ textAlignVertical: "center", textAlign: "center" }}>Add course</h2>
      <Form onSubmit={formSubmissionHandler}>
        <Form.Group className="mb-3" controlId="formCourseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Enter Course name" 
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
          />
          {nameInputHasError && (
            <p className={classes.error}>Please Enter A Course Name</p>
          )}
        </Form.Group>

        <Form.Group as= {Col} className="mb-3" controlId="formStartDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control 
          type="date" 
          placeholder="Enter Start Date" 
          onChange={startDateChangeHandler}
          onBlur={startDateBlurHandler}
          value={enteredStartDate}/>
          {startDateInputHasError && (
            <p className={classes.error}>Please Enter a Start Date</p>
          )}
        </Form.Group>

        <Form.Group as= {Col} className="mb-3" controlId="formEndDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control 
          type="date" 
          placeholder="Enter End Date"
          onChange={endDateChangeHandler}
          onBlur={endDateBlurHandler}
          value={enteredEndDate} />
          {endDateInputHasError && (
            <p className={classes.error}>Please Enter An End Date</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCourseDetails">
          <Form.Label>Course Details</Form.Label>
          <Form.Control as="textarea" 
          placeholder="Enter Course Details" 
          onChange={detailChangeHandler}
          onBlur={detailBlurHandler}
          value={enteredDetail}
          />
          {detailInputHasError && (
            <p className={classes.error}>Please Enter the Details Course</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCourseLink">
          <Form.Label>Course Link</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Enter Course Link" 
          onChange={linkChangeHandler}
          onBlur={linkBlurHandler}
          value={enteredLink}
          />
          {linkInputHasError && (
            <p className={classes.error}>Please Enter the Course Link</p>
          )}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!formIsValid}>
          Submit
        </Button>
      </Form>
      {success === true && <Alert>Success</Alert>}
    </Row>
  );
}

export default CourseForm;
