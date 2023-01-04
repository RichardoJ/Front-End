
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CustomCard from "../components/UI/CustomCard";
import AuthContext from "../store/auth-context";

function Courses() {
  const authCtx = useContext(AuthContext);
  const [courses, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/enrollment/' + authCtx.idDB + '/student_course');

      if(!response.ok){
        throw new Error('Something Went Wrong!');
      }

      const responseData = await response.json();

      
      if(responseData.length === 0){
        setError("No courses found");
      }

      localStorage.setItem('cobacourses', JSON.stringify(responseData));

      setCourse(responseData);
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

  const courseList = courses.map((course, idx) => (
    <div key={course.id}>
      <Col>
      <CustomCard 
            id={course.id}
            name={course.course_name}
            startDate={course.start_date}
            endDate={course.end_date}
            link={course.course_link}
          ></CustomCard>
    </Col>
    </div>
  ));

  return (
    <div className="m-3">
      <h2
        className="mt-3"
        style={{ textAlignVertical: "center", textAlign: "center" }}
      >
        Courses
      </h2>
      <Row xs={1} md={3} className="pt-3 pe-2">
        {courseList}
      </Row>
    </div>
  );
}

export default Courses;
