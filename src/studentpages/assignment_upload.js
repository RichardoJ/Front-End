import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import AuthContext from "../store/auth-context";

function AssignmentStudentUpload(props) {
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const [file, setFile] = useState();
  const [status, setStatus] = useState();
  const [error, setError] = useState(null);
  const assignmentId = location.state.assignmentId;
  const name = location.state.assignmentName;
  const details = location.state.assignmentDetails;
  const deadline = location.state.assignmentDate;

  useEffect(() => {
    const getData = async () => {
      let url = '/answer/student/' + authCtx.idDB + '/assignment/' + assignmentId;
      const response = await fetch(url);

      if(!response.ok){
        throw new Error('Something Went Wrong!');
      }

      const responseData = await response.json();

      setStatus(responseData);
    };

    getData().catch((error) => {
      setError(error.message);
    })
  
  
  },[authCtx.idDB, assignmentId]);

  const fileChangeHandler = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const fileSubmitHandler = () => {
    const formData = new FormData();
    formData.append("file", file);

    let url = "/files/" + authCtx.idDB + "/" + assignmentId + "/upload"

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          alert("File uploaded successfully.");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  if (error) {
    return (
      <section
        className="mt-3"
        style={{ textAlignVertical: "center", textAlign: "center" }}
      >
        <p>{error}</p>
      </section>
    );
  }

  return (
    <div className="m-3">
      <h2>{name}</h2>
      <hr />
      <h4>Details : </h4>
      <p>{details}</p>
      <h4>Deadline : </h4>
      <p>{deadline}</p>
      <h4>UPLOAD : </h4>
      {status === false && <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Multiple files input example</Form.Label>
        <Form.Control type="file" onChange={fileChangeHandler} />
      </Form.Group>}
      {status === true && <p>You Have Already Uploaded a File, Please Contact Your Teacher if there is any problem</p>}
      {status === false && <Button onClick={fileSubmitHandler}>Submit File</Button>}
    </div>
  );
}

export default AssignmentStudentUpload;
