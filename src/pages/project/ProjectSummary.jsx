import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useLogout } from "../../hooks/useLogout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";
import "firebase/firestore";

export default function ProjectSummary({ project }) {
  const { addDocument } = useFirestore(project.name);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  let history = useHistory();
  const [student, setStudent] = useState({});

  const handleApprove = async () => {
    const shouldEnroll = window.confirm("Are you sure you want to enroll?");

    if (shouldEnroll) {
      // User confirmed enrollment
      if (project.slots > 0) {
        try {
          // Add the student's enrollment to Firestore
          await addDocument({
            name: project.name,
            Maxslots: project.slots - 1, // Reduce the max slot count
            students: [user.uid, user.email, user.displayName],
            projectId: project.id,
          });

          // Update the project's slots in the "electives" collection
          const firestore = firebase.firestore();
          const electiveRef = firestore.collection("electives").doc(project.id);
          console.log(project);
          // Replace "project.projectId" with the actual ID of the elective document
          await firestore.runTransaction(async (transaction) => {
            const electiveDoc = await transaction.get(electiveRef);
            if (!electiveDoc.exists) {
              throw new Error("Elective document does not exist!");
            }

            const electiveData = electiveDoc.data();
            const updatedSlots = electiveData.slots - 1;

            // Check if there are available slots in the elective
            if (updatedSlots >= 0) {
              transaction.update(electiveRef, { slots: updatedSlots });
            } else {
              toast.error(
                "No available slots for enrollment in this elective.",
                {
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  position: toast.POSITION.TOP_CENTER,
                }
              );
              return; // Don't proceed with enrollment
            }
          });

          // Update the UI with the new project slots
          // You can use a callback function or another method to achieve this
          // Example: updateProject({ ...project, slots: project.slots - 1 });

          toast("You have successfully enrolled", {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            position: toast.POSITION.TOP_CENTER,
          });

          setTimeout(function () {
            history.push("/");
            logout();
            window.location.reload();
          }, 1200);
        } catch (error) {
          console.error("Error enrolling:", error);
          toast.error("An error occurred while enrolling. Please try again.", {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else {
        toast.error("No available slots for enrollment.", {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      // User clicked "Cancel" in the confirmation dialog
      console.log("Enrollment canceled.");
    }
  };

  return (
    <button className="btn" onClick={handleApprove}>
      Enroll
    </button>
  );
}
