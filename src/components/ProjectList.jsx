import "./ProjectList.css";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";


export default function ProjectList({ projects }) {
  useEffect(() => {
    const handleMouseMove = (e) => {
      for (const card of document.getElementsByClassName("card")) {
        const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };

    const cards = document.getElementById("cards");
    cards.addEventListener("mousemove", handleMouseMove);

    return () => {
      cards.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div id="cards">
      {projects.length === 0 && <p>No request yet</p>}
      
      {projects.map((project) => (
        <Link to={`/electives/${project.id}`} key={project.id}>
          <div class="card">
            <div class="card-content">
              <div class="card-image">
                <h3>{project.name}</h3>
              </div>
              <div class="card-info-wrapper">
                <div class="card-info">
                  <i class="fa-duotone fa-apartment"></i>
                  <div class="card-info-title">
                    <h3>Slots {project && project.slots}</h3>
                    <h4>Course details: {project.details}</h4>
                    <div className="assigned-to">
                      {project.assignedUsersList.map((user) => (
                        <li key={user.uid}>
                          <h> {user && user.Name}</h>
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        // <Link to={`/electives/${project.id}`} key={project.id}>
        //   <h4> {project.name}</h4>
        //   <h5>Slots {project && project.slots}</h5>
        //   <p>Course details: {project.details}</p>
        //   {console.log(project)}
        //   <div className="assigned-to">
        //     {project.assignedUsersList.map((user) => (
        //       <li key={user.uid}>
        //         {/* <Avatar src={user.photoURL} /> */}
        //         <h> {user && user.Name}</h>
        //       </li>
        //     ))}
        //   </div>
        // </Link>
      ))}
    </div>
  );
}
