import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Assignment from "./studentpages/assignment";
import Courses from "./studentpages/courses";
import Grades from "./studentpages/grades";
import Home from "./studentpages/Home";
import Modules from "./studentpages/modules";
import TeacherHome from "./teacherpages/teacherHome";
import ModuleForm from "./teacherpages/Form/ModuleForm";
import AssignmentForm from "./teacherpages/Form/AssignmentForm";
import CourseForm from "./teacherpages/Form/CourseForm";
import EnrollmentForm from "./teacherpages/Form/EnrollmentForm";
import AuthForm from "./login/auth";
import LayoutStudentNav from "./components/UI/LayoutStudentNav";
import LayoutTeacherNav from "./components/UI/LayoutTeacherNav";
import AssignmentStudentUpload from "./studentpages/assignment_upload";
import TeacherStudent from "./teacherpages/teacherStudent";
import TeacherAsssignment from "./teacherpages/teacherAssignment";
import TeacherCourses from "./teacherpages/teacherCourse";
import StudentForm from "./teacherpages/Form/StudentForm";
import UserProfile from './studentpages/userProfile';
import TeacherModules from './teacherpages/teacherModules';
import { useContext } from 'react';
import AuthContext from './store/auth-context';
import TeacherEnrollment from './teacherpages/teacherEnrollment';

function App() {
  const authCtx = useContext(AuthContext);
  
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<AuthForm />} />
          {authCtx.isLoggedIn && authCtx.role === "STUDENT" && <Route element={<LayoutStudentNav />}>
            {authCtx.isLoggedIn && authCtx.role === "STUDENT" && <Route path="/student/home" element={<Home />} />}
            {authCtx.isLoggedIn && authCtx.role === "STUDENT" && <Route path="/student/grades" element={<Grades />} />}
            {authCtx.isLoggedIn && authCtx.role === "STUDENT" && <Route path="/student/assignment" element={<Assignment />} />}
            {authCtx.isLoggedIn && authCtx.role === "STUDENT" && <Route path="/student/assignment/:assignmentID" element={<AssignmentStudentUpload />} />}
            {authCtx.isLoggedIn && authCtx.role === "STUDENT" && <Route path="/student/courses" element={<Courses />} />}
            {authCtx.isLoggedIn && authCtx.role === "STUDENT" && <Route path="/student/courses/:courseID" element={<Modules />} />}
            {authCtx.isLoggedIn && authCtx.role === "STUDENT" && <Route path="/student/profile" element={<UserProfile />} />}
          </Route>}
          <Route element={<LayoutTeacherNav/>}>
            {authCtx.isLoggedIn && authCtx.role === "TEACHER" &&  <Route path="/teacher/home" element={<TeacherHome />} />}
            {authCtx.isLoggedIn && authCtx.role === "TEACHER" &&  <Route path="/teacher/students" element={<TeacherStudent />} />}
            {authCtx.isLoggedIn && authCtx.role === "TEACHER" &&  <Route path="/teacher/assignments" element={<TeacherAsssignment />} />}
            {authCtx.isLoggedIn && authCtx.role === "TEACHER" &&  <Route path="/teacher/courses" element={<TeacherCourses />} />}
            {authCtx.isLoggedIn && authCtx.role === "TEACHER" &&  <Route path="/teacher/courses/:courseID/modules" element={<TeacherModules />} />}
            {authCtx.isLoggedIn && authCtx.role === "TEACHER" &&  <Route path="/teacher/enrollment" element={<TeacherEnrollment />} />}
            {authCtx.isLoggedIn && authCtx.role === "TEACHER" &&  <Route path="/studentform" element={<StudentForm />} />}
            {authCtx.isLoggedIn && authCtx.role === "TEACHER" &&  <Route path="/modulesform/:courseID" element={<ModuleForm />} />}
            {authCtx.isLoggedIn && authCtx.role === "TEACHER" &&  <Route path="/assignmentform" element={<AssignmentForm />} />}
            {authCtx.isLoggedIn && authCtx.role === "TEACHER" &&  <Route path="/courseform" element={<CourseForm />} />}
            {authCtx.isLoggedIn && authCtx.role === "TEACHER" &&  <Route path="/enrollmentform" element={<EnrollmentForm />} />}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
