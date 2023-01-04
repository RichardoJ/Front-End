import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AuthContext from '../../store/auth-context';
import './TeacherNavbar.css'

function TeacherNavigationBar() {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    //Redirect
  };

  return (
    <Navbar className='color-nav' variant='dark' expand="lg">
      <Container  fluid>
        <Navbar.Brand to="/teacher/home">Teacher</Navbar.Brand>
        <Navbar.Toggle aria-controls="collapse-navbar" />
        <Navbar.Collapse id="collapse-navbar">
          <Nav className="justify-content-end flex-grow-1 align-items-center">
            <Nav.Link to="/teacher/home" as={Link}>Home</Nav.Link>
            <Nav.Link to="/teacher/students" as={Link}>Students</Nav.Link>
            <Nav.Link to="/teacher/assignments" as={Link}>Assignments</Nav.Link>
            <Nav.Link to="/teacher/courses" as={Link}>Courses</Nav.Link>
            <Nav.Link to="/teacher/enrollment" as={Link}>Enrollment</Nav.Link>
            <Nav.Link to="/teacher/grading" as={Link}>Grading</Nav.Link>
            <Nav.Link to="/" as={Link}><Button onClick={logoutHandler}>Log Out</Button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TeacherNavigationBar;