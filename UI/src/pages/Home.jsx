"use client";
import { Link } from "react-router-dom";
import React from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Background blur top */}
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

        <div className="mx-auto max-w-7xl py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:py-40">
          <div className="max-w-2xl text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-green-700 sm:text-6xl">
              AVA Creations Social Impact Foundation
            </h1>
            <h2 className="mt-4 text-2xl font-semibold text-green-600">
              Hand-loom to Hope-loom
            </h2>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                className="rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Get started
              </a>
            </div>
          </div>

          <div className="mt-16 flex justify-center lg:mt-0 lg:ml-10 lg:flex-none">
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              <img
                src={img1}
                alt="Tile 1"
                className="rounded-xl w-40 sm:w-44 shadow-lg object-cover aspect-[3/4]"
              />
              <div className="flex flex-col gap-6 sm:gap-8 mt-8">
                <img
                  src={img2}
                  alt="Tile 2"
                  className="rounded-xl w-40 sm:w-44 shadow-lg object-cover aspect-[3/4]"
                />
                <img
                  src={img3}
                  alt="Tile 3"
                  className="rounded-xl w-40 sm:w-44 shadow-lg object-cover aspect-[3/4]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Background blur bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a8e063] to-[#56ab2f] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 px-6 lg:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Our Mission & Vision
        </h2>
        <p className="text-lg text-gray-700 mb-2">
          AVA Creations empowers forest-dependent communities—especially
          women—through sustainable and dignified livelihoods. We promote
          GI-certified, origin-based, and ethically crafted products that
          preserve traditional skills and protect the environment. By supporting
          heritage-based income, we foster independence and community pride. Our
          work reduces pressure on forest resources while encouraging
          eco-friendly practices. We aim to build a future where culture,
          nature, and people thrive together.
        </p>
      </section>

      {/* Impact Summary */}
      <section className="py-20 px-6 lg:px-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Our Impact</h2>
        <ul className="text-lg text-gray-700 list-disc pl-6 space-y-2">
          <li>
            Beneficiary families witnessed an average income rise from{" "}
            <strong>₹1,500 to ₹5,000,</strong> enhancing financial stability.
          </li>
          <li>
            Conducted <strong>385</strong> training sessions, empowering local
            artisans with improved skills for sustainable livelihood
          </li>
          <li>
            <strong>30+</strong> Successfully trained 385 artisans in
            traditional weaving, sericulture, and value addition to natural
            fibers.
          </li>
          <li>
            <strong>90% </strong>female participation, with women taking
            leadership roles in livelihood initiatives, strengthening gender
            equity in the sector.
          </li>
        </ul>
      </section>

      <Footer />
    </>
  );
}
