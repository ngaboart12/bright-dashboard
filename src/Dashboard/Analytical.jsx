import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

const Analytical = () => {
  const [Assessment, setAssessmnet] = useState([]);
  const [Applicants, setApplicants] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "assessments"));
        const formDataArray = [];
        querySnapshot.forEach((doc) => {
          formDataArray.push({ id: doc.id, ...doc.data() });
        });
        setAssessmnet(formDataArray);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Application"));
        const formDataArray = [];
        querySnapshot.forEach((doc) => {
          formDataArray.push({ id: doc.id, ...doc.data() });
        });
        setApplicants(formDataArray);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "offers"));
        const formDataArray = [];
        querySnapshot.forEach((doc) => {
          formDataArray.push({ id: doc.id, ...doc.data() });
        });
        setOffers(formDataArray);
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

  return (
    <div className="grid grid-cols-4 w-1/2 gap-4">
      <div className="p-2 rounded-md bg-white flex flex-col gap-2 items-center">
        <h1 className="text-[20px] font-bold">{Applicants.length}</h1>
        <span>Applicants</span>
      </div>
      <div className="p-2 rounded-md bg-white flex flex-col gap-2 items-center">
        <h1 className="text-[20px] font-bold">{Assessment.length}</h1>
        <span>Assessments</span>
      </div>
      <div className="p-2 rounded-md bg-white flex flex-col gap-2 items-center">
        <h1 className="text-[20px] font-bold">{faculties.length}</h1>
        <span>Faculties</span>
      </div>
      <div className="p-2 rounded-md bg-white flex flex-col gap-2 items-center">
        <h1 className="text-[20px] font-bold">{offers.length}</h1>
        <span>Offers</span>
      </div>
    </div>
  );
};

export default Analytical;
