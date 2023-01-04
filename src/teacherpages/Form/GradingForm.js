import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Row } from "react-bootstrap";


function GradingForm() {
  const location = useLocation();
  const [assignment, setAssignment] = useState([])
  const [score, setScore] = useState("");
  const id = location.state.id;
  const assignment_id = location.state.assignment_id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/assignment/' + assignment_id);

      if(!response.ok){
        throw new Error('Something Went Wrong!');
      }

      const responseData = await response.json();

      setAssignment(responseData);
      setLoading(false)
    };

    getData().catch((error) => {
      setLoading(false);
      setError(error.message);
    })
  
  }, [assignment_id]);



  if(loading){
    return <section className="mt-3" style={{textAlignVertical: "center",textAlign: "center"}}>
      <p>A moment please...</p>
    </section>
  }

  if(error){
    return <section className="mt-3" style={{textAlignVertical: "center",textAlign: "center"}}>
      <p>{error}</p>
    </section>
  }

  const handleGradeInput = (e) => {
    setScore(e.target.value);
}

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    const answer = {
      answer_id: id,
      score: score,
    };

    console.log(JSON.stringify(answer));

    let url = '/answer/';

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(answer),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        alert('Grade Input Success');
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage = data;
          throw new Error(errorMessage);
        });
      }
    }).then((data) => {
      console.log(data);
    })

  };

  return (
    <Row className="m-1">
      <h2
        className="mt-3"
        style={{ textAlignVertical: "center", textAlign: "center" }}
      >
        Grade Answers
      </h2>
      <h6>Name : {assignment.assignment_name}</h6>
      <h6>Deadline : {assignment.deadline}</h6>
      <h6>Details : {assignment.details}</h6>
      <Form onSubmit={formSubmissionHandler}>
        <Form.Group controlId="formInput" className="mb-3">
          <Form.Label>Grade</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter student score"
            step="0.1"
            min="0"
            max="100"
            value={score}
            onChange={handleGradeInput}
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Row>
  );
}

export default GradingForm;