import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  UserRound,
  AtSign,
  ShieldCheck,
  LoaderCircle,
  CheckCircle2,
  Activity,
  Fingerprint,
  CalendarDays,
  Star,
  Trophy,
  ArrowLeft,
} from "lucide-react";

import { baseURL } from "../services/BaseURL";
import DeveloperRating from "../components/DeveloperRating";
import { useNavigate } from "react-router";

const initialProfile = {
  id: null,
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  profile_image: "",
  role: "",
  is_active: false,
  rating: 0,
  max_rating: 0,
  created_at: "",
};

const DeveloperPublicProfile = () => {
  const { developerId } = useParams();

  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch public developer profile
  useEffect(() => {
    const fetchDeveloperProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${baseURL}/developer_profile/${developerId}`,
        );

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data.detail || "Unable to load this developer profile.",
          );
        }

        setProfile({
          ...initialProfile,
          ...data,
        });
      } catch (err) {
        setError(
          err.message || "Something went wrong while loading the profile.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (developerId) {
      fetchDeveloperProfile();
    } else {
      setError("Invalid developer profile URL.");
      setLoading(false);
    }
  }, [developerId]);

  // Profile information
  const fullName =
    `${profile.firstname || ""} ${profile.lastname || ""}`.trim() ||
    profile.username ||
    "DACP Developer";

  const initials =
    `${profile.firstname?.[0] || ""}${profile.lastname?.[0] || ""}`.toUpperCase() ||
    profile.username?.[0]?.toUpperCase() ||
    "D";

  const memberSince = profile.created_at
    ? String(profile.created_at).slice(0, 4)
    : "—";

  const developerRating = Number(profile.rating) || 0;

  const maxRating = Math.max(developerRating, Number(profile.max_rating) || 0);

  // Error / Not Found State
  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [error, navigate]);

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-[#08090D]">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
            <LoaderCircle className="animate-spin text-blue-400" size={27} />
          </div>

          <p className="text-sm text-slate-400">Loading developer profile...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08090D] px-4 py-10 text-slate-200 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-blue-600/[0.07] blur-[130px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-violet-600/[0.05] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-8">
          <Link
            to="/leaderboard"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-400"
          >
            <ArrowLeft size={16} />
            Back to Leaderboard
          </Link>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Developer Profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Explore this developer's identity, programming rating, and account
            information on DACP.
          </p>
        </div>

        {/* Profile Banner */}
        <section className="relative mb-6 overflow-hidden rounded-xl border border-white/[0.08] bg-[#111318]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="absolute inset-x-0 top-0 h-100 bg-gradient-to-r from-blue-600/15 via-violet-600/10 to-transparent" />

          <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
            {/* Avatar */}
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-3xl font-bold text-blue-300 shadow-lg shadow-blue-950/30">
              <span>{initials}</span>

              {profile.profile_image && (
                <img
                  src={profile.profile_image}
                  alt={fullName}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
            </div>

            {/* Developer Details */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="break-words text-2xl font-bold text-white sm:text-3xl">
                  {fullName}
                </h2>

                {profile.is_active && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 size={13} />
                    Active
                  </span>
                )}
              </div>

              <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                <AtSign size={15} className="text-blue-400" />
                {profile.username || "username"}
              </p>

              <div className="mt-3">
                <DeveloperRating rating={developerRating} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-medium capitalize text-blue-300">
                  <ShieldCheck size={14} />
                  {profile.role || "Developer"}
                </span>

                <span className="inline-flex items-center gap-2 rounded-lg border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-xs text-violet-300">
                  <Fingerprint size={14} />
                  ID: {profile.id}
                </span>
              </div>
            </div>

            {/* Public Profile Indicator */}
            <div className="flex shrink-0 items-center gap-2 self-start rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3 text-xs font-semibold text-emerald-400 sm:self-center">
              <UserRound size={16} />
              Public Profile
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
          {/* Personal Information */}
          <section className="rounded-xl border border-white/[0.07] bg-[#111318] p-5 sm:p-7 lg:col-span-3">
            <div className="mb-7 flex items-center gap-3 border-b border-white/[0.07] pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10">
                <UserRound size={21} className="text-blue-400" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Developer Information
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Public information about this DACP developer
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* First Name */}
              <div>
                <p className="text-sm font-medium text-slate-500">First Name</p>
                <p className="mt-2 text-sm font-semibold text-slate-200">
                  {profile.firstname || "Not provided"}
                </p>
              </div>

              {/* Last Name */}
              <div>
                <p className="text-sm font-medium text-slate-500">Last Name</p>
                <p className="mt-2 text-sm font-semibold text-slate-200">
                  {profile.lastname || "Not provided"}
                </p>
              </div>

              {/* Username */}
              <div>
                <p className="text-sm font-medium text-slate-500">Username</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
                  <AtSign size={15} className="text-blue-400" />
                  {profile.username || "Not provided"}
                </p>
              </div>

              {/* Email */}
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Email
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-200">
                  {profile.email || "Not provided"}
                </p>
              </div>

              {/* Role */}
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Account Role
                </p>
                <p className="mt-2 text-sm font-semibold capitalize text-slate-200">
                  {profile.role || "Developer"}
                </p>
              </div>
            </div>

            <div className="mt-7 flex items-start gap-2 border-t border-white/[0.07] pt-5 text-xs leading-5 text-slate-500">
              <ShieldCheck
                size={16}
                className="mt-0.5 shrink-0 text-blue-400"
              />
              <p>
                This is a public developer profile. Private account information
                and security settings are not displayed here.
              </p>
            </div>
          </section>

          {/* Account Overview */}
          <section className="rounded-xl border border-white/[0.07] bg-[#111318] p-5 sm:p-6 lg:col-span-2">
            <div className="mb-6 flex items-center gap-3 border-b border-white/[0.07] pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
                <Activity size={20} className="text-violet-400" />
              </div>

              <div>
                <h3 className="font-bold text-white">Account Overview</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Developer statistics and account details
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Account ID */}
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-slate-500">
                  <Fingerprint size={15} />
                  Account ID
                </span>

                <span className="text-sm font-semibold text-blue-300">
                  {profile.id ?? "—"}
                </span>
              </div>

              {/* Role */}
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-slate-500">
                  <ShieldCheck size={15} />
                  Role
                </span>

                <span className="rounded-md border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold capitalize text-blue-300">
                  {profile.role || "Developer"}
                </span>
              </div>

              {/* Account Status */}
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 size={15} />
                  Account Status
                </span>

                <span
                  className={`inline-flex items-center gap-2 text-xs font-semibold ${
                    profile.is_active ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      profile.is_active ? "bg-emerald-400" : "bg-red-400"
                    }`}
                  />
                  {profile.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Current Rating */}
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-slate-500">
                  <Star size={15} />
                  Contest Rating
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300">
                  <Star size={13} />
                  {developerRating.toLocaleString()}
                </span>
              </div>

              {/* Maximum Rating */}
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-slate-500">
                  <Trophy size={15} />
                  Max Rating
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-md border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300">
                  <Trophy size={13} />
                  {maxRating.toLocaleString()}
                </span>
              </div>

              {/* Member Since */}
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={15} />
                  Member Since
                </span>

                <span className="text-sm font-semibold text-blue-300">
                  {memberSince}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default DeveloperPublicProfile;
