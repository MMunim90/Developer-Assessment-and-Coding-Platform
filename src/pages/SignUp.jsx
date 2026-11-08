import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Eye,
  EyeOff,
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  ArrowRight,
  UserPlus,
} from "lucide-react";
import { baseURL } from "../services/BaseURL";
import DeveloperTheme from "../components/DeveloperTheme";
import Swal from "sweetalert2";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone_number: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${baseURL}/create_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.detail || data?.message || "Failed to create your account.",
        );
      }

      await Swal.fire({
        icon: "success",
        title: "Account Created Successfully!",
        text: "Welcome to DACP! You can now sign in to your account.",
        background: "#111318",
        color: "#e2e8f0",
        confirmButtonColor: "#2563eb",
        iconColor: "#34d399",
        confirmButtonText: "Continue to Login",
        customClass: {
          popup: "dacp-swal",
          title: "dacp-swal-title",
          confirmButton: "dacp-swal-button",
        },
      });

      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        phone_number: "",
        password: "",
        role: "",
      });

      setShowPassword(false);

      navigate("/login", { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message || "Something went wrong. Please try again.",
        background: "#111318",
        color: "#e2e8f0",
        confirmButtonColor: "#2563eb",
        iconColor: "#f87171",
        confirmButtonText: "Okay",
        customClass: {
          popup: "dacp-swal",
          title: "dacp-swal-title",
          confirmButton: "dacp-swal-button",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-slate-100 lg:grid lg:grid-cols-2">
      {/* ================= LEFT SIDE ================= */}
      <section className="relative hidden min-h-screen overflow-hidden border-r border-white/[0.06] lg:block">
        <DeveloperTheme />
      </section>

      {/* ================= RIGHT SIDE ================= */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12 sm:px-10">
        {/* Background Glow */}
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-600/[0.07] blur-[120px]" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile Brand */}
          <Link to="/" className="mb-9 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
              <UserPlus size={22} />
            </div>

            <span className="text-xl font-bold">
              DACP<span className="text-blue-400">.</span>
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
              <UserPlus size={23} />
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Create your account
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Join DACP, solve coding challenges, compete with developers, and
              improve your programming skills.
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstname"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  First Name
                </label>

                <input
                  id="firstname"
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  autoComplete="given-name"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-lg border border-white/10 bg-[#111318] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="lastname"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Last Name
                </label>

                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  autoComplete="family-name"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-lg border border-white/10 bg-[#111318] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                />
              </div>
            </div>

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
                  name="username"
                  placeholder="Choose a username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-lg border border-white/10 bg-[#111318] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-lg border border-white/10 bg-[#111318] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone_number"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="phone_number"
                  type="tel"
                  name="phone_number"
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-lg border border-white/10 bg-[#111318] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
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
                  name="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-lg border border-white/10 bg-[#111318] pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
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

              <p className="mt-2 text-xs text-slate-500">
                Password must contain at least 8 characters.
              </p>
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Account Role
              </label>

              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="h-12 w-full rounded-lg border border-white/10 bg-[#111318] px-4 text-sm text-slate-300 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="developer">Developer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create DACP Account
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-7 border-t border-white/[0.07] pt-6 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-400 transition hover:text-blue-300"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Back Home */}
          <Link
            to="/"
            className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-500 transition hover:text-blue-400"
          >
            <ArrowRight size={13} className="rotate-180" />
            Back to homepage
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
