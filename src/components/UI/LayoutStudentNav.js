import React from "react";
import NavigationBar from "./Navbar";
import { Outlet } from "react-router-dom";

const LayoutStudentNav = () => {
    return (
      <>
        <NavigationBar />
        <Outlet />
      </>
    );
  };

export default LayoutStudentNav;