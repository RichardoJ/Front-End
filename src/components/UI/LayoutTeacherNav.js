import React from "react";
import { Outlet } from "react-router-dom";
import TeacherNavigationBar from "./TeacherNavbar";


const LayoutTeacherNav = () => {
    return (
      <>
        <TeacherNavigationBar />
        <Outlet />
      </>
    );
  };

export default LayoutTeacherNav