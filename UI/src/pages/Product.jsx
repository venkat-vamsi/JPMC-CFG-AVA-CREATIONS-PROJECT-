import React from "react";
import Navbar from "../components/Navbar";
import im1 from "../assets/im1.jpg";
import im2 from "../assets/im2.jpg";
import im3 from "../assets/im3.jpg";
import im4 from "../assets/im4.jpg";
import im5 from "../assets/im5.jpg";
import im6 from "../assets/im6.jpg";
import im7 from "../assets/im7.jpg";
import { useCart } from "../context/CartContext";

export default function Product() {
  const { addToCart } = useCart();

  const products = [
    {
      name: "Handcrafted Bamboo Basket",
      description: "Made with sustainable bamboo by local artisans.",
      price: "₹450",
      image: im1,
    },
    {
      name: "Assam Silk Saree",
      description: "Elegant handwoven silk for special occasions.",
      price: "₹1200",
      image: im2,
    },
    {
      name: "Terracotta Planter",
      description: "Eco-friendly pot for home gardens.",
      price: "₹300",
      image: im3,
    },
    {
      name: "Organic Neem Soap",
      description: "Natural and refreshing bath soap.",
      price: "₹80",
      image: im4,
    },
    {
      name: "Bamboo Wall Decor",
      description: "Rustic bamboo wall hanging art.",
      price: "₹600",
      image: im5,
    },
    {
      name: "Traditional Gamosa",
      description: "Iconic symbol of Assamese pride.",
      price: "₹150",
      image: im6,
    },
    {
      name: "Terracotta Water Jug",
      description: "Keeps water cool and fresh naturally.",
      price: "₹500",
      image: im7,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="pt-28 px-12 pb-12 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold mb-10 text-green-700 text-center">
          Our Product Collection
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded-md"
              />
              <h2 className="mt-4 text-xl font-semibold text-green-700">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm mt-1">{product.description}</p>
              <p className="text-green-800 font-bold mt-2">{product.price}</p>
              <button
  onClick={() => addToCart(product)}
  className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
>
  Add to Cart
</button>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}
