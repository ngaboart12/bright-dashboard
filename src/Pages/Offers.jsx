import React, { useState } from "react";
import { db, storage } from "../../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const Offers = () => {
  const [offerName, setOfferName] = useState("");
  const [offerDate, setOfferDate] = useState("");
  const [offerDescription, setOfferDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };
  const handelPhotChange = (e) => {
    setPhotoFile(e.target.files[0]);
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

    const photoStorageRef = ref(storage, `photos/${photoFile.name}`);
    await uploadBytes(photoStorageRef, photoFile);

    // Get Photo download URL
    const photoDownloadURL = await getDownloadURL(photoStorageRef);

    await addDoc(collection(db, "offers"), {
      offerName,
      offerDate,
      offerDescription,
      pdfURL: downloadURL,
      photoURL: photoDownloadURL,
    });

    // Clear form fields
    setOfferName("");
    setOfferDate("");
    setOfferDescription("");
    setPdfFile(null);
    setPhotoFile(null);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <label className=" gap-4 flex">
          Offer Name:
          <input
            type="text"
            placeholder="offer name"
            value={offerName}
            className="p-2 bg-transparent border-[1px] rounded-[8px] border-black/30 outline-none"
            onChange={(e) => setOfferName(e.target.value)}
          />
        </label>
        <label className=" gap-4 flex">
          Offer Date:
          <input
            type="text"
            placeholder="12 jan"
            value={offerDate}
            className="p-2 bg-transparent border-[1px] rounded-[8px] border-black/30 outline-none"
            onChange={(e) => setOfferDate(e.target.value)}
          />
        </label>
        <label className=" gap-4 flex items-center">
          Offer Description:
          <textarea
            value={offerDescription}
            placeholder="Description"
            className="p-2 bg-transparent border-[1px] rounded-[8px] border-black/30 outline-none"
            onChange={(e) => setOfferDescription(e.target.value)}
          />
        </label>
        <label className=" gap-4 flex">
          PDF File:
          <input type="file" accept=".pdf" onChange={handleFileChange} />
        </label>
        <label className=" gap-4 flex">
          Offer Photo:
          <input
            type="file"
            accept="image"
            onChange={(e) => handelPhotChange(e, "photo")}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Offers;
