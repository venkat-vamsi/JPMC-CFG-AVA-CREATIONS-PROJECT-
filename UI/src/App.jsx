import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Product from "./pages/Product";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Feedback from "./pages/Feedback";
import AdminPage from "./pages/AdminPage";
import Advisor from "./pages/Advisor";
import Orders from "./pages/orders";
import FeedbackUser from "./pages/FeedbackUser"; 
import AvaSakhi from "./pages/avasakhi";

// import Feedback from "./pages/Feedback";
import Cart from "./pages/Cart";
import Login from "./pages/Login"
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<AdminPage />} /> */}
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/product" element={<Product />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/advisor" element={<Advisor />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/user-feedback" element={<FeedbackUser />} /> {/* ✅ This is required */}
        <Route path="/ava-sakhi" element={<AvaSakhi />} />

        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
