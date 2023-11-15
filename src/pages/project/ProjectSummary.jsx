import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useLogout } from "../../hooks/useLogout";
import firebase from "firebase/app";
import "firebase/firestore";

export default function ProjectSummary({ project }) {
  const { addDocument } = useFirestore(project.name);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  let history = useHistory();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleApprove = async () => {
    setIsConfirming(true);

    const shouldEnroll = window.confirm("Are you sure you want to enroll?");

    setIsConfirming(false);

    if (shouldEnroll) {
      if (project.slots > 0) {
        try {
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
          await userRef.update({ isEnroll: true });

          alert("You have successfully enrolled");
          logout(); // Log out the user immediately upon successful enrollment confirmation
        } catch (error) {
          console.error("Error enrolling:", error);
          alert("An error occurred while enrolling. Please try again.");
        }
      } else {
        alert("No available slots for enrollment.");
      }
    } else {
      console.log("Enrollment canceled.");
    }
  };

  return (
    <div>
      <button className="btn" onClick={handleApprove} disabled={isConfirming}>
        Enroll
      </button>

      {isConfirming && (
        <div className="overlay">
          <div className="confirmation-box">
            <p>Confirming...</p>
          </div>
        </div>
      )}
    </div>
  );
}
