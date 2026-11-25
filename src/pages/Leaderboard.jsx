import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Trophy,
  Medal,
  Crown,
  Search,
  Code2,
  Star,
  TrendingUp,
  Users,
  RefreshCw,
  LoaderCircle,
  AlertCircle,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { baseURL } from "../services/BaseURL";
import DeveloperRating from "../components/DeveloperRating";

const LEADERBOARD_URL = `${baseURL}/leaderboard`;

const getInitials = (user) => {
  const name = `${user.firstname || ""} ${user.lastname || ""}`.trim();

  return (
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    user.username?.[0]?.toUpperCase() ||
    "D"
  );
};

const Avatar = ({ user, size = "h-11 w-11" }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`${size} relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-blue-500/20 to-violet-500/20 font-bold text-blue-300`}
    >
      {user.profile_image && !imageError ? (
        <img
          src={user.profile_image}
          alt={user.username || "Developer"}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        getInitials(user)
      )}
    </div>
  );
};

const PodiumCard = ({ user, position }) => {
  <div className="mt-3">
    <DeveloperRating rating={user.rating ?? 0} />
  </div>;

  const podiumStyles = {
    1: {
      height: "h-52",
      border: "border-amber-400/30",
      background: "from-amber-500/15 to-amber-500/[0.02]",
      icon: "text-amber-400",
      number: "text-amber-400",
      size: "h-20 w-20",
    },
    2: {
      height: "h-44",
      border: "border-slate-300/20",
      background: "from-slate-300/10 to-slate-300/[0.02]",
      icon: "text-slate-300",
      number: "text-slate-300",
      size: "h-16 w-16",
    },
    3: {
      height: "h-40",
      border: "border-orange-500/20",
      background: "from-orange-500/10 to-orange-500/[0.02]",
      icon: "text-orange-400",
      number: "text-orange-400",
      size: "h-16 w-16",
    },
  };

  const style = podiumStyles[position];

  return (
    <div
      className={`relative flex flex-col items-center justify-end rounded-t-2xl border border-b-0 ${style.border} bg-gradient-to-b ${style.background} px-3 pb-5 pt-6 text-center`}
    >
      {position === 1 && (
        <Crown
          size={25}
          className={`absolute -top-4 ${style.icon}`}
          fill="currentColor"
        />
      )}

      <div className="relative">
        <Avatar user={user} size={style.size} />

        <span
          className={`absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#111318] bg-[#20242E] text-xs font-bold ${style.number}`}
        >
          {position}
        </span>
      </div>

      <h3 className="mt-4 max-w-full truncate text-sm font-bold text-white">
        {user.firstname || user.username}
      </h3>

      <p className="mt-1 max-w-full truncate text-xs text-slate-500">
        @{user.username}
      </p>

      <p className={`mt-3 text-xl font-black ${style.number}`}>
        {Number(user.rating) || 0}
      </p>

      <div className="mt-2">
        <DeveloperRating rating={user.rating ?? 0} />
      </div>

      <div
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-t-lg border border-b-0 ${style.border} bg-white/[0.03] py-2`}
      >
        {position === 1 ? (
          <Trophy size={16} className={style.icon} />
        ) : (
          <Medal size={16} className={style.icon} />
        )}
        <span className={`text-xs font-bold ${style.number}`}>
          Rank #{position}
        </span>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(LEADERBOARD_URL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(
          response.status === 401
            ? "Authentication failed. Please log in again."
            : "Unable to load leaderboard.",
        );
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid leaderboard data received from server.");
      }

      setUsers(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // Sort all users by current rating (highest first).
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const ratingDifference =
        (Number(b.rating) || 0) - (Number(a.rating) || 0);

      if (ratingDifference !== 0) return ratingDifference;

      return (Number(b.max_rating) || 0) - (Number(a.max_rating) || 0);
    });
  }, [users]);

  // Search developers.
  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return sortedUsers;

    return sortedUsers.filter((user) => {
      const fullName =
        `${user.firstname || ""} ${user.lastname || ""}`.toLowerCase();

      return (
        fullName.includes(query) || user.username?.toLowerCase().includes(query)
      );
    });
  }, [sortedUsers, search]);

  const topThree = filteredUsers.slice(0, 3);

  const totalDevelopers = users.length;

  const highestRating = sortedUsers[0]?.rating || 0;

  const averageRating = totalDevelopers
    ? Math.round(
        users.reduce((total, user) => total + (Number(user.rating) || 0), 0) /
          totalDevelopers,
      )
    : 0;

  const inputClass =
    "w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-600";

  if (loading) {
    return (
      <div className="flex min-h-[75vh] flex-col items-center justify-center gap-4 bg-[#08090D]">
        <LoaderCircle size={38} className="animate-spin text-blue-400" />
        <p className="text-sm text-slate-400">Loading developer rankings...</p>
      </div>
    );
  }

  if (error && users.length === 0) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#08090D] px-4">
        <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#111318] p-8 text-center">
          <AlertCircle size={35} className="mx-auto text-red-400" />
          <h2 className="mt-4 text-xl font-bold text-white">
            Unable to Load Leaderboard
          </h2>
          <p className="mt-2 text-sm text-slate-500">{error}</p>

          <button
            onClick={fetchLeaderboard}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08090D] px-4 py-12 text-slate-200 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/[0.08] blur-[140px]" />
        <div className="absolute right-0 top-[500px] h-80 w-80 rounded-full bg-violet-600/[0.05] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10">
            <Trophy size={28} className="text-amber-400" />
          </div>

          <p className="text-xs font-bold uppercase tracking-[3px] text-blue-400">
            DACP Developer Rankings
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl">
            The <span className="text-blue-400">Leaderboard</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Discover the top developers, track their performance, and compete
            with the best programmers in the DACP community.
          </p>
        </section>

        {/* Statistics */}
        <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/[0.07] bg-[#111318] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Total Developers</span>
              <Users size={19} className="text-blue-400" />
            </div>
            <p className="mt-3 text-3xl font-black text-white">
              {totalDevelopers}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Registered platform users
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-[#111318] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Highest Rating</span>
              <Trophy size={19} className="text-amber-400" />
            </div>
            <p className="mt-3 text-3xl font-black text-amber-400">
              {highestRating}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Current top developer rating
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-[#111318] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Average Rating</span>
              <TrendingUp size={19} className="text-emerald-400" />
            </div>
            <p className="mt-3 text-3xl font-black text-white">
              {averageRating}
            </p>
            <p className="mt-1 text-xs text-slate-600">Across all developers</p>
          </div>
        </section>

        {/* Top 3 Developers */}
        {filteredUsers.length > 0 && (
          <section className="mb-12">
            <div className="mb-8 flex items-center justify-center gap-2">
              <Crown size={20} className="text-amber-400" />
              <h2 className="text-xl font-bold text-white">Top Developers</h2>
            </div>

            <div className="mx-auto grid max-w-3xl grid-cols-3 items-end gap-2 sm:gap-5">
              {topThree[1] && <PodiumCard user={topThree[1]} position={2} />}

              {topThree[0] && <PodiumCard user={topThree[0]} position={1} />}

              {topThree[2] && <PodiumCard user={topThree[2]} position={3} />}
            </div>
          </section>
        )}

        {/* Leaderboard Table */}
        <section className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#111318]">
          <div className="flex flex-col gap-4 border-b border-white/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <div className="flex items-center gap-2">
                <Medal size={20} className="text-blue-400" />
                <h2 className="text-lg font-bold text-white">All Developers</h2>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Developers ranked by their current contest rating
              </p>
            </div>

            <div className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-[#0D1017] px-4 py-3 sm:max-w-xs">
              <Search size={17} className="shrink-0 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search developers..."
                className={inputClass}
              />
            </div>
          </div>

          {/* Table Header */}
          <div className="hidden grid-cols-[70px_1fr_180px_130px_130px] gap-4 border-b border-white/[0.07] bg-white/[0.02] px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 md:grid">
            <span>Rank</span>
            <span>Developer</span>
            <span>Developer Level</span>
            <span>Rating</span>
            <span>Max Rating</span>
          </div>

          {filteredUsers.length > 0 ? (
            <div className="divide-y divide-white/[0.05]">
              {filteredUsers.map((user, index) => {
                const rank = index + 1;
                const rating = Number(user.rating) || 0;
                const maxRating = Math.max(
                  rating,
                  Number(user.max_rating) || 0,
                );
                {
                  /* Developer Level */
                }
                <div className="flex items-center justify-between gap-3 md:block">
                  <span className="text-xs text-slate-500 md:hidden">
                    Developer Level
                  </span>

                  <DeveloperRating rating={rating} />
                </div>;

                return (
                  <div
                    key={user.id ?? user.username ?? index}
                    className="grid grid-cols-1 gap-4 px-5 py-5 transition hover:bg-white/[0.025] md:grid-cols-[70px_1fr_180px_130px_130px] md:items-center md:gap-4 md:px-6"
                  >
                    {/* Rank */}
                    <div className="flex items-center gap-3 md:block">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${
                          rank === 1
                            ? "bg-amber-500/10 text-amber-400"
                            : rank === 2
                              ? "bg-slate-400/10 text-slate-300"
                              : rank === 3
                                ? "bg-orange-500/10 text-orange-400"
                                : "bg-white/[0.04] text-slate-400"
                        }`}
                      >
                        {rank <= 3 ? <Trophy size={16} /> : `#${rank}`}
                      </span>

                      <span className="text-xs text-slate-500 md:hidden">
                        Developer Ranking
                      </span>
                    </div>

                    {/* Developer */}
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar user={user} />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {`${user.firstname || ""} ${user.lastname || ""}`.trim() ||
                            user.username ||
                            "Developer"}
                        </p>
                        <p className="mt-1 truncate text-xs text-slate-500">
                          @{user.username || "unknown"}
                        </p>
                      </div>
                    </div>

                    {/* Developer Level */}
                    <div className="flex items-center justify-between gap-3 md:block">
                      <span className="text-xs text-slate-500 md:hidden">
                        Level
                      </span>
                      <DeveloperRating rating={rating ?? 0} />
                    </div>

                    {/* Current Rating */}
                    <div className="flex items-center justify-between gap-3 md:block">
                      <span className="text-xs text-slate-500 md:hidden">
                        Current Rating
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
                        <Star size={15} className="text-amber-400" />
                        {rating}
                      </span>
                    </div>

                    {/* Max Rating */}
                    <div className="flex items-center justify-between gap-3 md:block">
                      <span className="text-xs text-slate-500 md:hidden">
                        Max Rating
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-violet-300">
                        <Zap size={15} />
                        {maxRating}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="px-5 py-16 text-center">
              <Search size={32} className="mx-auto text-slate-600" />
              <h3 className="mt-4 font-semibold text-white">
                No Developers Found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try searching with another name or username.
              </p>
            </div>
          )}

          <div className="flex flex-col items-center justify-between gap-2 border-t border-white/[0.07] bg-white/[0.02] px-5 py-4 text-xs text-slate-500 sm:flex-row sm:px-6">
            <span>
              Showing {filteredUsers.length} of {totalDevelopers} developers
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-400" />
              Rankings based on current rating
            </span>
          </div>
        </section>

        {/* Bottom Note */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <Code2 size={17} className="text-blue-400" />
            Keep Coding. Keep Improving.
          </div>
          <p className="text-xs text-slate-600">
            Your next challenge could take you to the top.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Leaderboard;
