import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Simulated fetch function (replace with actual API later)
  useEffect(() => {
    const dummyData = [
      { id: "ORD001", customer: "Aditi Sharma", items: ["Handloom Saree"], status: "Confirmed" },
      { id: "ORD002", customer: "Ravi Kumar", items: ["Dupatta"], status: "Out for Delivery" },
      { id: "ORD003", customer: "Neha Singh", items: ["Cold-Pressed Oil"], status: "Delivered" },
      { id: "ORD004", customer: "Priya Mehta", items: ["Bamboo Bag"], status: "Confirmed" },
    ];
    setOrders(dummyData);
  }, []);

  const statuses = ["Confirmed", "Out for Delivery", "Delivered"];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Order Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <div key={status} className="bg-green-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-green-700 mb-4">{status}</h2>
            {orders
              .filter((order) => order.status === status)
              .map((order) => (
                <div
                  key={order.id}
                  className="mb-4 p-3 bg-white border rounded shadow-sm"
                >
                  <p className="font-medium">#{order.id}</p>
                  <p className="text-sm text-gray-700">Customer: {order.customer}</p>
                  <p className="text-sm text-gray-600">
                    Items: {order.items.join(", ")}
                  </p>
                </div>
              ))}
            {orders.filter((order) => order.status === status).length === 0 && (
              <p className="text-gray-500 italic">No orders</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   const statuses = ["PENDING_PAYMENT", "PROCESSING", "DELIVERED"];

//   useEffect(() => {
//     axios
//       .get("http://ec2-18-136-196-238.ap-southeast-1.compute.amazonaws.com:8080/api/orders")
//       .then((res) => {
//         setOrders(res.data); // ✅ assumes your backend returns the array shown above
//       })
//       .catch((err) => {
//         console.error("Error fetching orders:", err);
//       });
//   }, []);

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold text-green-800 mb-8">Order Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {statuses.map((status) => (
//           <div key={status} className="bg-green-50 p-4 rounded-lg shadow">
//             <h2 className="text-xl font-semibold text-green-700 mb-4">
//               {status.replace("_", " ")}
//             </h2>

//             {orders.filter((order) => order.orderStatus === status).length === 0 ? (
//               <p className="text-gray-500 italic">No orders</p>
//             ) : (
//               orders
//                 .filter((order) => order.orderStatus === status)
//                 .map((order) => (
//                   <div
//                     key={order.id}
//                     className="mb-4 p-3 bg-white border rounded shadow-sm"
//                   >
//                     <p className="font-medium">Order ID: {order.id}</p>
//                     <p className="text-sm text-gray-700">
//                       Customer: {order.customerId}
//                     </p>
//                     <p className="text-sm text-gray-600 mb-1">
//                       Items:
//                       <ul className="list-disc list-inside">
//                         {order.lineItems.map((item, idx) => (
//                           <li key={idx}>
//                             {item.productTitle} × {item.quantity}
//                           </li>
//                         ))}
//                       </ul>
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Total: ₹{order.totalAmount}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Payment Status: {order.paymentDetails.status}
//                     </p>
//                   </div>
//                 ))
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;

