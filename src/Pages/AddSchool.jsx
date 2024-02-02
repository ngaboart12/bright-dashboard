// FacultyRegistration.jsx
import {addDoc, collection, getDocs, updateDoc, doc  } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
// Assuming db is exported from your firebase.js file

const AddSchool = () => {
  const [facultyName, setFacultyName] = useState("");
  const [duration, setDuration] = useState("");
  const [country, setCountry] = useState("");
  const [tuitionFees, setTuitionFees] = useState("");
  const [grade, setGrade] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);


  const openUpdateModal = (faculty) => {
    setSelectedFaculty(faculty);

    // Set state variables with existing data
    setFacultyName(faculty.facultyName);
    setDuration(faculty.duration);
    setCountry(faculty.country);
    setGrade(faculty.grade);
    setTuitionFees(faculty.tuitionFees);

    setUpdateModalVisible(true);
  };

  // Function to close the update modal
  const closeUpdateModal = () => {
    setSelectedFaculty(null);
    setUpdateModalVisible(false);
  };

  const getUserInfo = () => {
    // Retrieve user info from local storage
    const userInfo = localStorage.getItem("users");
    return userInfo ? JSON.parse(userInfo) : null;
  };

  const isAdmin = () => {
    // Check if the user is an admin based on your user info structure
    const userInfo = getUserInfo();
    return userInfo && userInfo.userType === "admin";
  };

  const handleDelete = async (facultyId) => {
    setLoading(true);
    try {
      const facultyRef = collection(db, "faculties", facultyId);
      await deleteDoc(facultyRef);
      console.log("Faculty deleted successfully");

      // Update the local state to reflect the changes
      setFaculties((prevFaculties) =>
        prevFaculties.filter((faculty) => faculty.id !== facultyId)
      );
    } catch (error) {
      console.error("Error deleting faculty:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const facultiesRef = collection(db, "faculties");
        const querySnapshot = await getDocs(facultiesRef);
        const facultiesData = [];
        querySnapshot.forEach((doc) => {
          facultiesData.push({ id: doc.id, ...doc.data() });
        });
        setFaculties(facultiesData);
      } catch (error) {
        console.error("Error fetching faculties:", error.message);
      }
    };

    fetchFaculties();
  }, []);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const facultiesRef = collection(db, "faculties");
      await addDoc(facultiesRef, {
        facultyName,
        duration,
        country,
        grade,
        tuitionFees: parseFloat(tuitionFees),
      });

      console.log("Faculty Registration successful");

      // Clear form fields after successful registration
      setFacultyName("");
      setGrade("");
      setCountry("");
      setTuitionFees("");
      setDuration("");
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("Error registering faculty:", error.message);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFaculties = faculties.filter((faculty) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      faculty.facultyName.toLowerCase().includes(lowerCaseSearchTerm) ||
      faculty.country.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });


  const handleUpdate = async () => {
    setLoading(true);

    try {
      const facultyRef = doc(db, "faculties", selectedFaculty.id);
      await updateDoc(facultyRef, {
        facultyName,
        duration,
        country,
        grade,
        tuitionFees: parseFloat(tuitionFees),
      });

      console.log("Faculty information updated successfully");

      // Close the modal and reset form fields
      closeUpdateModal();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating faculty information:", error.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="mb-10">Faculty Registration</h1>
      <div className="grid grid-cols-3 gap-6">
        <label className="flex flex-col gap-2">
          Faculty Name:
          <input
            className="h-10 border bg-transparent p-2 placeholder:text-black border-gray-400 rounded-md ml-2"
            placeholder="Enter faculity name"
            type="text"
            value={facultyName}
            onChange={(e) => setFacultyName(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2">
          Duration:
          <input
            className="h-10 border bg-transparent p-2 placeholder:text-black border-gray-400 rounded-md ml-2"
            placeholder="Enter Duration"
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2">
          Country:
          <input
            className="h-10 border bg-transparent p-2 placeholder:text-black border-gray-400 rounded-md ml-2"
            placeholder="Enter country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2">
          Grade:
          <input
            className="h-10 border bg-transparent p-2 placeholder:text-black border-gray-400 rounded-md ml-2"
            type="text"
            placeholder="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2">
          Tuition Fees:
          <input
            className="h-10 border bg-transparent p-2 placeholder:text-black border-gray-400 rounded-md ml-2"
            type="number"
            placeholder="Tuition Fees"
            value={tuitionFees}
            onChange={(e) => setTuitionFees(e.target.value)}
          />
        </label>
        <button
          onClick={handleRegister}
          className="h-10 bg-blue-500 mt-8 rounded-md text-white hover:bg-blue-400"
        >
          {loading ? "Loading..." : "Confirm"}
        </button>
      </div>
      {/* 
      <div>
        <input
          type="text"
          placeholder="Search faculties"
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && (
          <div className=" ">
            <h2>Search Results</h2>
            {filteredFaculties.map((faculty) => (
              <div key={faculty.id}>
                <p>Faculty Name: {faculty.facultyName}</p>
                <p>School: {faculty.school}</p>
                <p>Country: {faculty.country}</p>
                <p>School Fees: {faculty.schoolFees}</p>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div> */}
      <div className="flex w-full mt-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-start">Faculity name</th>
              <th className="text-start">Duration</th>
              <th className="text-start">Tuition fees</th>
              <th className="text-start">Grade</th>
              <th className="text-start">Country</th>
              {isAdmin() && <th className="text-start">Action</th>}
            </tr>
          </thead>
          <tbody>
            {faculties.map((item, index) => (
              <tr className="" key={index}>
                <td className="py-2">{item.facultyName}</td>
                <td className="py-2">{item.duration} years </td>
                <td className="py-2">${item.tuitionFees}</td>
                <td className="py-2">{item.grade}</td>
                <td className="py-2">{item.country}</td>
                <td className="py-2">
                <button
                        onClick={() => openUpdateModal(item)}
                        className="text-blue-500 hover:underline mr-2"
                      >
                        Edit
                
                 </button>
                  {isAdmin() && (
                    <>
                    
                   
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:underline"
                        >
                        Delete
                      </button>
                  </>
                   
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isUpdateModalVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-md w-1/2">
            <h2 className="text-xl font-semibold mb-4">Update Faculty Information</h2>
            <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              Faculty Name:
              <input
                className="h-10 border bg-transparent p-2 placeholder:text-black border-gray-400 rounded-md ml-2"
                type="text"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2">
              Duration:
              <input
                className="h-10 border bg-transparent p-2 placeholder:text-black border-gray-400 rounded-md ml-2"
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2">
              Country:
              <input
                className="h-10 border bg-transparent p-2 placeholder:text-black border-gray-400 rounded-md ml-2"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2">
              Grade:
              <input
                className="h-10 border bg-transparent p-2 placeholder:text-black border-gray-400 rounded-md ml-2"
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2">
              Tuition Fees:
              <input
                className="h-10 border bg-transparent p-2 placeholder:text-black border-gray-400 rounded-md ml-2"
                type="number"
                value={tuitionFees}
                onChange={(e) => setTuitionFees(e.target.value)}
              />
            </label>
          
          </div>
          <button
              onClick={handleUpdate}
              className="h-10 bg-blue-500 w-[200px] mt-4 rounded-md text-white hover:bg-blue-400"
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              onClick={closeUpdateModal}
              className="h-10 bg-gray-300 px-20 ml-2 mt-2 rounded-md text-black hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSchool;
