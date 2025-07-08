// import React from "react";
// import { useCart } from "../context/CartContext";
// import Navbar from "../components/Navbar";

// export default function Cart() {
//   const { cartItems } = useCart();

//   return (
//     <>
//       <Navbar />
//       <div className="pt-28 px-12 pb-12 min-h-screen bg-gray-50">
//         <h1 className="text-4xl font-bold mb-8 text-green-700 text-center">
//           Your Cart
//         </h1>

//         {cartItems.length === 0 ? (
//           <p className="text-center text-gray-600">Your cart is empty.</p>
//         ) : (
//           <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
//             <thead className="bg-green-100 text-green-800">
//               <tr>
//                 <th className="py-3 px-6 text-left">Product</th>
//                 <th className="py-3 px-6 text-left">Description</th>
//                 <th className="py-3 px-6 text-left">Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item, index) => (
//                 <tr
//                   key={index}
//                   className="border-b border-gray-200 hover:bg-green-50"
//                 >
//                   <td className="py-4 px-6 flex items-center space-x-4">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-16 h-16 rounded object-cover"
//                     />
//                     <span>{item.name}</span>
//                   </td>
//                   <td className="py-4 px-6">{item.description}</td>
//                   <td className="py-4 px-6 font-semibold">{item.price}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         <div className="flex justify-center mt-8">
//   <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500">
//     Purchase
//   </button>
// </div>
//       </div>
//     </>
//   );
// }



import React from "react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

export default function Cart() {
  const { cartItems } = useCart();

  return (
    <>
      <Navbar />
      <div className="pt-28 px-12 pb-12 min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold mb-8 text-green-700 text-center">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="py-3 px-6 text-left">Product</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-green-50"
                >
                  <td className="py-4 px-6 flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <span>{item.name}</span>
                  </td>
                  <td className="py-4 px-6">{item.description}</td>
                  <td className="py-4 px-6 font-semibold">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex justify-center mt-8">
  <button
    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500"
    onClick={() => {
      alert("Redirecting to external payment page...");
      // Example redirect (can be replaced with real URL)
      window.location.href = "https://example.com/checkout";
    }}
  >
    Purchase
  </button>
</div>
      </div>
    </>
  );
}