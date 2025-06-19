import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../features/auth/authAPI";

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
        confirmationCode: Date.now().toString(), // 🔒 Temporary static code
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
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-md bg-base-100 p-6 shadow space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="input input-bordered w-full"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🔽 Role Dropdown */}
        <select
          className="select select-bordered w-full"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="customer">Customer</option>
          <option value="owner">Owner</option>
          <option value="driver">Driver</option>
          <option value="member">Member</option>
        </select>

        <button className="btn btn-primary w-full" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
