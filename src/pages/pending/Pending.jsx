import React, { useState } from "react";
import "./Pending.css";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
//import ProjectFilter from "../dashboard/ProjectFilter";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDocument } from "../../hooks/useDocument";
import ProjectSummary from "../project/ProjectSummary";

export default function Pending() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("electives");
  const [filter, setFilter] = useState("all");

  // const { error: projectError, document } = useDocument(
  //   "electives",
  //   "project_id_here"
  // );

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (filter) {
          case "all request":
            return true;
          case "IT":
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (u.uid === "csc") {
                console.log(u);
                assignedToMe = true;
              }
            });
            return assignedToMe;
          default:
            return true;
        }
      })
    : null;

  return (
    <div className="pending-page">
      <h2 className="page-title">Electives </h2>
      {error && <p className="error">{error}</p>}
      {/* {documents && <ProjectFilter changeFilter={changeFilter} />} */}
      <table className="project-table">
        <thead>
          <tr>
            <th>Elective Name</th>
            <th>Subject Code</th>
            <th>Seats Available</th>
            <th>Click to Enroll</th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.instructorName}</td>
                <td>{project.slots}</td>
                <td>
                  <ProjectSummary project={project} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* {document && <ProjectSummary project={document} />} */}
    </div>
  );
}
