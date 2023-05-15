import { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import Select from "react-select";

import styles from "./Create.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

import { timestamp } from "../../firebaseDatabase/config";
import { useHistory } from "react-router-dom";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  let history = useHistory();
  const { documents } = useCollection("departments");
  const [users, setUsers] = useState([]);
  const [slots, setSlots] = useState("");
  const { addDocument, response } = useFirestore("electives");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  const [interest, setInterest] = useState("");
  const [tenure, setTenure] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    if (documents) {
      setUsers(
        documents.map((user) => {
          return { value: { ...user, id: user.label }, label: user.dept_name };
        })
      );
    }
  }, [documents]);
  // documents.map((user) => {
  //   return { value: { ...user, id: user.id }, label: user.displayName };
  // })
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // if (!category) {
    //   setFormError('Please select a  category.')
    //   return
    // }
    if (assignedUsers.length < 1) {
      setFormError("Please select the departments of the elective");
      return;
    }

    // const createdBy = {
    //   displayName: user.displayName,
    //   photoURL: user.photoURL,
    //   id: user.uid,
    // };
    const assignedUsersList = assignedUsers.map((u) => {
      return {
        Name: u.value.dept_name,
        //  photoURL: u.value.photoURL,
        uid: u.value.label,
      };
    });

    const project = {
      slots,
      name,
      details,
      //dueDate: timestamp.fromDate(new Date(dueDate)),

      // comments: [],
      assignedUsersList,
      // createdBy,
    };

    await addDocument(project);
    if (!response.error) {
      history.push("/");
    }
  };

  //   useEffect(() => {
  //     if (response.success) {
  //       setName("");
  //       setDueDate("");
  //       setDetails("");
  //       setAssignedUsers([]);
  //       setTenure("");
  //       setInterest("");
  //     }
  //   }, [response.success]);

  return (
    <div className={styles.form}>
      <div className={styles.bg}>
        <h2 className={styles.title}>Add a New Open Elective</h2>
        <hr></hr>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label>
                <span>Number of slots:</span>
                <input
                  required
                  type="number"
                  onChange={(e) => setSlots(e.target.value)}
                  value={slots}
                />
              </label>
            </li>
            <li>
              <label>
                <span>Elective Name:</span>
                <input
                  type="text"
                  required
                  className={styles.inp1}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              </label>
            </li>
            <li>
              <label>
                <span>Details:</span>
                <textarea
                  className={styles.textarea}
                  required
                  onChange={(e) => setDetails(e.target.value)}
                  value={details}
                ></textarea>
              </label>
            </li>
            <li>
              <label>
                <span>Departments it belong to:</span>
                <Select
                  onChange={(option) => setAssignedUsers(option)}
                  options={users}
                  isMulti
                  className={styles.selcet}
                />
              </label>
            </li>
          </ul>

          <button className="btn">Add Elective</button>

          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
    </div>
  );
}
