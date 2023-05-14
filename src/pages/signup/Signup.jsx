import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

import styles from "./Signup.module.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [department, setDepartment] = useState("CSC");
  const [year, setYear] = useState("3");
  const [semester, setSemester] = useState("5");
  const [section, setSection] = useState("A");
  const [registerNumber, setRegisterNumber] = useState("");

  const { signup, isPending, error } = useSignup();
  //  const [thumbnail, setThumbnail] = useState(null);
  // const [aadhaar, setAadhaar] = useState(null);
  // const [thumbnailError, setThumbnailError] = useState(null);
  // const [aadhaarError, setAadhaarError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault(department);
    signup(
      email,
      password,
      displayName,
      registerNumber,
      department,
      year,
      section,
      semester
    );
    //console.log(thumbnail);
  };
  // const handleFileChange = (e) => {
  //   // setThumbnail(null);
  //   let selected = e.target.files[0];
  //   console.log(selected);

  //   if (!selected) {
  //     setThumbnailError("Please select a file");
  //     return;
  //   }
  //   if (!selected.type.includes("image")) {
  //     setThumbnailError("Selected file must be an image");
  //     return;
  //   }
  //   if (selected.size > 1000000) {
  //     setThumbnailError("Image file size must be less than 100kb");
  //     return;
  //   }

  //  // setThumbnailError(null);
  //   //  setThumbnail(selected);
  //   console.log("thumbnail updated");
  // };

  // const handleAadhaarChange = (e) => {
  //   //   setAadhaar(null);
  //   let selected = e.target.files[0];
  //   console.log(selected);

  //   if (!selected) {
  //     setAadhaarError("Please select a file");
  //     return;
  //   }
  //   if (!selected.type.includes("image")) {
  //     setAadhaarError("Selected file must be an image");
  //     return;
  //   }
  //   if (selected.size > 1000000) {
  //     setAadhaarError("Image file size must be less than 100kb");
  //     return;
  //   }

  //   setAadhaarError(null);
  //   //   setAadhaar(selected);
  //   console.log("Aadhaar updated");
  // };

  return (
    <form onSubmit={handleSubmit} className={styles["signup-form"]}>
      <h2>Sign Up</h2>
      <label>
        <span>Full Name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Register Number:</span>
        <input
          type="text"
          onChange={(e) => setRegisterNumber(e.target.value)}
          value={registerNumber}
        />
      </label>
      <label>
        <span>Department:</span>
        <select
          name="Department"
          id="selectList"
          value={department}
          onChange={(e) => {
            console.log(e.target.value);
            setDepartment(e.target.value);
          }}
        >
          <option value="CSC">Computer Science</option>
          <option value="IT">Information Technology</option>
          <option value="ECE">Electronics and Communication Engineering</option>
          <option value="ECE">Electrical and Electronic Engineering</option>
          <option value="AE">Automobile Engineering</option>
          <option value="EIE">
            Electronics and Instrumentation Engineering
          </option>
          <option value="BME">Biomedical Engineering</option>
          <option value="RAE"> Robotics and Automation Engineering</option>

          <option value="CE">Civil Engineering</option>
          <option value="MECH">Mechanical Engineering</option>
          <option value="AIDS">Artificial Intelligence and Data Science</option>
        </select>
        {/* <input
          type="text"
          //onChange={(e) => setDepartment(e.target.value)}
          //value={department}
        /> */}
      </label>{" "}
      <label>
        <span>Semester:</span>
        <select
          name="Semester"
          id="selectList"
          value={semester}
          onChange={(e) => {
            setSemester(e.target.value);
          }}
        >
          <option value="5">5th semester</option>
          <option value="6">6th semester</option>
          <option value="7">7th semester</option>
          <option value="8">8th semester</option>
        </select>
      </label>
      <label>
        <span>Section:</span>
        <select
          name="Section"
          id="selectList"
          value={section}
          onChange={(e) => {
            setSection(e.target.value);
          }}
        >
          <option value="A">A</option> <option value="B">B</option>
        </select>
      </label>
      {/* <label>
        <span>Photo:</span>
        <input required type="file" onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label> */}
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {/* <label>
        <span>Adhaar Card:</span>
        <input required type="file" onChange={handleAadhaarChange} />
        {aadhaarError && <div className="error">{aadhaarError}</div>}
      </label> */}
      {!isPending && <button className={styles.btn}>Sign Up</button>}
      {isPending && (
        <button className="btn" disabled>
          loading
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
