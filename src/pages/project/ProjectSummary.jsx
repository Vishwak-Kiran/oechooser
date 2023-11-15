import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useLogout } from "../../hooks/useLogout";
import firebase from "firebase/app";
import "firebase/firestore";
import styles from "./ProjectSummary.module.css"; // Import the CSS module

export default function ProjectSummary({ project }) {
  const { addDocument } = useFirestore(project.name);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  let history = useHistory();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleApprove = async () => {
    if (isEnrolled || isConfirming) {
      return; // Disable button if already enrolled or confirming
    }

    setIsConfirming(true);

    const shouldEnroll = window.confirm("Are you sure you want to enroll?");

    setIsConfirming(false);

    if (shouldEnroll) {
      setIsEnrolled(true); // Set isEnrolled to true immediately

      try {
        if (project.slots > 0) {
          await addDocument({
            name: project.name,
            Maxslots: project.slots - 1,
            students: [user.uid, user.email, user.displayName],
            projectId: project.id,
          });

          const firestore = firebase.firestore();
          const electiveRef = firestore.collection("electives").doc(project.id);

          await firestore.runTransaction(async (transaction) => {
            const electiveDoc = await transaction.get(electiveRef);
            if (!electiveDoc.exists) {
              throw new Error("Elective document does not exist!");
            }

            const electiveData = electiveDoc.data();
            const updatedSlots = electiveData.slots - 1;

            if (updatedSlots >= 0) {
              transaction.update(electiveRef, { slots: updatedSlots });
            } else {
              alert("No available slots for enrollment in this elective.");
              return;
            }
          });

          const userRef = firestore.collection("users").doc(user.uid);
          await userRef.update({
            isEnroll: true,
            elective: project.name,
          });

          // alert("You have successfully enrolled");
          logout(); // Log out the user immediately upon successful enrollment confirmation
        } else {
          alert("No available slots for enrollment.");
        }
      } catch (error) {
        console.error("Error enrolling:", error);
        alert("An error occurred while enrolling. Please try again.");
      }
    }
  };

  return (
    <div>
      <button className="btn" onClick={handleApprove} disabled={isEnrolled}>
        Enroll
      </button>

      {isEnrolled && (
        <div className={styles.overlay}>
          <div className="confirmation-box">
            <p>You have successfully enrolled</p>
          </div>
        </div>
      )}
    </div>
  );
}
