import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";

function Assignment(props) {
  const [assignments, setAssignment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusAssignment, setStatusAssignment] = useState([])
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      if (localStorage.getItem("courses") == null) {
        const response = await fetch(
          "/enrollment/" + authCtx.idDB + "/student_course/list"
        );
  
        if (!response.ok) {
          throw new Error("Something Went Wrong!");
        }
  
        const responseData = await response.json();
        localStorage.setItem("courses", JSON.stringify(responseData));
      }

      

      const idCourses = JSON.parse(localStorage.getItem('courses'));

      const responseTwo = await fetch("/assignment/list/course", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "same-origin",
        body: JSON.stringify(idCourses.id),
      });

      if (!responseTwo.ok) {
        throw new Error("Something Went Wrong!");
      }

      const responseDataTwo = await responseTwo.json();

      
      if(responseDataTwo.length === 0){
        setError("No assignment found");
      }

      const arr = [];
      responseDataTwo.map((dataId) => arr.push(dataId.id))
      setAssignment(responseDataTwo);

      const responseThree = await fetch("/answer/student/" + authCtx.idDB, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "same-origin",
        body: JSON.stringify(arr),
      })

      if (!responseThree.ok) {
        throw new Error("Something Went Wrong!");
      }

      const responseDataThree = await responseThree.json();
      setStatusAssignment(responseDataThree);
      setLoading(false);
    };

    getData().catch((error) => {
      setLoading(false);
      if(Object.keys(assignments).length === 0){
        setError("No assignments found");
      }else{
        setError(error.message);
      }
    });
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCtx.idDB]);

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

  function renderStatus(Id){
    const tdList=[]
    for(let i = 0; i < statusAssignment.length; i++){
      if (
        statusAssignment[i] != null &&
        statusAssignment[i].assignment_id_answer === Id
      ) {
        tdList.push(<td>{statusAssignment[i].assignment_score}</td>);
        if (statusAssignment[i].assignment_status === 2) {
          tdList.push(<td>Graded</td>);
        } else if (statusAssignment[i].assignment_status === 1) {
          tdList.push(<td>Submitted</td>);
        } else if (statusAssignment[i].assignment_status === 0) {
          tdList.push(<td>Not Submitted</td>);
        }
      }
    }
    if(tdList.length === 0){
      tdList.push(<td>-</td>);
      tdList.push(<td>Not Submitted</td>);
    }
    return tdList;
  }

  return (
    <div className="m-3">
      <h1
        className="mt-3"
        style={{ textAlignVertical: "center", textAlign: "center" }}
      >
        Assignment
      </h1>
      <div className="table-responsive mt-5">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Assignment Name</th>
              <th>Assignment Score</th>
              <th>Assignment Status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={assignment.id}>
                <td>{index + 1}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={"/student/assignment/" + assignment.id}
                    state={{
                      assignmentName: assignment.assignment_name,
                      assignmentId: assignment.id,
                      assignmentDate: assignment.deadline,
                      assignmentDetails: assignment.details,
                    }}
                  >
                    {assignment.assignment_name}
                  </Link>
                </td>
                {renderStatus(assignment.id)}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Assignment;
