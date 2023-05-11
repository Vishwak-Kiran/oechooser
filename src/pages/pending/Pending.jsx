import React, { useState } from "react";
import "./Pending.css";

import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "../dashboard/ProjectFilter";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Pending() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("electives");
  const [filter, setFilter] = useState("all");

  {
    console.log("works");
    // console.log(documents);
  }
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
            // if (document.uid === "IT") {
            //   assignedToMe = true;
            // }
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
      {documents && <ProjectFilter changeFilter={changeFilter} />}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
}
