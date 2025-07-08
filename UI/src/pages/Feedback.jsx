import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Feedback() {
  const [productType, setProductType] = useState("");
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const productOptions = {
    "Handlooms": ["Sarees", "Dupattas", "Cotton Products"],
    "Bamboo": ["Decorative", "Kitchenware", "Planters"],
    "Agro Products": ["Edibles", "Beauty Products", "Artifatcts"],
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show the success popup
    setShowPopup(true);

    // Hide after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    // Reset the form
    setProductType("");
    setCategory("");
    setComment("");
  };

  return (
    <>
      <Navbar />

      <div className="relative isolate px-6 pt-20 lg:px-8">
        {/* Background blur */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a8e063] to-[#56ab2f] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="max-w-3xl mx-auto py-24 sm:py-32 relative">
          <h1 className="text-4xl font-bold text-center text-green-700 sm:text-5xl mb-12">
            Share Your Feedback
          </h1>

          {showPopup && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-green-100 border border-green-500 text-green-800 px-6 py-4 rounded-xl shadow-lg text-center text-lg font-medium transition-all duration-300">
      ✅ Thank you! Your feedback has been received.
    </div>
  </div>
)}


          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-xl p-8 space-y-6"
          >
            {/* Product Type */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">
                Select Product Type
              </label>
              <select
                value={productType}
                onChange={(e) => {
                  setProductType(e.target.value);
                  setCategory("");
                }}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">-- Choose a product --</option>
                {Object.keys(productOptions).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            {productType && (
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Select Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">-- Choose a category --</option>
                  {productOptions[productType].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Comments */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">
                Your Comments
              </label>
              <textarea
                rows="5"
                placeholder="Type your thoughts here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                required
              ></textarea>
            </div>

            {/* Submit */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-green-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-green-500 transition"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
