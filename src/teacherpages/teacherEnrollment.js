import React, {useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function TeacherEnrollment() {
  const [students, setStudent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/student");

      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }

      const responseData = await response.json();

      setStudent(responseData);
      setLoading(false);
    };

    getData().catch((error) => {
      setLoading(false);
      if(Object.keys(students).length === 0){
        setError("No students found");
      }else{
        setError(error.message);
      }
    });
    
  // eslint-disable-next-line
  },[]);

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
        <Col
          sm={12}
          md={9}
          className="d-flex justify-content-md-start justify-content-sm-center"
        >
          <h1>Enrollment</h1>
        </Col>
        <Col
          sm={12}
          md={3}
          className="d-flex justify-content-md-end justify-content-sm-center"
        >
          <Link to={"/enrollmentform"}>
            <Button>Enrollment Form</Button>
          </Link>
        </Col>
      </Row>
      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Student Name</th>
              <th>Enrollment Details</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td style={{ whiteSpace: "nowrap" }}>{student.student_name}</td>
                <td>
                  <Link
                    to={"/teacher/enrollment/" + student.id + "/details"}
                    state={{
                      studentName: student.student_name,
                    }}
                  >
                    <Button size="sm" color="danger">
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TeacherEnrollment;