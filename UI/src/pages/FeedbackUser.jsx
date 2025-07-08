import React from "react";

const hardcodedFeedback = [
  {
    productType: "Handlooms",
    category: "Sarees",
    comment: "Beautiful fabric and traditional design!",
  },
  {
    productType: "Bamboo",
    category: "Kitchenware",
    comment: "Eco-friendly and sturdy, really loved it!",
  },
  {
    productType: "Agro Products",
    category: "Edibles",
    comment: "Fresh and organic. Worth every penny.",
  },
];

const FeedbackUser = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        User Feedback
      </h2>

      {hardcodedFeedback.map((entry, index) => (
        <div
          key={index}
          className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4"
        >
          <p className="font-semibold text-gray-800">
            {entry.productType} - {entry.category}
          </p>
          <p className="text-gray-700 mt-1">{entry.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackUser;
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const FeedbackUser = () => {
//   const [feedbackData, setFeedbackData] = useState([]);

//   useEffect(() => {
//     const fetchFeedback = async () => {
//       try {
//         const res = await axios.get(
//           "http://ec2-18-136-196-238.ap-southeast-1.compute.amazonaws.com:8080/api/feedback"
//         );
//         setFeedbackData(res.data);
//       } catch (err) {
//         console.error("Failed to fetch feedback:", err);
//       }
//     };

//     fetchFeedback();
//   }, []);

//   // Group feedback by productType and category
//   const groupedFeedback = {};

//   feedbackData.forEach((entry) => {
//     const key = `${entry.productType}||${entry.category}`;
//     if (!groupedFeedback[key]) {
//       groupedFeedback[key] = [];
//     }
//     groupedFeedback[key].push(entry.comments);
//   });

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md mt-10">
//       <h2 className="text-2xl font-bold text-green-800 mb-6">User Feedback</h2>

//       {Object.entries(groupedFeedback).map(([key, comments], index) => {
//         const [productType, category] = key.split("||");

//         return (
//           <div
//             key={index}
//             className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6"
//           >
//             <p className="font-semibold text-gray-800 text-lg">
//               {productType} - {category}
//             </p>
//             <ul className="mt-2 space-y-2 list-disc list-inside text-gray-700">
//               {comments.map((comment, i) => (
//                 <li key={i}>{comment}</li>
//               ))}
//             </ul>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default FeedbackUser;

