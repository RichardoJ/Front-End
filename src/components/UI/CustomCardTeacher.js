import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function CustomCardTeacher(props) {

  const deleteHandler = (e) => {
    e.preventDefault();
    fetch('/course/' + props.id, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.ok) {
          alert("Course Deleted successfully.");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Start Date : {props.startDate}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          End Date : {props.endDate}
        </Card.Subtitle>
        <Card.Text>Link : {props.link}</Card.Text>
        <Link to={"/teacher/courses/" + props.id + "/modules"}>
          <Button variant="primary" className="me-1">Modules</Button>
        </Link>
        <Link to={"/student/courses/" + props.id}>
          <Button variant="primary" className="me-1">Add Assignment</Button>
        </Link>
        <Button variant="danger" onClick={deleteHandler}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default CustomCardTeacher;
