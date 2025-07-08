import React, { useState } from "react";

const Advisor = ({ initialProblems }) => {
  // Sample problems if none are passed from props
  const defaultProblems = [
    {
      id: 1,
      title: "Low Crop Yield",
      description:
        "The farmer is experiencing low yield despite proper irrigation and fertilization.",
    },
    {
      id: 2,
      title: "Pest Infestation",
      description:
        "There are unknown pests damaging crops in Krishna district.",
    },
  ];

  const [problems, setProblems] = useState(initialProblems || defaultProblems);
  const [adviceMap, setAdviceMap] = useState({});

  const handleAdviceChange = (id, text) => {
    setAdviceMap((prev) => ({ ...prev, [id]: text }));
  };

  const handleSubmitAdvice = (id) => {
    const advice = adviceMap[id];
    if (!advice || advice.trim() === "") {
      alert("Please type advice before submitting.");
      return;
    }

    console.log(`Advice for Problem ID ${id}:`, advice); // You can send this to backend

    // Remove the problem from list
    setProblems((prev) => prev.filter((problem) => problem.id !== id));

    // Optionally remove from adviceMap
    setAdviceMap((prev) => {
      const newMap = { ...prev };
      delete newMap[id];
      return newMap;
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">
        Advisor Dashboard
      </h1>

      {problems.length === 0 ? (
        <p className="text-green-600 font-medium text-lg">
          🎉 All problems are resolved!
        </p>
      ) : (
        problems.map((problem) => (
          <div
            key={problem.id}
            className="mb-6 p-5 border rounded-lg shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {problem.title}
            </h2>
            <p className="text-gray-700 mb-4">{problem.description}</p>

            <textarea
              className="w-full p-3 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              rows={3}
              placeholder="Type your advice here..."
              value={adviceMap[problem.id] || ""}
              onChange={(e) => handleAdviceChange(problem.id, e.target.value)}
            />

            <button
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-all"
              onClick={() => handleSubmitAdvice(problem.id)}
            >
              Submit Advice
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Advisor;