import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import AuthContext from "../store/auth-context";

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      if(authCtx.validation === null) {
        const responseTwo = await fetch("/auth/validate", {
          method:"POST",
          headers:{
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          },
          body: authCtx.token
        })

        if (!responseTwo.ok) {
          alert("Token not valid");
          authCtx.logout();
          throw new Error("Something Went Wrong!");
        }

        authCtx.valid();
      }
      setLoading(false);
    };

    getData().catch((error) => {
      setLoading(false);
      setError(error.message);
    });
  
  
  },[authCtx]);

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

  return (
    <div>
      <h2
        className="mt-3"
        style={{ textAlignVertical: "center", textAlign: "center" }}
      >
        Welcome to Learning Management System
      </h2>
      <Row xs={1} sm={3} className="m-2 d-flex">
        <Col sm={4}>
          <Card className="p-0 m-2">
            <Card.Header>Assignment</Card.Header>
            <Card.Body>
              <Card.Title>See Your Assignment Here!</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                May the Force be with you
              </Card.Subtitle>
              <Card.Text>There is no time for procrastination!</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card className="p-0 m-2">
            <Card.Header>Courses</Card.Header>
            <Card.Body>
              <Card.Title>See Your Courses Here!</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                May the Force be with you
              </Card.Subtitle>
              <Card.Text>
                This is where you can see your courses for the semester
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card className="p-0 m-2">
            <Card.Header>Grades</Card.Header>
            <Card.Body>
              <Card.Title>See Your Grades Here!</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                May the Force be with you
              </Card.Subtitle>
              <Card.Text>
                As long as you have done your best, it will be okay
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
