
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Trophy,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Radio,
  Sparkles,
  RefreshCw,
  Code2,
} from "lucide-react";

import { baseURL } from "../services/BaseURL";
import { AuthContext } from "../context/AuthContext";

const ProgrammingContests = () => {
  const { authUser } = useContext(AuthContext);
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingContest = async () => {
      try {
        const response = await fetch(`${baseURL}/contests/all`);

        if (!response.ok) {
          throw new Error("Failed to fetch contests");
        }

        const data = await response.json();

        // Get only upcoming contests and select the nearest one.
        const upcomingContests = data
          .filter((item) => item.status?.toLowerCase() === "upcoming")
          .sort(
            (a, b) =>
              new Date(a.start_at).getTime() -
              new Date(b.start_at).getTime()
          );

        setContest(upcomingContests[0] || null);
      } catch (error) {
        console.error("Error fetching upcoming contest:", error);
        setContest(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingContest();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#08090D] px-5 py-20 sm:px-8 lg:px-10">
      {/* Background Effects */}
      <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-violet-600/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-blue-600/[0.05] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              <Sparkles size={14} />
              Compete and grow
            </div>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Programming{" "}
              <span className="text-violet-400">Contests</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              Challenge yourself, compete with other developers, and prove
              your problem-solving skills through competitive programming.
            </p>
          </div>

          <Link
            to="/contests"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-violet-400 transition hover:gap-3 hover:text-violet-300"
          >
            View All Contests
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex min-h-64 items-center justify-center rounded-2xl border border-white/[0.07] bg-[#111318]">
            <div className="text-center">
              <RefreshCw
                size={27}
                className="mx-auto animate-spin text-violet-400"
              />
              <p className="mt-3 text-sm text-slate-500">
                Finding upcoming contests...
              </p>
            </div>
          </div>
        ) : contest ? (

          /* Featured Contest Card */
          <div className="group relative w-full overflow-hidden rounded-2xl border border-violet-500/20 bg-[#111318] transition duration-300 hover:border-violet-500/40">

            {/* Top Accent */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/70 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px]">

              {/* Main Content */}
              <div className="relative flex flex-col justify-between p-6 sm:p-8 lg:p-10">

                {/* Background Glow */}
                <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-violet-600/[0.07] blur-[100px]" />

                <div className="relative">

                  {/* Badge */}
                  <div className="mb-7 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400">
                      <Sparkles size={13} />
                      Featured Contest
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium capitalize text-blue-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                      Upcoming
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="max-w-3xl text-2xl font-bold leading-tight text-white transition group-hover:text-violet-200 sm:text-3xl lg:text-4xl">
                    {contest.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                    {contest.description ||
                      "Get ready to challenge your programming skills, solve interesting problems, and compete with developers on DACP."}
                  </p>

                  {/* Category */}
                  {contest.category && (
                    <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-300">
                      <Code2 size={14} className="text-violet-400" />
                      {contest.category}
                    </div>
                  )}

                </div>

                {/* Contest Details */}
                <div className="relative mt-9 grid grid-cols-1 gap-4 border-t border-white/[0.07] pt-7 sm:grid-cols-2">

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg border border-violet-500/20 bg-violet-500/10 p-2.5">
                      <CalendarDays
                        size={19}
                        className="text-violet-400"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">
                        Starting Date
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-200">
                        {formatDate(contest.start_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-2.5">
                      <Clock3 size={19} className="text-blue-400" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Contest Duration
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-200">
                        {contest.length} hours
                      </p>
                    </div>
                  </div>

                </div>

                {/* CTA */}
                {
                  authUser && <div className="relative mt-8">
                  <Link
                    to={`/contests/${contest.id}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500 sm:w-auto"
                  >
                    Register
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
                }
              </div>

              {/* Right Visual Panel */}
              <div className="relative hidden min-h-[360px] overflow-hidden border-l border-white/[0.06] bg-[#0D1017] lg:flex lg:items-center lg:justify-center">

                {contest.cover_image ? (
                  <>
                    <img
                      src={contest.cover_image}
                      alt={contest.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#111318] via-[#0D1017]/70 to-[#0D1017]/30" />
                  </>
                ) : (
                  <>
                    <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-violet-600/10 blur-[80px]" />
                    <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-blue-600/10 blur-[80px]" />
                  </>
                )}

                <div className="relative z-10 flex w-full flex-col items-center px-8 text-center">

                  <div className="relative mb-7">
                    <div className="absolute inset-0 rounded-3xl bg-violet-500/20 blur-2xl" />

                    <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-violet-400/20 bg-[#151323]/90 shadow-2xl">
                      <Trophy
                        size={54}
                        strokeWidth={1.4}
                        className="text-violet-400"
                      />
                    </div>
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
                    Developer Challenge
                  </p>

                  <h4 className="mt-3 max-w-xs text-xl font-bold leading-relaxed text-white">
                    Think Faster. Code Smarter.
                  </h4>

                  <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
                    Prepare yourself for the next competitive programming
                    challenge.
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-xs text-slate-500">
                    <Radio size={13} className="text-emerald-400" />
                    <span>Registration opportunity available</span>
                  </div>

                </div>
              </div>

            </div>
          </div>

        ) : (

          /* Empty State */
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#111318] px-5 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10">
              <Trophy size={30} className="text-violet-400" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">
              No Upcoming Contests
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
              There are no upcoming programming contests right now.
              Stay tuned for new challenges and opportunities to compete.
            </p>

            <Link
              to="/contests"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-400 transition hover:gap-3 hover:text-violet-300"
            >
              Explore All Contests
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};

export default ProgrammingContests;
