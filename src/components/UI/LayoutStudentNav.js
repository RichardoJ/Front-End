import React from "react";
import NavigationBar from "./Navbar";
import { Outlet } from "react-router-dom";

export default () => {
    return (
      <>
        <NavigationBar />
        <Outlet />
      </>
    );
  };