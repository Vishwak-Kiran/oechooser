import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "../dashboard/ProjectFilter";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Download.css";

export default function Download() {
  const { user } = useAuthContext();
  const [field, setfield] = useState(false);
  const { documents, error } = useCollection("Web Design and Management");
  const [OE, setOE] = useState("Machine Learning");
  const [filter, setFilter] = useState({});
  const componentRef = useRef();

  const changeFilter = () => {
    documents.filter((document) => {
      setfield(true);
    });
  };

  return (
    <div className="download-container">
      <h1 className="download-header">the students in {OE} </h1>
      <button className="btn download-btn" onClick={changeFilter}>
        Show all enrolled
      </button>
      {field && documents && (
        <table className="download-table" ref={componentRef}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Student Name</th>
            </tr>
          </thead>

          {documents.map((document) => (
            <tbody>
              <tr key={document.id}>
                <td>{document.students[1]}</td>
                <td>{document.students[2]}</td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
      <ReactToPrint
        trigger={() => (
          <button className="btn download-btn">Print this out!</button>
        )}
        content={() => componentRef.current}
      />
    </div>
  );
}
