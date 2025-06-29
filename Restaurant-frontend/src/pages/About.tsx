// src/pages/About.tsx
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-yellow-900 bg-opacity-70 z-0"></div>

      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 py-32 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-6 drop-shadow-lg">About FoodDash</h1>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
          FoodDash is your one-stop destination for effortless food ordering, restaurant management, and delivery coordination.
          Whether you're a customer craving your favorite dish, an owner running your kitchen, or a driver making sure meals get delivered hot—we've got you covered.
        </p>
      </div>
    </div>
  );
};

export default About;
