import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Loginpage/login";
import Course from "./pages/coursepage/course";
import Leaderboard from "./pages/leader/leaderboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/CourseStructure" element={<Course />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
};

export default AppRoutes;
