import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function TeacherStudent() {
  const [students, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/student", {
        method: "get",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }

      const responseData = await response.json();

      setStudent(responseData);
      setLoading(false);
    };

    getData().catch((error) => {
      setLoading(false);
      setError(error.message);
    });
  }, []);

  const deleteHandler = (e) => {
    e.preventDefault();
    const newStudent = [];
    for (let i = 0; i < students.length; i++) {
      // eslint-disable-next-line
      if(students[i].id != e.target.value){
        newStudent.push(students[i]);
      }
    }
    setStudent(newStudent);
    fetch('/student/' + e.target.value, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.ok) {
          alert("Student Deleted successfully.");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  if (loading) {
    return (
      <section
        className="mt-3"
        style={{ textAlignVertical: "center", textAlign: "center" }}
      >
        <p>A moment please...</p>
      </section>
    );
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
      <Row className="align-items-center">
        <Col sm={8}>
          <h1>Welcome to Student List</h1>
        </Col>
        <Col sm={4} className="d-flex justify-content-end">
          <Link to={"/studentform"}>
            <Button>Student Form</Button>
          </Link>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td style={{ whiteSpace: "nowrap" }}>{student.student_name}</td>
                <td>
                  <Button
                    size="sm"
                    color="danger"
                    value={student.id}
                    onClick={deleteHandler}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TeacherStudent;
