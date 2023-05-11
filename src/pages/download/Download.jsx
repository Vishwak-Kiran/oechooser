import React, { useRef, useState } from "react";

import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "../dashboard/ProjectFilter";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Download() {
  const { user } = useAuthContext();
  const [OE, setOE] = useState("Machine Learning");
  const [field, setfield] = useState(false);
  const { documents, error } = useCollection("Web Design and Management");
  const [filter, setFilter] = useState({});
  const componentRef = useRef();

  const changeFilter = () => {
    documents.filter((document) => {
      //  console.log(document.students[1]);
      setfield(true);
      // document.students((u) => {
      //   // if (STUDENTS === "IT") {
      //   //   return u;
      //   // }
      //   console.log(u);
      // });
    });
  };
  return (
    <div
      style={{
        width: "100vw",
        alignItems: "center",
        justifyItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {console.log("hello")} <div ref={componentRef}></div>
      <h1 style={{ fontSize: "10rem" }}>Gokul</h1>
      <button
        style={{ width: "10rem", height: "10rem" }}
        className="btn"
        onClick={changeFilter}
      >
        click to print
      </button>
      <h1>the students in {OE} </h1>
      {
        field &&
          documents &&
          documents.map((document) => (
            <ul>
              <p>{document.students[1]}</p>
              <p>{document.students[2]}</p>
            </ul>
          ))
        // <h1>the students in {documents[0].students[1]}</h1>
      }
      {/* {console.log(field, documents)}
      {field &&
        documents.map((document) => {
          {
            console.log(document.students[1]);
          }
          <div>
            {console.log("works 2x", document.students[1])}

            <ul>{document.students[1]}</ul>
          </div>;
        })} */}
    </div>
  );
}
