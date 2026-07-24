import logo from "../assets/logo.png";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-4 cursor-pointer"
        >
          <img
            src={logo}
            alt="BingeBite Logo"
            className="h-32 w-32 object-contain transition-transform duration-300 hover:scale-110"
          />

          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Binge<span className="text-violet-500">Bite</span>
          </h1>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <Link
            to="/favorites"
            className="flex items-center gap-2 rounded-xl bg-zinc-800 px-5 py-3 text-white transition-all duration-300 hover:bg-violet-600"
          >
            <Heart
              size={18}
              fill="currentColor"
            />

            <span>Favorites</span>
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;