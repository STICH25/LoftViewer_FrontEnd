import { useState, useEffect, useRef } from "react";
import LogIn from "../components/Login.jsx";
import Header from "../components/Header.jsx";

const LogInPage = () => {
  return (
    <div className="body">
      <Header />
      <LogIn />
    </div>
  );
};

export default LogInPage;
