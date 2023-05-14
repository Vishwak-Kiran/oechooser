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

  function sliceReg(e){
    if(e.length==12){
      const temp = e.slice(4,6)
      if(temp == "20"){
        setSemester("7")
      } else if(temp == "21"){
        setSemester("5")
      }

      const temp1 = e.slice(6,9)
      if (temp1 == "205") {
        setDepartment("IT");
      } else if (temp1 == "102") {
        setDepartment("AE");
      } else if (temp1 == "103") {
        setDepartment("CE");
      } else if (temp1 == "104") {
        setDepartment("CSE");
      } else if (temp1 == "105") {
        setDepartment("EEE");
      } else if (temp1 == "106") {
        setDepartment("ECE");
      } else if (temp1 == "107") {
        setDepartment("EIE");
      } else if (temp1 == "114") {
        setDepartment("MECH");
      } else if (temp1 == "121") {
        setDepartment("BME");
      } else if (temp1 == "125") {
        setDepartment("RAE");
      } else if (temp1 == "243") {
        setDepartment("AIDS");
      } 
    }
  }

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
          onChange={(e) => {setRegisterNumber(e.target.value); sliceReg(e.target.value)}}
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
          <option value="RIE"> Robotics and Automation Engineering</option>

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
