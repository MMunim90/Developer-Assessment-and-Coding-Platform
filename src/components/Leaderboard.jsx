import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Trophy,
  Medal,
  Crown,
  ArrowRight,
  Code2,
  TrendingUp,
  LoaderCircle,
} from "lucide-react";

import { baseURL } from "../services/BaseURL";
import DeveloperRating from "../components/DeveloperRating";

const rankStyles = [
  {
    icon: Crown,
    color: "text-amber-400",
    border: "border-amber-400/30",
    background: "bg-amber-400/10",
  },
  {
    icon: Medal,
    color: "text-slate-300",
    border: "border-slate-300/20",
    background: "bg-slate-300/10",
  },
  {
    icon: Medal,
    color: "text-orange-400",
    border: "border-orange-400/20",
    background: "bg-orange-400/10",
  },
];

const getDeveloperName = (developer) => {
  const fullName =
    `${developer.firstname || ""} ${developer.lastname || ""}`.trim();

  return fullName || developer.username || "Developer";
};

const getInitial = (developer) =>
  getDeveloperName(developer).charAt(0).toUpperCase();

const Leaderboard = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${baseURL}/leaderboard`);

        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid leaderboard response.");
        }

        // Sort users by current rating and maximum rating.
        const sortedUsers = data.sort(
          (a, b) =>
            (Number(b.rating) || 0) - (Number(a.rating) || 0) ||
            (Number(b.max_rating) || 0) - (Number(a.max_rating) || 0),
        );

        setDevelopers(sortedUsers.slice(0, 8));
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const topThree = developers.slice(0, 3);
  const remainingDevelopers = developers.slice(3, 8);

  return (
    <section className="relative overflow-hidden bg-[#08090D] px-5 py-20 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute left-1/2 top-20 h-80 w-96 -translate-x-1/2 rounded-full bg-blue-600/[0.07] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Recognize Excellence
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Developer <span className="text-amber-400">Leaderboard</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              Discover top performers, celebrate achievements, and get inspired
              to reach the next level.
            </p>
          </div>

          <Link
            to="/leaderboard"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-400 transition hover:gap-3 hover:text-blue-300"
          >
            View Full Rankings <ArrowRight size={17} />
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-white/[0.07] bg-[#111318] py-16">
            <LoaderCircle size={30} className="animate-spin text-blue-400" />
            <p className="mt-4 text-sm text-slate-400">
              Loading leaderboard...
            </p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="rounded-xl border border-red-500/20 bg-[#111318] px-5 py-12 text-center">
            <Trophy size={30} className="mx-auto text-slate-600" />
            <h3 className="mt-4 font-semibold text-white">
              Unable to Load Leaderboard
            </h3>
            <p className="mt-2 text-sm text-slate-500">{error}</p>
          </div>
        ) : developers.length > 0 ? (
          <>
            {/* Top Three Developers */}
            <div className="mb-8 grid items-end gap-4 md:grid-cols-3">
              {topThree.map((developer, index) => {
                const style = rankStyles[index];
                const Icon = style.icon;

                return (
                  <div
                    key={developer.id}
                    className={`relative overflow-hidden rounded-xl border ${style.border} bg-[#111318] p-6 text-center transition duration-300 hover:-translate-y-1 ${
                      index === 0
                        ? "md:order-2 md:py-10"
                        : index === 1
                          ? "md:order-1"
                          : "md:order-3"
                    }`}
                  >
                    <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-white/[0.03] blur-2xl" />

                    {/* Developer Avatar */}
                    <div className="relative mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#0D1017] text-xl font-bold text-white">
                      {developer.profile_image ? (
                        <img
                          src={developer.profile_image}
                          alt={getDeveloperName(developer)}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        getInitial(developer)
                      )}
                    </div>

                    {/* Rank Icon */}
                    <div
                      className={`relative mx-auto mt-4 flex h-9 w-9 items-center justify-center rounded-lg ${style.background} ${style.color}`}
                    >
                      <Icon size={19} />
                    </div>

                    <p className="relative mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Rank #{index + 1}
                    </p>

                    <h3 className="relative mt-2 truncate text-lg font-bold text-white">
                      <Link
                        to={`/developers/${developer.id}`}
                        className="transition-colors duration-200 hover:text-blue-400"
                      >
                        {getDeveloperName(developer)}
                      </Link>
                    </h3>

                    <p className="relative mt-1 text-xs text-slate-500">
                      @{developer.username}
                    </p>

                    {/* Developer Rating Badge */}
                    <div className="relative mt-4 flex justify-center">
                      <DeveloperRating rating={developer.rating ?? 0} />
                    </div>

                    {/* Current Rating */}
                    <div className="relative mt-5 border-t border-white/[0.07] pt-4">
                      <p className={`text-3xl font-bold ${style.color}`}>
                        {Number(developer.rating ?? 0).toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Current Rating
                      </p>
                    </div>

                    {/* Maximum Rating */}
                    <div className="relative mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                      <TrendingUp size={14} className="text-emerald-400" />
                      <span>
                        Max Rating:{" "}
                        <span className="font-semibold text-slate-300">
                          {Number(developer.max_rating ?? 0).toLocaleString()}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Remaining Developers */}
            {remainingDevelopers.length > 0 && (
              <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#111318]">
                <div className="grid grid-cols-[45px_minmax(0,1fr)_100px_100px] gap-2 border-b border-white/[0.07] bg-[#0D1017] px-4 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:grid-cols-[65px_minmax(0,1fr)_150px_130px] sm:px-5">
                  <span>Rank</span>
                  <span>Developer</span>
                  <span className="text-center">Max Rating</span>
                  <span className="text-right">Rating</span>
                </div>

                {remainingDevelopers.map((developer, index) => (
                  <div
                    key={developer.id}
                    className="grid grid-cols-[45px_minmax(0,1fr)_100px_100px] items-center gap-2 border-b border-white/[0.05] px-4 py-4 last:border-0 transition hover:bg-white/[0.025] sm:grid-cols-[65px_minmax(0,1fr)_150px_130px] sm:px-5"
                  >
                    <span className="text-sm font-semibold text-slate-500">
                      #{index + 4}
                    </span>

                    <Link
                      to={`/developers/${developer.id}`}
                      className="group flex min-w-0 items-center gap-3"
                    >
                      {/* Developer Avatar */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#0D1017] text-sm font-semibold text-blue-300 transition-colors group-hover:border-blue-400/40">
                        {developer.profile_image ? (
                          <img
                            src={developer.profile_image}
                            alt={getDeveloperName(developer)}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          getInitial(developer)
                        )}
                      </div>

                      {/* Developer Information */}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-200 transition-colors duration-200 group-hover:text-blue-400">
                          {getDeveloperName(developer)}
                        </p>

                        <p className="truncate text-xs text-slate-500">
                          @{developer.username}
                        </p>
                      </div>
                    </Link>

                    <span className="text-center text-sm text-slate-400">
                      {Number(developer.max_rating ?? 0).toLocaleString()}
                    </span>

                    <span className="text-right text-sm font-bold text-blue-400">
                      {Number(developer.rating ?? 0).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Showing top {developers.length} developers
              </p>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="rounded-xl border border-dashed border-white/10 bg-[#111318] px-5 py-14 text-center">
            <Code2 size={30} className="mx-auto text-slate-600" />

            <h3 className="mt-4 font-semibold text-white">
              Your Next Achievement Starts Here
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Developer rankings will appear here when leaderboard data is
              available.
            </p>

            <Link
              to="/challenges"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300"
            >
              Start Solving <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Leaderboard;
