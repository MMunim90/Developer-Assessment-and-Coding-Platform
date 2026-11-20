import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  Trophy,
  Search,
  CalendarDays,
  Clock3,
  ArrowUpRight,
  Radio,
  Code2,
  Sparkles,
  RefreshCw,
  Filter,
  X,
  Users,
} from "lucide-react";

import { baseURL } from "../services/BaseURL";

const statusStyles = {
  upcoming: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  running: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  past: "border-slate-500/20 bg-slate-500/10 text-slate-400",
};

const filters = [
  { label: "All Contests", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Running", value: "running" },
  { label: "Past", value: "past" },
];

const AllContests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch all contests.
  const fetchContests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${baseURL}/contests/all`);

      if (!response.ok) {
        throw new Error("Unable to fetch contests.");
      }

      const data = await response.json();

      setContests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Contest fetching error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  // Search and status filtering.
  const filteredContests = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return contests
      .filter((contest) => {
        const matchesSearch =
          !search ||
          contest.title?.toLowerCase().includes(search) ||
          contest.category?.toLowerCase().includes(search) ||
          contest.writers?.toLowerCase().includes(search) ||
          contest.description?.toLowerCase().includes(search);

        const matchesStatus =
          activeFilter === "all" ||
          contest.status?.toLowerCase() === activeFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const dateA = new Date(a.start_at).getTime();
        const dateB = new Date(b.start_at).getTime();

        // Upcoming contests first, then nearest start date.
        if (activeFilter === "all") {
          const order = {
            running: 0,
            upcoming: 1,
            past: 2,
          };

          const statusDifference =
            (order[a.status?.toLowerCase()] ?? 3) -
            (order[b.status?.toLowerCase()] ?? 3);

          if (statusDifference !== 0) return statusDifference;
        }

        return dateA - dateB;
      });
  }, [contests, searchTerm, activeFilter]);

  // Contest statistics.
  const stats = [
    {
      label: "Total Contests",
      value: contests.length,
      icon: Trophy,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      label: "Upcoming",
      value: contests.filter(
        (item) => item.status?.toLowerCase() === "upcoming",
      ).length,
      icon: CalendarDays,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Running",
      value: contests.filter((item) => item.status?.toLowerCase() === "running")
        .length,
      icon: Radio,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Completed",
      value: contests.filter((item) => item.status?.toLowerCase() === "past")
        .length,
      icon: Clock3,
      color: "text-slate-400",
      bg: "bg-slate-500/10",
    },
  ];

  const formatDate = (date) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "Not specified";

    return parsedDate.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusLabel = (status) => {
    const labels = {
      upcoming: "Upcoming",
      running: "Ongoing",
      past: "Completed",
    };

    return labels[status?.toLowerCase()] || status || "Unknown";
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090D] text-slate-200">
      {/* Hero Section */}
      <section className="relative border-b border-white/[0.06] px-5 pb-14 pt-20 sm:px-8 lg:px-10 lg:pb-20 lg:pt-24">
        <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-violet-600/[0.08] blur-[120px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-blue-600/[0.06] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold text-violet-400">
            <Sparkles size={14} />
            COMPETE. LEARN. IMPROVE.
          </div>

          <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Programming
                <span className="block text-violet-400">Contests</span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Discover programming competitions, challenge your
                problem-solving abilities, and compete with developers. Your
                next coding challenge starts here.
              </p>
            </div>

            <div className="hidden items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#111318] p-5 lg:flex">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                <Code2 size={25} className="text-violet-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Available Competitions</p>
                <p className="mt-1 text-2xl font-bold text-white">
                  {contests.length.toString().padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Statistics */}
          <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/[0.07] bg-[#111318] p-4 transition hover:border-violet-500/20 sm:p-5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-slate-500 sm:text-sm">
                      {item.label}
                    </p>

                    <div className={`rounded-lg p-2 ${item.bg}`}>
                      <Icon size={17} className={item.color} />
                    </div>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                    {item.value}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Search and Filter */}
          <div className="mb-8 rounded-2xl border border-white/[0.07] bg-[#111318] p-4 sm:p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Search Input */}
              <div className="relative w-full lg:max-w-md">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search contests, categories, writers..."
                  className="w-full rounded-xl border border-white/10 bg-[#0D1017] py-3 pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500/50"
                />

                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="mr-1 flex items-center gap-2 text-xs text-slate-500">
                  <Filter size={15} />
                  <span>Filter:</span>
                </div>

                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 ${
                      activeFilter === filter.value
                        ? "border border-violet-500/30 bg-violet-500/15 text-violet-300"
                        : "border border-white/[0.06] bg-white/[0.02] text-slate-400 hover:border-white/15 hover:text-white"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-white">
                {activeFilter === "all"
                  ? "All Contests"
                  : `${filters.find((f) => f.value === activeFilter)?.label} Contests`}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Showing {filteredContests.length} of {contests.length} contests
              </p>
            </div>

            <button
              onClick={fetchContests}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#111318] px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-violet-500/30 hover:text-white disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-[#111318]">
              <RefreshCw size={30} className="animate-spin text-violet-400" />
              <p className="mt-4 text-sm text-slate-500">
                Loading programming contests...
              </p>
            </div>
          ) : error ? (
            /* Error State */
            <div className="rounded-2xl border border-red-500/20 bg-[#111318] px-5 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/10">
                <X size={25} className="text-red-400" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                Unable to Load Contests
              </h3>

              <p className="mt-2 text-sm text-slate-500">{error}</p>

              <button
                onClick={fetchContests}
                className="mt-6 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
              >
                Try Again
              </button>
            </div>
          ) : filteredContests.length > 0 ? (
            /* Contest Cards */
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredContests.map((contest) => {
                const status = contest.status?.toLowerCase();

                return (
                  <article
                    key={contest.id}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111318] transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-950/10"
                  >
                    {/* Cover Image */}
                    <div className="relative h-44 overflow-hidden border-b border-white/[0.06] bg-[#0D1017] sm:h-48">
                      {contest.cover_image ? (
                        <img
                          src={contest.cover_image}
                          alt={contest.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#151126] via-[#111318] to-[#0D1017]">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10">
                            <Trophy size={30} className="text-violet-400" />
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-black/10" />

                      {/* Status */}
                      <div className="absolute left-4 top-4">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize backdrop-blur-md ${
                            statusStyles[status] ||
                            "border-white/10 bg-black/40 text-slate-300"
                          }`}
                        >
                          {status === "running" && <Radio size={12} />}
                          {getStatusLabel(status)}
                        </span>
                      </div>

                      {/* Category */}
                      {contest.category && (
                        <div className="absolute bottom-4 left-4">
                          <span className="rounded-md border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                            {contest.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex-1">
                        <h3 className="line-clamp-2 text-lg font-bold leading-7 text-white transition group-hover:text-violet-300">
                          {contest.title}
                        </h3>

                        <p className="mt-3 line-clamp-3 min-h-[66px] text-sm leading-6 text-slate-500">
                          {contest.description ||
                            "Challenge yourself and improve your programming skills with this competition."}
                        </p>

                        {/* Writer */}
                        {contest.writers && (
                          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                            <Users size={14} className="text-violet-400" />
                            <span>{contest.writers}</span>
                          </div>
                        )}
                      </div>

                      {/* Contest Details */}
                      <div className="mt-6 space-y-3 border-t border-white/[0.07] pt-5">
                        <div className="flex items-center gap-3 text-sm text-slate-400">
                          <CalendarDays
                            size={16}
                            className="shrink-0 text-violet-400"
                          />
                          <span className="truncate">
                            {formatDate(contest.start_at)}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-slate-400">
                          <Clock3
                            size={16}
                            className="shrink-0 text-violet-400"
                          />
                          <span>{contest.length} hours</span>
                        </div>
                      </div>

                      {/* View Contest */}
                      <Link
                        to={`/contests/${contest.id}`}
                        className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-300 transition hover:border-violet-500/40 hover:bg-violet-500/20"
                      >
                        Register
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#111318] px-5 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10">
                <Trophy size={30} className="text-violet-400" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                No Contests Found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
                {searchTerm
                  ? "No contests match your search. Try another keyword."
                  : "There are no contests in this category right now. Check back later for new competitions."}
              </p>

              {(searchTerm || activeFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("all");
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
                >
                  Clear Filters
                  <X size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AllContests;
