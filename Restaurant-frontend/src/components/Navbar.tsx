import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScrollToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const menuSection = document.getElementById("featured-menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // Close mobile menu
    } else {
      // If not on landing page, navigate to landing and anchor
      if (location.pathname !== "/") {
        window.location.href = "/#featured-menu";
      }
    }
  };

  return (
    <nav className="bg-transparent absolute top-0 w-full z-30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-yellow-400 drop-shadow-md"
          aria-label="FoodDash Home"
        >
          FoodDash
        </Link>

        {/* Desktop Navigation */}
        <div className="space-x-8 text-white font-semibold text-lg hidden md:flex items-center">
          <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          <a href="#featured-menu" onClick={handleScrollToMenu} className="hover:text-yellow-400 transition">Menu</a>
          <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
          <Link to="/register" className="hover:text-yellow-400 transition">Register</Link>
          <Link to="/login" className="hover:text-yellow-400 transition">Login</Link>
          <Link to="/contact" className="hover:text-yellow-400 transition">Contact Us</Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-yellow-400 focus:outline-none"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-80 backdrop-blur-lg px-6 py-4 space-y-4 text-white text-lg font-semibold">
          <Link to="/" onClick={toggleMenu} className="block hover:text-yellow-400">Home</Link>
          <a href="#featured-menu" onClick={handleScrollToMenu} className="block hover:text-yellow-400">Menu</a>
          <Link to="/about" onClick={toggleMenu} className="block hover:text-yellow-400">About</Link>
          <Link to="/register" onClick={toggleMenu} className="block hover:text-yellow-400">Register</Link>
          <Link to="/login" onClick={toggleMenu} className="block hover:text-yellow-400">Login</Link>
          <Link to="/contact" onClick={toggleMenu} className="block hover:text-yellow-400">Contact Us</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
