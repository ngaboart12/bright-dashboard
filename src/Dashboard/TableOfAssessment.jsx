import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import jsPDF from "jspdf";

const TableOfAssessment = () => {
  const [formDataList, setFormDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAdmin = () => {
    // Check if the user is an admin based on your user info structure
    const userInfo = localStorage.getItem("users");
    return userInfo && JSON.parse(userInfo).userType === "admin";
  };

  const deleteAssessment = async (id) => {
    try {
      if (!isAdmin()) {
        console.error("User is not authorized to delete assessments.");
        return;
      }

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
    pdfDoc.text(`Personal Info`, 5, 20);
    pdfDoc.text(`First Name: ${rowData.personInfo.firstName}`, 10, 25);
    pdfDoc.text(`Last Name: ${rowData.personInfo.lastName}`, 10, 30);
    pdfDoc.text(`Age: ${rowData.personInfo.Age}`, 10, 40);
    pdfDoc.text(`Nationlaity: ${rowData.personInfo.nationality}`, 10, 45);
    pdfDoc.text(
      `country of residence: ${rowData.personInfo.countryResidence}`,
      10,
      50
    );
    pdfDoc.text(`Email: ${rowData.personInfo.emailAdrress}`, 10, 55);
    pdfDoc.text(`phone number: ${rowData.personInfo.phoneNumber}`, 10, 60);
    pdfDoc.text(
      `level of education: ${rowData.personInfo.levelOfEducation}`,
      10,
      65
    );
    pdfDoc.text(
      `Bank Statement: ${rowData.personInfo.provideBankStatementsEquivalent}`,
      10,
      70
    );
    pdfDoc.text(
      `Living expense: ${rowData.personInfo.livingExpensesWhileYouWtudyInCanada}`,
      10,
      75
    );
    pdfDoc.text(
      `Letter of Addmission: ${rowData.personInfo.letterOfAdmission}`,
      10,
      80
    );

    pdfDoc.text(`Cannadian`, 5, 85);
    pdfDoc.text(
      `First Official laguange: ${rowData.cannadian.firstOfficialLanguage}`,
      10,
      90
    );
    pdfDoc.text(
      `-Read proficiency: ${rowData.cannadian.firstReadProficiency}`,
      15,
      95
    );
    pdfDoc.text(
      `-Speak proficiency: ${rowData.cannadian.firstSpeakingProficiency}`,
      15,
      100
    );
    pdfDoc.text(
      `-Write proficiency: ${rowData.cannadian.firstWritingProficiency}`,
      15,
      105
    );
    pdfDoc.text(
      `-Listen proficiency: ${rowData.cannadian.firstListeningProficiency}`,
      15,
      110
    );
    pdfDoc.text(
      `-Second Official Language: ${rowData.cannadian.secondOfficialLanguage}`,
      10,
      115
    );
    pdfDoc.text(
      `-Read proficiency: ${rowData.cannadian.secondReadProficiency}`,
      15,
      120
    );
    pdfDoc.text(
      `-Speak proficiency: ${rowData.cannadian.secondSpeakingProficiency}`,
      15,
      125
    );
    pdfDoc.text(
      `-Write proficiency: ${rowData.cannadian.secondWritingProficiency}`,
      15,
      130
    );
    pdfDoc.text(
      `-Listen proficiency: ${rowData.cannadian.secondListeningProficiency}`,
      15,
      135
    );
    pdfDoc.text(`Background Information`, 5, 140);
    pdfDoc.text(
      `Have You Refused Visa,${rowData.backgroundInfo.haveYouRefusedVisa}`,
      10,
      145
    );
    pdfDoc.text(
      `Valid Student permit,${rowData.backgroundInfo.validStudyPermit}`,
      10,
      150
    );
    pdfDoc.text(`sponsor,${rowData.backgroundInfo.yourSponsor}`, 10, 155);
    pdfDoc.text(`Education Program`, 5, 160);
    pdfDoc.text(
      `First Program:${rowData.educationProgram.programs[0]}`,
      10,
      165
    );
    pdfDoc.text(
      `second Program:${rowData.educationProgram.programs[1]}`,
      10,
      170
    );
    pdfDoc.text(
      `third Program:${rowData.educationProgram.programs[2]}`,
      10,
      175
    );
    pdfDoc.text(`Others`, 5, 180);
    pdfDoc.text(
      `First Official language:${rowData.other.FirstofficialLanguage}`,
      10,
      185
    );
    pdfDoc.text(`Message:${rowData.other.message}`, 10, 190);
    pdfDoc.text(`Criminal Record:${rowData.other.criminalRecord}`, 10, 195);
    pdfDoc.text(`serious Condition:${rowData.other.seriousCondition}`, 10, 200);

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
                {isAdmin() && <th className="text-start">Operation</th>}
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
                      className={`p-2 ${
                        isAdmin() ? "bg-red-500" : "bg-gray-300"
                      } rounded-md text-white hover:opacity-80`}
                      disabled={!isAdmin()}
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
