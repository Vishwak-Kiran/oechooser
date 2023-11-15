import React, { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import "./Download.css"; // Import your CSS file

export default function Download() {
  const { user } = useAuthContext();
  const [selectedCollection, setSelectedCollection] = useState("IT");
  const { documents, error } = useCollection("users");

  // Filter documents based on the selected department, if documents are available
  const filteredDocuments = documents
    ? documents.filter((document) => document.department === selectedCollection)
    : [];

  const downloadAsExcel = async () => {
    try {
      // Create a new workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Students");

      // Define the columns in the worksheet
      worksheet.columns = [
        { header: "Email", key: "email" },
        { header: "Register Number", key: "registerNumber" },
        { header: "Student Name", key: "displayName" },
        { header: "Department", key: "department" },
        { header: "Year", key: "year" },
        { header: "Section", key: "section" },
        { header: "Enrolled Time", key: "enrolledTime" },

        { header: "Semester", key: "semester" },

        { header: "Elective", key: "elective" },
      ];

      // Populate the worksheet with data
      filteredDocuments.forEach((document) => {
        const email = document.email ? document.email : "N/A";
        const displayName = document.displayName ? document.displayName : "N/A";
        const department = document.department ? document.department : "N/A";
        const registerNumber = document.registerNumber
          ? document.registerNumber
          : "N/A";
        const section = document.section ? document.section : "N/A";
        const semester = document.semester ? document.semester : "N/A";
        const year = document.year ? document.year : "N/A";

        const enrolledTime = "N/A"; // You might need to adjust this depending on how you want to handle enrolledTime
        const elective = document.elective ? document.elective : "N/A";

        worksheet.addRow({
          email,
          displayName,
          enrolledTime,
          department,
          registerNumber,
          section,
          semester,
          year,

          elective,
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
          {["IT", "EEE", "ECE", "CSC", "MECH"].map((option) => (
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
