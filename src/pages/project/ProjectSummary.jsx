import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useLogout } from "../../hooks/useLogout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProjectSummary({ project }) {
  const { addDocument } = useFirestore(project.name);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  let navigate = useNavigate();
  const [student, setStudent] = useState({});
  const handleApprove = (e) => {
    e.preventDefault();

    addDocument({
      name: project.name,
      Maxslots: project.slots,
      students: [user.uid, user.email, user.displayName],
    });
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
      navigate("/");
      logout();
      window.location.reload();
    }, 1200);
  };

  return (
    <button className="btn" onClick={handleApprove}>
      Enroll
    </button>
  );
}
