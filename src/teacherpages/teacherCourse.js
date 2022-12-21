import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomCardTeacher from "../components/UI/CustomCardTeacher";

function TeacherCourses() {
  const [courses, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/course");
      //CHANGE : GET DATA FROM TABLE TEACHER_COURSE

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
  }, [courses]);

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

  const courseList = courses.map((course, idx) => (
    <div key={course.id}>
      <Col>
        <CustomCardTeacher
          id={course.id}
          name={course.course_name}
          startDate={course.start_date}
          endDate={course.end_date}
          link={course.course_link}
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
