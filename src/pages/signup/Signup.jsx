import { useState, useEffect } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useHistory } from "react-router-dom";
import saveAs from "file-saver";
import ExcelJS from "exceljs";
import styles from "./Signup.module.css";
import { useCollection } from "../../hooks/useCollection";
import { useDocument } from "../../hooks/useDocument";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Signup() {
  // const [isRegistrationAllowed, setRegistrationAllowed] = useState(false);
  // const { documents, error: electiveError } = useCollection("settings");
  // useEffect(() => {
  //   // Fetch the registration status from Firestore
  //   const fetchRegistrationStatus = async () => {
  //     try {
  //       //console.log("try loop is visited");

  //       //console.log(documents);
  //       // Assuming you have the ID of the document you want to find
  //       const targetDocumentId = "J6fiB89VZ6qN1O3QrQu9";

  //       // Find the document by ID

  //       const targetDocument = documents.find(
  //         (doc) => doc.id === targetDocumentId
  //       );
  //       if (targetDocument) {
  //         const registrationAllowed = targetDocument.regAllow;
  //         // Perform any further actions based on the document data
  //         //console.log("registrationAllowed", registrationAllowed);
  //         setRegistrationAllowed(registrationAllowed);
  //         //console.log("isRegistrationAllowed", isRegistrationAllowed);
  //       } else {
  //         console.error(`Document with ID ${targetDocumentId} not found.`);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching registration status:", error);
  //     }
  //   };

  //   fetchRegistrationStatus();
  // }, [documents]);

 //console.log(isRegistrationAllowed);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [department, setDepartment] = useState("CSC");
  const [year, setYear] = useState("3");
  const [semester, setSemester] = useState("5");
  const [section, setSection] = useState("A");
  const [registerNumber, setRegisterNumber] = useState("");
  const [isEnroll, setIsEnroll] = useState(false);

  const { signup, isPending, error } = useSignup();
  const history = useHistory();

  function handleClick() {
    history.push("/login");
    window.location.reload(true);
  }
  function sliceReg(e) {
    if (e.length == 12) {
      const temp = e.slice(4, 6);
      if (temp == "21") {
        setSemester("6");
        setYear("3");
      } else if (temp == "22") {
        setSemester("4");
        setYear("2");
      }

      const temp1 = e.slice(6, 9);
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
      {
        email,
        password,
        displayName,
        registerNumber,
        department,
        year,
        section,
        semester,
        isEnroll,
      },
      handleDownloadPassword
    );
    //console.log(thumbnail);
  };

  const handleDownloadPassword = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Password");

    worksheet.addRow(["Password:", password]); // Add password to the worksheet

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, "password.xlsx"); // Trigger download
    });
  };

  return false ? (
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
        <span>Create Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>Register Number:</span>
        <input
          type="text"
          onChange={(e) => {
            setRegisterNumber(e.target.value);
            sliceReg(e.target.value);
          }}
          value={registerNumber}
        />
      </label>
      <label>
        <span>Department:</span>
        <select
          name="Department"
          id="selectList"
          disabled={true}
          value={department}
          onChange={(e) => {
           // console.log(e.target.value);
            setDepartment(e.target.value);
          }}
        >
          <option value="CSE">Computer Science</option>
          <option value="IT">Information Technology</option>
          <option value="ECE">Electronics and Communication Engineering</option>
          <option value="EEE">Electrical and Electronic Engineering</option>
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
          disabled={true}
          value={semester}
          onChange={(e) => {
            setSemester(e.target.value);
          }}
        >
          <option value="4">4th semester</option>
          {/* <option value="5">5th semester</option> */}
          <option value="6">6th semester</option>
          {/* <option value="7">7th semester</option> */}
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
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
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
      <button className={styles.btn1} onClick={handleClick}>
        Already an User? Login Instead
      </button>
    </form>
  ) : (
    <div className={styles["signup-form"]}>
      <h2>Registration is closed</h2>
    </div>
  );
}
