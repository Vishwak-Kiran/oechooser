import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Main from "./components/main";
import Navbar from "./components/sidebar/navbar";
import Pending from "../src/pages/pending/Pending.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import Download from "./pages/download/Download";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      <div className="designCard">
        <div className="designCard-content">
          {authIsReady && (
            <Router>
              {user && <Navbar />}
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Pending} />
                  <Route
                    path="/login"
                    render={() =>
                      !user ? <Login /> : <Redirect to="/pending" />
                    }
                  />
                  <Route
                    path="/signup"
                    render={() =>
                      !user ? <Signup /> : <Redirect to="/pending" />
                    }
                  />
                  <Route
                    path="/particles"
                    render={() => !user && <Particles />}
                  />
                  <Route
                    path="/request"
                    render={() =>
                      user && user.uid === "mHgVONortQYvsoncQuk6rMRIxIY2" ? (
                        <Create />
                      ) : (
                        <Redirect to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/pending"
                    render={() =>
                      user ? <Pending /> : <Redirect to="/login" />
                    }
                  />
                  {/* <Route
                    path="/dashboard"
                    render={() => (user ? <Dashboard /> : <Redirect to="/login" />)}
                  /> */}
                  <Route
                    path="/download"
                    render={() =>
                      user && user.uid === "mHgVONortQYvsoncQuk6rMRIxIY2" ? (
                        <Download />
                      ) : (
                        <Redirect to="/login" />
                      )
                    }
                  />
                  {/* <Route path="/success" component={<Success />} /> */}
                  <Route path="/electives/:id" component={<Project />} />
                </Switch>
              </div>
            </Router>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
