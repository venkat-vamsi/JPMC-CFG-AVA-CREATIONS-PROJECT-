import React from "react";

const AvaSakhi = () => {
  const complaints = [
    {
      problemTitle: "Low Crop Yield",
      description:
        "The farmer is experiencing low yield despite proper irrigation and fertilization.",
      advice: "Try using organic compost and rotate crops seasonally.",
    },
    {
      problemTitle: "Pest Infestation",
      description:
        "There are unknown pests damaging crops in Krishna district.",
      advice:
        "Use neem oil spray and consult local agri-extension officer for pest identification.",
    },
    {
      problemTitle: "Water Logging",
      description:
        "Fields in the eastern region are flooded due to monsoon, damaging roots.",
      advice: "Improve drainage channels and consider raised bed farming.",
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Ava Sakhi Complaints</h1>

      {complaints.length === 0 ? (
        <p className="text-gray-600 italic">No complaints submitted yet.</p>
      ) : (
        complaints.map((complaint, index) => (
          <div
            key={index}
            className="mb-4 p-4 border border-green-200 bg-green-50 rounded-lg"
          >
            <h2 className="text-xl font-semibold text-green-700 mb-1">
              {complaint.problemTitle}
            </h2>
            <p className="text-gray-800 mb-2">{complaint.description}</p>

            {complaint.advice && (
              <div className="bg-white border-l-4 border-green-500 p-3 mt-2">
                <strong className="text-green-700">Advisor's Advice:</strong>
                <p className="text-gray-700 mt-1">{complaint.advice}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AvaSakhi;
