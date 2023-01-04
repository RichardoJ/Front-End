import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Button, Col, Row } from "react-bootstrap";

function TeacherModules() {
  const params = useParams();

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/modules/course/" + params.courseID);

      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }

      const responseData = await response.json();

      
      if(responseData.length === 0){
        setError("No modules found");
      }

      setModules(responseData);
      setLoading(false);
    };

    getData().catch((error) => {
      setLoading(false);
      if(Object.keys(modules).length === 0){
        setError("No modules found");
      }else{
        setError(error.message);
      }
      
    });
    
  // eslint-disable-next-line
  }, [params.courseID]);

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
      <section className="m-3">
        <Row className="align-items-center">
        <Col sm={8}>
          <h1>Teacher Modules</h1>
        </Col>
        <Col sm={4} className="d-flex justify-content-end">
          <Link to={"/modulesform/" + params.courseID}>
            <Button >Add Modules</Button>
          </Link>
        </Col>
      </Row>
        <p style={{ textAlignVertical: "center", textAlign: "center" }}>{error}</p>
      </section>
    );
  }

  const deleteHandler = (e) => {
    e.preventDefault();
    fetch('/modules/' + e.target.value, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.ok) {
          alert("Module Deleted successfully.");
          const newModules = [];
          for (let i = 0; i < modules.length; i++) {
            // eslint-disable-next-line
            if (modules[i].id != e.target.value) {
              newModules.push(modules[i]);
            }
          }
          setModules(newModules);
        }
      })
      .catch((err) => {
        alert('Error when deleting');
      });
  };

  return (
    <div className="m-3">
      <Row className="align-items-center">
        <Col sm={8}>
          <h1>Teacher Modules</h1>
        </Col>
        <Col sm={4} className="d-flex justify-content-end">
          <Link to={"/modulesform/" + params.courseID}>
            <Button>Add Modules</Button>
          </Link>
        </Col>
      </Row>
      <div className="table-responsive">
        <Table striped bordered hover size="xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Modules</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module, index) => (
              <tr key={module.id}>
                <td>{index + 1}</td>
                <td style={{ whiteSpace: "nowrap" }}>{module.modules_name}</td>
                <td>
                  <Button
                    size="sm"
                    color="danger"
                    value={module.id}
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

export default TeacherModules;
