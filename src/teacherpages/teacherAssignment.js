import React , {useContext, useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import AuthContext from "../store/auth-context";

function TeacherAsssignment() {
  const [assignments, setAssignment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/course/teacher/" + authCtx.idDB);

      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }

      const responseData = await response.json();
      const idCourses = [];
      // eslint-disable-next-line
      const courseList = responseData.map((course, idx) => (
        idCourses.push(course.id)  
      ));

      console.log(courseList);

      const responseTwo = await fetch("/assignment/list/course", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(idCourses),
      });

      if (!responseTwo.ok) {
        throw new Error("Something Went Wrong!");
      }

      const responseDataTwo = await responseTwo.json();

      setAssignment(responseDataTwo);
      setLoading(false);
    };

    getData().catch((error) => {
      setLoading(false);
      setError(error.message);
    });
  
    // eslint-disable-next-line
  }, [authCtx.idDB]);

  const deleteHandler = (e) => {
    e.preventDefault();
    const newAssignment = [];
    for (let i = 0; i < assignments.length; i++) {
      // eslint-disable-next-line
      if(assignments[i].id != e.target.value){
        newAssignment.push(assignments[i]);
      }
    }
    setAssignment(newAssignment);
    fetch('/assignment/' + e.target.value, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.ok) {
          alert("Assignment Deleted successfully.");
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
        <Col sm={12} md={9} className="d-flex justify-content-md-start justify-content-sm-center">
          <h1>Assignment</h1>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Assignment Name</th>
              <th>Assignment Deadline</th>
              <th>Assignment Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={assignment.id}>
                <td>{index + 1}</td>
                <td style={{ whiteSpace: "nowrap" }}>{assignment.assignment_name}</td>
                <td style={{ whiteSpace: "nowrap" }}>{assignment.deadline}</td>
                <td style={{ whiteSpace: "nowrap" }}>{assignment.details}</td>
                <td>
                  <Button
                    size="sm"
                    color="danger"
                    value={assignment.id}
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

export default TeacherAsssignment;
