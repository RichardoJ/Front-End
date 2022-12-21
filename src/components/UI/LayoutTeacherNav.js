import React from "react";
import { Outlet } from "react-router-dom";
import TeacherNavigationBar from "./TeacherNavbar";


export default () => {
    return (
      <>
        <TeacherNavigationBar />
        <Outlet />
      </>
    );
  };