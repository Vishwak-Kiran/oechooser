import "./ProjectList.css";

import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export default function ProjectList({ projects }) {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No request yet</p>}
      {projects.map((project) => (
        <Link to={`/electives/${project.id}`} key={project.id}>
          <h4> {project.name}</h4>
          <h5>Slots {project && project.slots}</h5>
          <p>Course details: {project.details}</p>
          {console.log(project)}
          <div className="assigned-to">
            {project.assignedUsersList.map((user) => (
              <li key={user.uid}>
                {/* <Avatar src={user.photoURL} /> */}
                <h> {user && user.Name}</h>
              </li>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
