import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import useInput from "../Hooks/use-input";

function ModuleForm() {
  const params = useParams();
  const [file, setFile] = useState();
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

  let formIsValid = false;

  if(enteredNameIsValid && enteredDetailsIsValid){
    formIsValid = true;
  };

  const fileChangeHandler = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    // if (!enteredNameIsValid) {
    //   return;
    // }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", enteredName);
    formData.append("details", enteredDetails);

    console.log(formData);

    fetch("/modules/course/" + params.courseID, {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        console.log(res.data);
        alert("File uploaded successfully.");
      }
    })
    .catch((err) => {
      alert('Failed to upload');
    });

    resetNameInput();
    resetDetailsInput();
  };

  return (
    <Row className="m-1">
      <h2 className="mt-3" style={{ textAlignVertical: "center", textAlign: "center" }}>Add Module</h2>
      <Form onSubmit={formSubmissionHandler}>
        <Form.Group className="mb-3" controlId="formModuleName">
          <Form.Label>Module Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Module name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          />
          {nameInputHasError && <p>Name must not be empty</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formModuleDetails">
          <Form.Label>Module Details</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter Module Details"
            onChange={detailsChangeHandler}
            onBlur={detailsBlurHandler}
            value={enteredDetails}
          />
          {detailsInputHasError && <p>Details must not be empty</p>}
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Input Module Files here</Form.Label>
          <Form.Control type="file" onChange={fileChangeHandler}/>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!formIsValid}>
          Submit
        </Button>
      </Form>
    </Row>
  );
}

export default ModuleForm;
