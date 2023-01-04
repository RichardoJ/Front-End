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
  const [fileExtensionError, setFileExtensionError] = useState(false);
  const [valid, setValid] = useState(false);

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

  function getExtension(filename) {
    return filename.split('.').pop()
  }

  const fileChangeHandler = (e) => {
    e.preventDefault();
    var extension = getExtension(e.target.files[0].name)
    if(extension === "pdf"){
      setFile(e.target.files[0]);
      setValid(true);
      setFileExtensionError(false);
    }else{
      setFileExtensionError(true);
    }
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
        <Form.Control type="file" onChange={fileChangeHandler} accept=".pdf" />
      </Form.Group>}
      {status === true && <p>You Have Already Uploaded a File, Please Contact Your Teacher if there is any problem</p>}
      {fileExtensionError === true && <p style={{ color: 'red' }}>Upload only PDF file</p>}
      {status === false && <Button onClick={fileSubmitHandler} disabled={!valid}>Submit File</Button>}
      
    </div>
  );
}

export default AssignmentStudentUpload;
