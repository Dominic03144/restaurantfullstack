import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../features/auth/authAPI";
import Navbar from "../components/Navbar";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName || !email || !contactPhone || !password || !userType) {
      toast.error("All fields are required, including user type.");
      return;
    }

    try {
      const userData = {
        userName,
        email,
        contactPhone,
        password,
        userType,
        confirmationCode: Date.now().toString(),
      };

      await register(userData).unwrap();
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error: any) {
      console.error("Register error:", error);

      const raw = error?.data?.error || error?.data;

      if (typeof raw === "string") {
        toast.error(raw);
      } else if (Array.isArray(raw)) {
        raw.forEach((err) =>
          toast.error(err.message || `${err.path?.join(".")}: ${err.message}`)
        );
      } else if (typeof raw === "object" && raw !== null) {
        const issues = Object.entries(raw).map(
          ([key, value]) => `${key}: ${(value as any)?._errors?.[0] || "Invalid"}`
        );
        issues.forEach((msg) => toast.error(msg));
      } else {
        toast.error("Registration failed. Please check your inputs.");
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')", // blue-purple-brown theme
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <Navbar />

      <div className="relative z-10 flex-grow flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1a2acc] backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full space-y-5 text-white"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
            Register
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded border border-yellow-400 bg-[#ffffff0f] placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ color: "white" }}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded border border-yellow-400 bg-[#ffffff0f] placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ color: "white" }}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 rounded border border-yellow-400 bg-[#ffffff0f] placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            style={{ color: "white" }}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded border border-yellow-400 bg-[#ffffff0f] placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ color: "white" }}
          />

          <select
            className="w-full p-3 rounded border border-yellow-400 bg-[#ffffff0f] placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="" className="text-yellow-300">
              Select Role
            </option>
            <option value="customer">Customer</option>
            <option value="owner">Owner</option>
            <option value="driver">Driver</option>
            <option value="member">Member</option>
          </select>

          <button
            className="w-full py-3 rounded bg-yellow-400 text-[#1a1a2a] font-semibold hover:bg-yellow-300 transition"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-center text-yellow-200">
            Already have an account?{" "}
            <Link to="/login" className="hover:underline font-semibold text-yellow-300">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
