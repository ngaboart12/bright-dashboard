import React, { useState } from "react";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const Offers = () => {
  const [offerName, setOfferName] = useState("");
  const [offerDate, setOfferDate] = useState("");
  const [offerDescription, setOfferDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };
  const metadata = {
    contentType: "application/pdf",
    contentDisposition: "attachment",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload PDF to Firebase Storage

    const storageRef = ref(storage, `pdfs/${pdfFile.name}`, metadata);
    await uploadBytes(storageRef, pdfFile);

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);

    // Store offer details in Firebase Firestore

    await addDoc(collection(db, "offers"), {
      offerName,
      offerDate,
      offerDescription,
      pdfURL: downloadURL,
    });

    // Clear form fields
    setOfferName("");
    setOfferDate("");
    setOfferDescription("");
    setPdfFile(null);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Offer Name:
          <input
            type="text"
            value={offerName}
            onChange={(e) => setOfferName(e.target.value)}
          />
        </label>
        <label>
          Offer Date:
          <input
            type="text"
            value={offerDate}
            onChange={(e) => setOfferDate(e.target.value)}
          />
        </label>
        <label>
          Offer Description:
          <textarea
            value={offerDescription}
            onChange={(e) => setOfferDescription(e.target.value)}
          />
        </label>
        <label>
          PDF File:
          <input type="file" accept=".pdf" onChange={handleFileChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Offers;
