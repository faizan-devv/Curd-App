import React, { Fragment } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import SignUpPage from "./Pages/SignUpPage";

const Router = (props) => (
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUpPage />} />
      <Route exact path="/" element={<LoginPage />} />
      <Route
        path="/Home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
