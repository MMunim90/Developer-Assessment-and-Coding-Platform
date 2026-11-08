import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Eye,
  EyeOff,
  Code2,
  ArrowRight,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import { baseURL } from "../services/BaseURL";
import { AuthContext } from "../context/AuthContext";
import { Bounce, toast } from "react-toastify";
import DeveloperTheme from "../components/DeveloperTheme";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const res = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data?.access_token) {
        throw new Error(data?.detail || "Incorrect username or password.");
      }

      const accessToken = data.access_token;

      const userRes = await fetch(`${baseURL}/user_profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userData = await userRes.json();

      if (!userRes.ok || userData?.detail === "User Not Found!!!") {
        throw new Error(
          userData?.detail || "Unable to retrieve user information.",
        );
      }

      localStorage.setItem("user_token", accessToken);
      setAuthUser(userData);

      toast.success("Login successful! Welcome back.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-slate-100 lg:grid lg:grid-cols-2">
      {/* ================= LEFT SIDE ================= */}
      <DeveloperTheme/>

      {/* ================= RIGHT SIDE ================= */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-14 sm:px-10">
        {/* Subtle Background Glow */}
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-600/[0.07] blur-[120px]" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile Brand */}
          <Link to="/" className="mb-12 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
              <Code2 size={23} />
            </div>
            <span className="text-xl font-bold">
              DACP<span className="text-blue-400">.</span>
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-9">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
              <LockKeyhole size={23} />
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Sign in to continue your coding journey and access your developer
              dashboard.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Username
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-13 w-full rounded-lg border border-white/10 bg-[#111318] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-13 w-full rounded-lg border border-white/10 bg-[#111318] pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-blue-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in to DACP
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* Signup */}
          <div className="mt-8 border-t border-white/[0.07] pt-7 text-center">
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-blue-400 transition hover:text-blue-300"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* Back Home */}
          <Link
            to="/"
            className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500 transition hover:text-blue-400"
          >
            <ArrowRight size={13} className="rotate-180" />
            Back to homepage
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Login;
