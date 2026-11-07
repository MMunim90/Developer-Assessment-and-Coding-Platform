
import { Link, NavLink } from "react-router";
import {
  Code2,
  Trophy,
  ClipboardCheck,
  Info,
  UserRound,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { authUser, logout } = useContext(AuthContext);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navItems = [
    { name: "Challenges", path: "/challenges", icon: Code2 },
    { name: "Contests", path: "/contests", icon: Trophy },
    {
      name: "Assessments",
      path: "/assessments",
      icon: ClipboardCheck,
    },
    { name: "Leaderboard", path: "/leaderboard", icon: Trophy },
    { name: "About", path: "/about", icon: Info },
  ];

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-white bg-white/10"
        : "text-slate-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#08090D]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="navbar min-h-[76px] px-0">

          {/* Logo */}
          <div className="navbar-start">
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                <Code2 size={23} className="text-white" />
              </div>

              <div className="flex flex-col leading-none gap-1">
                <span className="text-xl font-bold tracking-tight text-white">
                  DACP
                </span>
                <span className="text-[9px] text-slate-500 tracking-[2px] uppercase">
                  Developer Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-center hidden lg:flex">
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={navLinkClass}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right Side */}
          <div className="navbar-end gap-3">

            {authUser ? (
              /* Authenticated User */
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                    <span className="text-white font-semibold uppercase">
                      {authUser?.email?.charAt(0) || "U"}
                    </span>
                  </div>

                  <span className="hidden sm:block text-sm text-slate-200">
                    My Account
                  </span>

                  <ChevronDown
                    size={15}
                    className="text-slate-400"
                  />
                </div>

                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 w-56 rounded-xl border border-white/10 bg-[#111318] p-2 shadow-2xl shadow-black/40"
                >
                  <li>
                    <Link to="/profile">
                      <UserRound size={17} />
                      My Profile
                    </Link>
                  </li>

                  <li>
                    <Link to="/dashboard">
                      <LayoutDashboard size={17} />
                      Dashboard
                    </Link>
                  </li>

                  <div className="divider my-1 border-white/10"></div>

                  <li>
                    <button
                      onClick={logout}
                      className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              /* Guest User */
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2.5 rounded-lg bg-white text-[#08090D] text-sm font-semibold hover:bg-slate-200 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden btn btn-ghost btn-square text-slate-300 hover:bg-white/10"
              aria-label="Toggle navigation"
            >
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenu && (
          <div className="lg:hidden border-t border-white/[0.08] py-4 space-y-2">

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenu(false)}
                  className={navLinkClass}
                >
                  <Icon size={18} />
                  {item.name}
                </NavLink>
              );
            })}

            {!authUser && (
              <div className="flex flex-col gap-2 pt-3 border-t border-white/10 mt-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="px-3 py-2.5 text-sm text-center text-slate-300 hover:bg-white/5 rounded-lg"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMobileMenu(false)}
                  className="px-3 py-2.5 text-sm text-center font-semibold bg-white text-black rounded-lg"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}

      </div>
    </header>
  );
};

export default Navbar;
