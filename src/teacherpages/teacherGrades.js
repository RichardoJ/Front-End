import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function GradingPage() {
    const [students, setStudents] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
        const response = await fetch("/student");

        if (!response.ok) {
          throw new Error("Something Went Wrong!");
        }

        const responseData = await response.json();

      setStudents(responseData);

      const responseTwo = await fetch("/answer/status/1");

      if(!responseTwo.ok){
        throw new Error("Something Went Wrong!");
      }

      const responseDataTwo = await responseTwo.json();

      if(responseDataTwo.length === 0){
        setError("No work to do left :D");
      }

      setAnswers(responseDataTwo);
      setLoading(false);
    };

    getData().catch((error) => {
      setLoading(false);
      if(Object.keys(answers).length === 0){
        setError("No Work to do for now");
      }else{
        setError(error.message);
      }
    });

    // eslint-disable-next-line
  },[]);

  function renderName(student_Id){
    const tdList=[]
    for(let i = 0; i < students.length; i++){
      if(students[i].id === student_Id){
        tdList.push(<td style={{ whiteSpace: "nowrap" }}>{students[i].student_name}</td>)
      }
    }
    return tdList;
  }

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
        Grading Page
      </h1>
      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Student Name</th>
              <th>Answer Links</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer, index) => (
              <tr key={answer.id}>
                <td>{index + 1}</td>
                {renderName(answer.student_id_answer)}
                <td style={{ whiteSpace: "nowrap" }}>{answer.blob_link}</td>
                <td>
                  <Link
                    to={"/teacher/grading/form"}
                    state={{
                      id: answer.id,
                      assignment_id: answer.assignment_id_answer
                    }}
                  >
                    <Button size="sm" color="outline-primary">
                      Grade
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

export default GradingPage;