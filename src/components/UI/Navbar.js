import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

function NavigationBar() {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    //Redirect
  };

  return (
    <Navbar className='color-nav' variant='dark' expand="lg">
      <Container  fluid>
        <Navbar.Brand to="/student/home">Learning MS</Navbar.Brand>
        <Navbar.Toggle aria-controls="collapse-navbar" />
        <Navbar.Collapse id="collapse-navbar">
          <Nav className="justify-content-end flex-grow-1 align-items-center">
            <Nav.Link to="/student/home" as={Link} id="studentHome">Home</Nav.Link>
            <Nav.Link to="/student/grades" as={Link} id="studentGrades">Grades</Nav.Link>
            <Nav.Link to="/student/assignment" as={Link} id="studentAssignments">Assignments</Nav.Link>
            <Nav.Link to="/student/courses" as={Link} id="studentCourses">Courses</Nav.Link>
            <Nav.Link to="/student/profile" as={Link} id="studentProfile">Profile</Nav.Link>
            <Nav.Link to="/" as={Link}><Button onClick={logoutHandler} id="btnLogout">Log Out</Button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;