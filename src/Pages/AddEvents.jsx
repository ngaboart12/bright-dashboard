import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";

const AddEvents = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [mainPicture, setMainPicture] = useState(null);
  const [additionalPictures, setAdditionalPictures] = useState([]);
  const [downloadMainPictureURL, setDownloadMainPictureURL] = useState("");
  const [downloadAdditionalPicturesURL, setDownloadAdditionalPicturesURL] =
    useState([]);
  const [eventDetails, setEventDetails] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, "events");
      try {
        const querySnapshot = await getDocs(eventsCollection);
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Error getting events: ", error);
      }
    };

    fetchEvents();
  }, []);

  const handleMainPictureChange = (e) => {
    const file = e.target.files[0];
    setMainPicture(file);
  };

  const handleAdditionalPicturesChange = (e) => {
    const files = e.target.files;
    // Include all selected files without limiting to 10 pictures
    setAdditionalPictures(Array.from(files));
  };

  // const uploadPictures = async () => {
  //   // Upload the main picture to Firebase Storage

  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload pictures to Firebase Storage
    const mainPictureRef = ref(storage, `eventPictures/${mainPicture.name}`);
    await uploadBytes(mainPictureRef, mainPicture);
    const mainPictureURL = await getDownloadURL(mainPictureRef);
    setDownloadMainPictureURL(mainPictureURL);

    // Upload additional pictures to Firebase Storage
    const additionalPicturesURLs = await Promise.all(
      additionalPictures.map(async (file) => {
        const picRef = ref(storage, `eventPictures/${file.name}`);
        await uploadBytes(picRef, file);
        return getDownloadURL(picRef);
      })
    );

    // Add logic to handle the submission of the event to Firestore
    try {
      const docRef = await addDoc(collection(db, "events"), {
        eventName,
        eventDate,
        mainPictureURL: mainPictureURL,
        additionalPicturesURLs: additionalPicturesURLs.map((url, index) => ({
          id: index,
          url,
        })),
        eventDetails,
      });
      console.log("Event added with ID:", docRef.id);

      // Fetch updated events after adding a new one
      const eventsCollection = collection(db, "events");
      const querySnapshot = await getDocs(eventsCollection);
      const eventsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    } catch (error) {
      console.error("Error adding event: ", error);
    }

    // Reset the form fields after submission
    setEventName("");
    setEventDate("");
    setMainPicture(null);
    setAdditionalPictures([]);
    setDownloadMainPictureURL("");
    setDownloadAdditionalPicturesURL([]);
    setEventDetails("");
  };

  return (
    <div>
      <h1>Event Management Page</h1>

      <div>
        <h2>Add Event</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <span>Event Name:</span>
            <input
              className="p-2 border border-black/20 rounded-md bg-transparent placeholder:text-black outline-none"
              placeholder="Event Name"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <span> Event Date:</span>
            <input
              className="p-2 border border-black/20 rounded-md bg-transparent placeholder:text-black outline-none"
              placeholder="Event Date"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>Main Picture:</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleMainPictureChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>Additional Pictures:</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalPicturesChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span> Event Details:</span>
            <textarea
              className="p-2 border border-black/20 rounded-md bg-transparent placeholder:text-black outline-none"
              placeholder="Event Description"
              value={eventDetails}
              onChange={(e) => setEventDetails(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="p-2 bg-blue-500 rounded-md h-[64px] mt-auto w-40 text-white"
          >
            Add Event
          </button>
        </form>

        {downloadMainPictureURL && (
          <div>
            <h3>Main Picture:</h3>
            <img
              src={downloadMainPictureURL}
              alt="Main Event"
              style={{ maxWidth: "100%" }}
            />
          </div>
        )}

        {downloadAdditionalPicturesURL.length > 0 && (
          <div>
            <h3>Additional Pictures:</h3>
            {downloadAdditionalPicturesURL.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Additional Event ${index + 1}`}
                style={{ maxWidth: "100%" }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ... (Event List display) */}
    </div>
  );
};

export default AddEvents;
