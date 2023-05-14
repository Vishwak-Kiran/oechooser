import "./ProjectList.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import ProjectSummary from "../pages/project/ProjectSummary";

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

              <ProjectSummary project={project} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
