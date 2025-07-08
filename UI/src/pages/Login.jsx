import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import {logo} from "../assets/logo.png"; 
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dummyUsers = [
    { role: "admin", email: "admin@gmail.com", password: "admin123" },
    { role: "user", email: "user@gmail.com", password: "user123" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const matchedUser = dummyUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("role", matchedUser.role);

      if (matchedUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      alert(
        "Invalid credentials."
      );
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="/SignUp"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign up for free
          </a>
        </p>

        {/* Demo credentials info */}
        {/* <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            🛠 <strong>Admin:</strong> admin@gmail.com / admin123
          </p>
          <p>
            👤 <strong>User:</strong> user@gmail.com / user123
          </p>
        </div> */}
      </div>
    </div>
  );
}