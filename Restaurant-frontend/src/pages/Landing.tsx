import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import MenuPage from "./MenuPage";

const Landing = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div
        className="min-h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none z-0" />
        <div className="relative z-10">
          <Navbar />
        </div>

        <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-40 space-y-6 text-white">
          <h2 className="text-5xl font-bold text-[#FFD700] drop-shadow-lg">
            Welcome to FoodDash
          </h2>
          <p className="text-lg max-w-2xl text-gray-200">
            Your one-stop platform for ordering food, managing restaurants, and delivering with ease.
          </p>

          <Link
            to="/register"
            className="bg-[#FFD700] text-[#8B0000] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-yellow-400 transition"
          >
            Get Started
          </Link>
        </main>
      </div>

      {/* 🔽 Scroll Target for Navbar 'Menu' link */}
      <section id="featured-menu" className="pt-16 pb-20 bg-white">
        <h2 className="text-4xl font-bold text-center text-yellow-600 mb-6">
          🍔 Featured Menu
        </h2>
        <MenuPage embedded />
      </section>
    </div>
  );
};

export default Landing;
