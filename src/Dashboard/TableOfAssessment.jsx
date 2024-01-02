import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import jsPDF from "jspdf";

const TableOfAssessment = () => {
  const [formDataList, setFormDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteAssessment = async (id) => {
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, "assessments", id));

      // Update the state to reflect the changes
      setFormDataList((prevData) =>
        prevData.filter((applicant) => applicant.id !== id)
      );
    } catch (error) {
      console.error("Error deleting document: ", error);
      setError("An error occurred while deleting data.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "assessments"));
        const formDataArray = [];
        querySnapshot.forEach((doc) => {
          formDataArray.push({ id: doc.id, ...doc.data() });
        });
        setFormDataList(formDataArray);
      } catch (error) {
        console.error("Error fetching documents: ", error);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    // Call fetchData when the component mounts
    fetchData();
  }, []);

  const downloadRowDataPDF = (rowData) => {
    // Create a new instance of jsPDF
    const pdfDoc = new jsPDF();
    pdfDoc.setFontSize(10);

    // Customize the content you want to include in the PDF
    pdfDoc.text(
      `Information of Apllicant ${rowData.personInfo.lastName}`,
      60,
      5
    );
    pdfDoc.text(`Person Info`, 5, 20);
    pdfDoc.text(`First Name: ${rowData.personInfo.firstName}`, 10, 25);
    pdfDoc.text(`Last Name: ${rowData.personInfo.middelName}`, 10, 30);
    pdfDoc.text(`Email: ${rowData.personInfo.lastName}`, 10, 35);
    pdfDoc.text(`Email: ${rowData.personInfo.dateOfBirth}`, 10, 40);
    pdfDoc.text(`Email: ${rowData.personInfo.placeOfBirth}`, 10, 45);
    pdfDoc.text(`Email: ${rowData.personInfo.nationality}`, 10, 50);
    pdfDoc.text(`Email: ${rowData.personInfo.sex}`, 10, 55);
    pdfDoc.text(`Email: ${rowData.personInfo.firstLaguage}`, 10, 60);
    // Add more data fields as needed

    // Save the PDF and open it in a new tab for download
    pdfDoc.save(`Assessment_${rowData.personInfo.firstName}.pdf`);
  };

  return (
    <main className="flex-1 p-8 overflow-hidden rounded-lg w-full">
      {/* ... (same as before) */}

      {/* Table of applying people */}
      {!loading && !error && (
        <div className="">
          {/* ... (same as before) */}
          <table className="w-full">
            <thead>
              <tr className="">
                <th className="text-start">First name</th>
                <th className="text-start">Lastname</th>
                <th className="text-start">Email</th>
                <th className="text-start">Faculity</th>
                <th className="text-start">Operation</th>
              </tr>
            </thead>
            <tbody>
              {formDataList.map((applicant) => (
                <tr key={applicant.id} className="text-start">
                  {/* ... (same as before) */}
                  <td className="py-2">{applicant.personInfo.firstName}</td>
                  <td className="py-2  ">{applicant.personInfo.lastName}</td>
                  <td className="py-2 ">{applicant.personInfo.emailAdrress}</td>

                  <td className="py-2 border-b">
                    <button
                      onClick={() => downloadRowDataPDF(applicant)}
                      className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                      Export Data
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteAssessment(applicant.id)}
                      className="p-2 bg-red-500 rounded-md text-white hover:opacity-80"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ... (same as before) */}
    </main>
  );
};

export default TableOfAssessment;
