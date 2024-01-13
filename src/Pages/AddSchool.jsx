// FacultyRegistration.jsx
import { addDoc, collection, getDocs } from "firebase/firestore";
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddSchool;
