import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import jsPDF from "jspdf";

const TableOfApplicant = () => {
  const [formDataList, setFormDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserType = () => {
    const usersJSON = localStorage.getItem("users");
    const userData = JSON.parse(usersJSON);
    return userData ? userData.userType : null;
  };

  const isAdmin = getUserType() === "admin";
  console.log(getUserType());

  const deleteApplicant = async (id) => {
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, "Application", id));

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
        const querySnapshot = await getDocs(collection(db, "Application"));
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
    pdfDoc.text(`Information of Apllicant ${rowData.stage1.lastName}`, 60, 5);
    pdfDoc.text(`Person Info`, 5, 20);
    pdfDoc.text(`First Name: ${rowData.stage1.firstName}`, 10, 25);
    pdfDoc.text(`middel Name: ${rowData.stage1.middelName}`, 10, 30);
    pdfDoc.text(`Last name: ${rowData.stage1.lastName}`, 10, 35);
    pdfDoc.text(`date of birth: ${rowData.stage1.dateOfBirth}`, 10, 40);
    pdfDoc.text(`place of birth: ${rowData.stage1.placeOfBirth}`, 10, 45);
    pdfDoc.text(`nationality: ${rowData.stage1.nationality}`, 10, 50);
    pdfDoc.text(`sex: ${rowData.stage1.sex}`, 10, 55);
    pdfDoc.text(`firstlanguage: ${rowData.stage1.firstLaguage}`, 10, 60);

    pdfDoc.text(`Passport And Address`, 5, 70);
    pdfDoc.text(`passport number: ${rowData.stage2.passportNumber}`, 10, 75);
    pdfDoc.text(
      `passport issued by: ${rowData.stage2.passportIssuedBy}`,
      10,
      80
    );
    pdfDoc.text(
      `passport expiry date: ${rowData.stage2.passportExpiryDate}`,
      10,
      85
    );
    pdfDoc.text(`valid to: ${rowData.stage2.ValidTo}`, 10, 90);
    pdfDoc.text(`country: ${rowData.stage2.country}`, 10, 95);
    pdfDoc.text(`district: ${rowData.stage2.district}`, 10, 100);
    pdfDoc.text(`street number: ${rowData.stage2.streetNumber}`, 10, 105);
    pdfDoc.text(`contact number: ${rowData.stage2.contactNumber}`, 10, 110);
    pdfDoc.text(`email: ${rowData.stage2.email}`, 10, 115);

    pdfDoc.text(`Family And Emergency`, 5, 125);
    pdfDoc.text(`Father name: ${rowData.stage3.fatherName}`, 10, 130);
    pdfDoc.text(`father contact: ${rowData.stage3.fatherContact}`, 10, 135);
    pdfDoc.text(`mother name: ${rowData.stage3.motherName}`, 10, 140);
    pdfDoc.text(`mother contact: ${rowData.stage3.motherContact}`, 10, 145);
    pdfDoc.text(
      `emaergency person contact: ${rowData.stage3.emrgencyName}`,
      10,
      150
    );
    pdfDoc.text(`relationship: ${rowData.stage3.relationship}`, 10, 155);
    pdfDoc.text(`contact: ${rowData.stage3.emargencyContact}`, 10, 160);
    pdfDoc.text(`email: ${rowData.stage3.emrgencyEmail}`, 10, 165);

    pdfDoc.text(`school information`, 5, 175);
    pdfDoc.text(
      `country of prev school: ${rowData.stage4.countryOfPrevSchool}`,
      10,
      180
    );
    pdfDoc.text(
      `name of prev school: ${rowData.stage4.namePfPrevSchool}`,
      10,
      185
    );
    pdfDoc.text(
      `level of eduction: ${rowData.stage4.levelOfEducation}`,
      10,
      190
    );
    pdfDoc.text(`primary language: ${rowData.stage4.primaryLaguage}`, 10, 195);
    pdfDoc.text(`school from: ${rowData.stage4.schoolFrom}`, 10, 200);
    pdfDoc.text(`school to: ${rowData.stage4.schoolTo}`, 10, 205);
    pdfDoc.text(`degree name: ${rowData.stage4.degreeName}`, 10, 210);
    pdfDoc.text(
      `i have from this school: ${rowData.stage4.IHaveFromThiSschool}`,
      10,
      215
    );
    pdfDoc.text(
      `application to study: ${rowData.stage4.applicationSchool[0]}`,
      10,
      220
    );
    pdfDoc.text(`Attachments`, 5, 230);
    pdfDoc.text(`diploma: ${rowData.stage5.diploma}`, 10, 235);
    pdfDoc.text(`passport: ${rowData.stage5.passport}`, 10, 240);
    pdfDoc.text(`transcript: ${rowData.stage5.transcript}`, 10, 245);
    pdfDoc.text(
      `eligibility letter report: ${rowData.stage5.EligibilityLetterports}`,
      10,
      250
    );
    pdfDoc.text(
      `non criminal record: ${rowData.stage5.NonCriminalRecord}`,
      10,
      255
    );
    pdfDoc.text(`English Proficiency: `, 10, 260);
    pdfDoc.setTextColor(40, 67, 135);
    pdfDoc.text(`${rowData.stage5.EnglishProficiency}`, 40, 260);

    // Add more data fields as needed

    // Save the PDF and open it in a new tab for download
    pdfDoc.save(`Application_${rowData.stage1.firstName}.pdf`);
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
                  <td className="py-2">{applicant.stage1.firstName}</td>
                  <td className="py-2  ">{applicant.stage1.lastName}</td>
                  <td className="py-2 ">{applicant.stage2.email}</td>

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
                      onClick={() => deleteApplicant(applicant.id)}
                      disabled={!isAdmin}
                      className={`p-2 bg-red-500 rounded-md text-white hover:opacity-80 ${
                        !isAdmin ? "cursor-not-allowed" : ""
                      }`}
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

export default TableOfApplicant;
