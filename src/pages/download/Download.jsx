import React, { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import "./Download.css"; // Import your CSS file

export default function Download() {
  const { user } = useAuthContext();
  const [selectedCollection, setSelectedCollection] = useState(
    "Web Design and Management"
  );

  // Define the available collection options
  const collectionOptions = [
    "Pudhu Computing",
    "Web Design and Management",
    "Cloud Computing",
    "Machine Learning",
  ];

  const { documents, error } = useCollection(selectedCollection);

  const downloadAsExcel = async () => {
    try {
      // Create a new workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Students");

      // Define the columns in the worksheet
      worksheet.columns = [
        { header: "Email", key: "email" },
        { header: "Student Name", key: "studentName" },
        { header: "Enrolled Time", key: "enrolledTime" },
        { header: "Elective", key: "elective" },
      ];

      // Populate the worksheet with data
      documents.forEach((document) => {
        worksheet.addRow({
          email: document.students[1],
          studentName: document.students[2],
          enrolledTime: new Date(document.createdAt.toDate()).toLocaleString(),
          elective: document.name,
        });
      });

      // Create a blob from the workbook
      const blob = await workbook.xlsx.writeBuffer();

      // Create a Blob object and trigger download
      saveAs(new Blob([blob]), "students.xlsx");
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  return (
    <div className="download-container">
      <h1 className="download-header">Students Enrolled</h1>
      <div className="select-container">
        <label htmlFor="collectionSelect">Select Collection:</label>
        <select
          id="collectionSelect"
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
        >
          {collectionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <button className="btn download-btn" onClick={downloadAsExcel}>
        Download as Excel
      </button>
    </div>
  );
}
