import React, { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { registerUser, isAuthLoading, error ,isAuthenticated } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("All fields are required ❌");
      return;
    }

    const newUser = {
      username : username,
      email : email,
      password : password
    }

    registerUser(newUser);
    console.log(username , email , password)

    // optional: redirect handled after auth success
  }

  useEffect(() => {
      if (isAuthenticated) {
        navigate("/app");
      }
    }, [isAuthenticated, navigate]);

  return (
    <section
      className="min-h-screen bg-[#020617] flex items-center justify-center px-6 pt-10 bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 backdrop-blur-xl bg-black/80 border-b border-white/10"></div>

      <div className="relative w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Create Account
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Start tracking your travels today
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="yourname"
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isAuthLoading}
            className="w-full rounded-full bg-white py-3 font-semibold text-black hover:bg-gray-200 transition disabled:opacity-50"
          >
            {isAuthLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;
