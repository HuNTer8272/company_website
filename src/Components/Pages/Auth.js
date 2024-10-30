import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from '../auth/Login.js';
import "../../auth/aut.css";
function Auth() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route
              exact
              path="/"
            />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    );
}

export default Auth;