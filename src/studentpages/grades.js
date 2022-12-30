import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AuthContext from "../store/auth-context";

function Grades() {
  const authCtx = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (localStorage.getItem("cobacourses") == null) {
        const response = await fetch('/enrollment/' + authCtx.idDB + '/student_course');
  
        if (!response.ok) {
          throw new Error("Something Went Wrong!");
        }
  
        const responseData = await response.json();
        localStorage.setItem("cobacourses", JSON.stringify(responseData));
      }

      const idCourses = [];
      const courses2 = JSON.parse(localStorage.getItem('cobacourses'));
      setCourses(courses2);
      // eslint-disable-next-line
      const courseList = courses2.map((course, idx) => (
        idCourses.push(course.id)  
      ));

      const responseTwo = await fetch("/answer/average/" + authCtx.idDB, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(idCourses),
      });

      if(!responseTwo.ok){
        throw new Error('Something Went Wrong!');
      }

      const responseTwoData = await responseTwo.json();

      setGrades(responseTwoData);
      setLoading(false)
    };

    getData().catch((error) => {
      setLoading(false);
      setError(error.message);
    })
  
  
  }, [authCtx.idDB]);

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

  // function renderTable(){
  //   const tdList=[];
  //   for (let i = 0; i < courses.length ; i++){
  //     tdList.push(<td>{courses[i].course_name}</td>)
  //     tdList.push(<td>{grades[i].score}</td>)
  //     tdList.push(<td>{grades[i].status}</td>)
  //   }
  // }

  return (
    <div className="m-3">
      <h1 className="mt-3" style={{ textAlignVertical: "center", textAlign: "center" }}>Grades</h1>

      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Total Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => (
              <tr key={grade.id}>
                <td>{index + 1}</td>
                <td style={{ whiteSpace: "nowrap" }}>{courses[index].course_name}</td>
                <td>
                  {grade.score}
                </td>
                <td>
                  {grade.status}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

    </div>
  );
}

export default Grades;
