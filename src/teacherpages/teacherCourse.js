import React, { useContext, useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomCardTeacher from "../components/UI/CustomCardTeacher";
import AuthContext from "../store/auth-context";

function TeacherCourses() {
  const [courses, setCourse] = useState([]);
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

      
      if(responseData.length === 0){
        setError("No courses found");
      }

      setCourse(responseData);
      setLoading(false);
    };

    getData().catch((error) => {
      setLoading(false);
      if(Object.keys(courses).length === 0){
        setError("No courses found");
      }else{
        setError(error.message);
      }
    });

    // eslint-disable-next-line
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
      <section className="mt-3">
        <Row className="align-items-center">
          <Col
            sm={12}
            md={9}
            className="d-flex justify-content-md-start justify-content-sm-center"
          >
            <h1>Course</h1>
          </Col>
          <Col
            sm={12}
            md={3}
            className="d-flex justify-content-md-end justify-content-sm-center"
          >
            <Link to={"/courseform"}>
              <Button>Add Course</Button>
            </Link>
          </Col>
        </Row>
        <p style={{ textAlignVertical: "center", textAlign: "center" }}>
          {error}
        </p>
      </section>
    );
  }

  const passDeletedId = (id) => {
    const newCourse = [];
    for (let i = 0; i < courses.length; i++) {
      // eslint-disable-next-line
      if(courses[i].id != id){
        newCourse.push(courses[i]);
      }
    }
    setCourse(newCourse);
  }

  const courseList = courses.map((course, idx) => (
    <div key={course.id}>
      <Col>
        <CustomCardTeacher
          id={course.id}
          name={course.course_name}
          startDate={course.start_date}
          endDate={course.end_date}
          link={course.course_link}
          passDeletedId={passDeletedId}
        ></CustomCardTeacher>
      </Col>
    </div>
  ));

  return (
    <div className="m-3">
      <Row className="align-items-center">
        <Col sm={12} md={9} className="d-flex justify-content-md-start justify-content-sm-center">
          <h1>Course</h1>
        </Col>
        <Col sm={12} md={3} className="d-flex justify-content-md-end justify-content-sm-center">
          <Link to={"/courseform"}>
            <Button>Add Course</Button>
          </Link>
        </Col>
      </Row>
      <Row xs={1} md={3} className="pt-3 pe-2">
        {courseList}
      </Row>
    </div>
  );
}

export default TeacherCourses;
