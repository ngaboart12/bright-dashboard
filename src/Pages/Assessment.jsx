// src/pages/Dashboard.jsx
import React from "react";
import TableOfApplicant from "../Dashboard/TableOfAplicant";
import TableOfAssessment from "../Dashboard/TableOfAssessment";

// ...

const Assessment = () => {
  return (
    <div className="flex h-screen ">
      <main className="flex-1 p-8 overflow-hidden">
        <h2 className="text-xl  mb-4">Welcome to BrightForth Assessment</h2>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Add your dashboard components here */}
          <div className="bg-white/20 p-4 rounded ">
            <h3 className="text-lg font-semibold mb-2">Apllicants</h3>
            <TableOfAssessment />
          </div>

          {/* Add more components as needed */}
        </div>
      </main>
    </div>
  );
};

export default Assessment;
