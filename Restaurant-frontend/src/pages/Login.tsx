import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authAPI";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(loginSuccess(res.user));
      toast.success("Login successful!");

      const userType = res?.user?.userType;

      // Role-based redirect
      switch (userType) {
        case "admin":
          navigate("/admin");
          break;
        case "member":
          navigate("/member");
          break;
        case "owner":
          navigate("/owner");
          break;
        case "driver":
          navigate("/driver");
          break;
        case "customer":
          navigate("/customer");
          break;
        default:
          navigate("/"); // fallback
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-md bg-base-100 p-6 shadow space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="link link-primary">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
