import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

function EnrollmentDetails() {
  const location = useLocation();
  const params = useParams();
  const name = location.state.studentName;
  const [courses, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/enrollment/" + params.studentID +"/student_course");

      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }

      const responseData = await response.json();

      setCourse(responseData);
      setLoading(false);
    };

    getData().catch((error) => {
      setLoading(false);
      setError(error.message);
    });

    // eslint-disable-next-line
  },[params.studentID]);

  const deleteHandler = (e) => {
    e.preventDefault();
    
    fetch('/enrollment/student/' + params.studentID + '/course/' + e.target.value, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.ok) {
          alert("Enrollment Deleted successfully.");
          const newEnrollment = [];
          for (let i = 0; i < courses.length; i++) {
            // eslint-disable-next-line
            if (courses[i].id != e.target.value) {
              newEnrollment.push(courses[i]);
            }
          }
          setCourse(newEnrollment);
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
      <h1
        className="mt-3"
        style={{ textAlignVertical: "center", textAlign: "center" }}
      >
        Enrollment Details
      </h1>
      <Row className="mt-2">
        <Col className="d-flex justify-content-md-start justify-content-sm-center">
          <h6>Student Name : {name}</h6>
        </Col>
      </Row>
      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Class Name</th>
              <th>Unenroll</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course.id}>
                <td>{index + 1}</td>
                <td style={{ whiteSpace: "nowrap" }}>{course.course_name}</td>
                <td>
                  <Button size="sm" variant="outline-danger" value={course.id} onClick={deleteHandler}>
                    Remove
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

export default EnrollmentDetails;
