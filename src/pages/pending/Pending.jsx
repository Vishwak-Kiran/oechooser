import React, { useState, useEffect } from "react";
import "./Pending.css";
import { useCollection } from "../../hooks/useCollection";
import { useDocument } from "../../hooks/useDocument";
import ProjectSummary from "../project/ProjectSummary";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Pending() {
  const { user } = useAuthContext();
  const { documents: electiveDocuments, error: electiveError } =
    useCollection("electives");
  const { document: userDocument, error: userError } = useDocument(
    "users",
    user.uid
  );
  console.log(user.uid)
  const [filter, setFilter] = useState("all");
  // const [isChooseAllowed, setIsChooseAllowed] = useState(false);
  // const { documents : settingDoc, error: settingError } = useCollection("settings");
  // useEffect(() => {
  //   // Fetch the registration status from Firestore
  //   const fetchRegistrationStatus = async () => {
  //     try {
  //       // Assuming you have the ID of the document you want to find
  //       const targetDocumentId = "UVj7ky9i0QKLrumUWOl2";
        
        
  //       // Find the document by ID
        
  //       const targetDocument = settingDoc.find(
  //         (doc) => doc.id === targetDocumentId
  //         );
  //        // console.log(targetDocument);
  //       if (targetDocument) {
  //         const chooseAllowed = targetDocument.chooseAllow;
  //         // Perform any further actions based on the document data
  //         setIsChooseAllowed(chooseAllowed);
  //       } else {
  //         console.error(`Document with ID ${targetDocumentId} not found.`);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching registration status:", error);
  //     }
  //   };

  //   fetchRegistrationStatus();
  // }, [settingDoc]);

  useEffect(() => {
    // Fetch the user document when the component mounts or when the user changes
    // You can use your own logic or hook for fetching documents
    // This is just a placeholder, replace it with your actual hook or logic
    const fetchUserDocument = async () => {
      // Fetch the user document from the "users" collection
      const { document, error } = await yourUserDocumentFetchingFunction(
        user.uid
      );

      // Handle errors if needed
      if (error) {
        console.error("Error fetching user document:", error);
        return;
      }

      // Do something with the user document
      // For example, update the state with the user's department
      setFilter(document?.department || "all");
    };

    fetchUserDocument();
  }, [user]); // useEffect dependency on the user to re-fetch when user changes

  const yourUserDocumentFetchingFunction = async (uid) => {
    // Replace this with your actual logic or useDocument hook
    // to fetch the user document based on the UID
    const response = await fetch(`your-api-endpoint/users/${uid}`);
    const data = await response.json();
    return { document: data, error: null }; // Adjust based on your response structure
  };
  // console.log(isChooseAllowed)
  const projects = electiveDocuments
    ? electiveDocuments.filter((document) => {
        // console.log(
        //   document.assignedUsersList.some(
        //     (assignedUser) =>
        //       assignedUser?.uid.toLowerCase() ===
        //       userDocument?.department.toLowerCase()
        //   )
        // );
        switch (filter) {
          case "all request":
            return true;
          default:
            // Check if the user's department is not present in any assigned user's department
            return !document.assignedUsersList.some(
              (assignedUser) =>
                assignedUser?.uid.toLowerCase() ==
                userDocument?.department.toLowerCase()
            );
        }
      })
    : null;

  return userDocument?.department == "IT" && false ?  (
    <div className="pending-page">
      <h2 className="page-title">Electives </h2>
      {electiveError && <p className="error">{electiveError}</p>}
      {userError && <p className="error">{userError}</p>}
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
                <td className="td1">{project.name}</td>
                <td>{project.details}</td>
                <td>{project.slots}</td>
                <td>
                  <ProjectSummary project={project} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="signup-form">
      <h2>Chooser will open soon</h2>
    </div>
  );
}
