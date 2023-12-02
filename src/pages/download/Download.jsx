import React, { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import "./Download.css"; // Import your CSS file

export default function Download() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("users");
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  // Update filteredDocuments when documents change
  useEffect(() => {
    // Remove the document with email "admin@admin.com"
    setFilteredDocuments(
      documents
        ? documents.filter((doc) => doc.email !== "admin@admin.com")
        : []
    );
  }, [documents]);

  const downloadAsExcel = async () => {
    try {
      // Create a new workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Students");

      // Define the columns in the worksheet
      worksheet.columns = [
        { header: "S.No", key: "sno" },
        { header: "Register Number", key: "registerNumber" },
        { header: "Student Name", key: "displayName" },
        { header: "Department", key: "department" },
        { header: "Year", key: "year" },
        { header: "Semester", key: "semester" },
        { header: "Section", key: "section" },
        { header: "Elective", key: "elective" },
        { header: "Email", key: "email" },
      ];

      // Populate the worksheet with data and add serial number
      filteredDocuments.forEach((document, index) => {
        const email = document.email ? document.email : "N/A";
        const displayName = document.displayName ? document.displayName : "N/A";
        const department = document.department ? document.department : "N/A";
        const registerNumber = document.registerNumber
          ? document.registerNumber
          : "N/A";
        const section = document.section ? document.section : "N/A";
        const semester = document.semester ? document.semester : "N/A";
        const year = document.year ? document.year : "N/A";
        const elective = document.elective ? document.elective : "N/A";

        worksheet.addRow({
          sno: index + 1, // Serial number starts from 1
          email,
          displayName,
          department,
          registerNumber,
          section,
          semester,
          year,
          elective
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
      <h1 className="download-header">Download Registered Students</h1>
      <button className="btn download-btn" onClick={downloadAsExcel}>
        Download as Excel
      </button>
    </div>
  );
}
