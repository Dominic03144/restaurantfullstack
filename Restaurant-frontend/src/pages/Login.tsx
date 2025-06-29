import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess } from "../features/auth/authSlice"; // ✅ Import the action creator, not the reducer
import Navbar from "../components/Navbar";
import type { AppDispatch } from "../app/store";

const BASE_URL = "http://localhost:3000/api";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // ✅ Map roles to routes
  const redirectMap: Record<string, string> = {
    admin: "/admin/dashboard",
    owner: "/owner/dashboard",
    customer: "/customer/dashboard",
    driver: "/driver/dashboard",
    member: "/member/dashboard",
  };

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        const route = redirectMap[user.userType?.toLowerCase()];
        if (route) navigate(route);
      } catch (err) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      const { token, user } = res.data;

      if (!user || !token) {
        setError("Invalid response from server.");
        return;
      }

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Dispatch to Redux
      dispatch(
        loginSuccess({
          userId: user.userId,
          userName: user.userName,
          email: user.email,
          token,
          userType: user.userType,
        })
      );

      const roleRoute = redirectMap[user.userType?.toLowerCase()];
      if (roleRoute) {
        setRedirecting(true);
        setTimeout(() => navigate(roleRoute), 1000);
      } else {
        setError("Unknown user role. Cannot redirect.");
      }

    } catch (err: any) {
      console.error("Login failed:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed. Please try again.";
      setError(msg);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />
      <Navbar />

      <div className="relative z-10 flex-grow flex items-center justify-center px-4">
        <div className="bg-[#1a1a2acc] backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full text-white">
          <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Login</h2>

          {error && (
            <p className="text-yellow-300 mb-4 text-center font-semibold">
              {error}
            </p>
          )}

          {redirecting && (
            <p className="text-yellow-200 mb-4 text-center font-semibold animate-pulse">
              Redirecting to your dashboard...
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded border border-yellow-400 bg-[#ffffff0f] placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              style={{ color: "white" }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded border border-yellow-400 bg-[#ffffff0f] placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              style={{ color: "white" }}
            />

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#1a1a2a] font-semibold py-3 rounded transition"
              disabled={redirecting}
            >
              {redirecting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-yellow-200">
            Don’t have an account?{" "}
            <Link to="/register" className="hover:underline font-semibold text-yellow-300">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
