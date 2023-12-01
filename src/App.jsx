import React, { useEffect, useState } from "react";
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
import firebase from "firebase/app";
import "firebase/firestore";
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
import { useLogout } from "./hooks/useLogout";

function App() {
  const { authIsReady, user } = useAuthContext();
  const [isEnroll, setIsEnroll] = useState(null); // State to store isEnroll valu
  const { logout, isPending } = useLogout();

  useEffect(() => {
    if (authIsReady && user) {
      const firestore = firebase.firestore();
      const userRef = firestore.collection("users").doc(user.uid);

      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            // User document exists, fetch isEnroll value
            const userData = doc.data();
            setIsEnroll(userData.isEnroll);
            if (isEnroll) {
              window.alert("You have already enrolled");
              logout();
            }
          } else {
            // User document does not exist
            setIsEnroll(false); // Assuming default isEnroll value is false
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsEnroll(false); // Handle error by assuming default isEnroll value is false
        });
    }
  }, [authIsReady, user, isEnroll, logout]);

  return (
    <div className="App">
      <div className="designCard">
        <div className="designCard-content">
          {authIsReady && (
            <Router>
              {user && <Navbar />}

              <div className="container">
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={() => (user ? <Pending /> : <Signup />)}
                  />
                  <Route
                    path="/login"
                    component={() => (!user ? <Login /> : <Pending />)}
                  />
                  <Route
                    path="/signup"
                    component={() => (!user ? <Signup /> : <Pending />)}
                  />
                  <Route
                    path="/particles"
                    component={() => !user && <Particles />}
                  />
                  <Route
                    path="/request"
                    component={() =>
                      user && user.uid === "mHgVONortQYvsoncQuk6rMRIxIY2" ? (
                        <Create />
                      ) : (
                        <Login />
                      )
                    }
                  />
                  <Route
                    path="/pending"
                    component={() => (user ? <Pending /> : <Login />)}
                  />
                  <Route
                    path="/download"
                    component={() =>
                      user && user.uid === "mHgVONortQYvsoncQuk6rMRIxIY2" ? (
                        <Download />
                      ) : (
                        <Login />
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
