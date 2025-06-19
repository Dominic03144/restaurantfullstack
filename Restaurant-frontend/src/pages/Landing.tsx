import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary">Welcome to FoodDash</h1>
        <p className="text-lg text-gray-600">
          Your one-stop platform for ordering food, managing restaurants, and delivering with ease.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/login" className="btn btn-primary w-full sm:w-auto">
            Login
          </Link>
          <Link to="/register" className="btn btn-outline w-full sm:w-auto">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
