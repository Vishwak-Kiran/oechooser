import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/main";
import Navbar from "./components/sidebar/navbar";
import Pending from "../src/pages/pending/Pending.jsx";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";
import Create from "./pages/create/Create";
// import Form from "./pages/profile/Form";
import Particles from "./components/ParticlesBackground";
import ParticlesBackground from "./components/ParticlesBackground";
function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Navbar />}
          <div className="container">
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route
                path="/login"
                element={
                  !user ? <Login /> : <Navigate to="/profile"></Navigate>
                }
              ></Route>
              <Route path="/signup" element={!user && <Signup />}></Route>
              <Route path="/particles" element={!user && <Particles />}></Route>

              <Route
                path="/request"
                element={user ? <Create /> : <Login />}
              ></Route>

              <Route
                path="/pending"
                element={user ? <Pending /> : <Login />}
              ></Route>
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Login />}
              ></Route>
              {/* <Route path="/success" element={<Success />}></Route> */}
              <Route path="/electives/:id" element={<Project />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
