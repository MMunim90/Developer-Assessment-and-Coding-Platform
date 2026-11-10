
import { Link } from "react-router";
import {
  Trophy,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Radio,
} from "lucide-react";

const statusStyles = {
  Ongoing: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Upcoming: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  Completed: "border-slate-500/20 bg-slate-500/10 text-slate-400",
};

const ProgrammingContests = ({ contests = [] }) => {
  return (
    <section className="relative overflow-hidden bg-[#08090D] px-5 py-20 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-violet-600/[0.07] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Compete and grow
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Programming <span className="text-violet-400">Contests</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              Challenge yourself, compete with other developers, and put your
              problem-solving skills to the test.
            </p>
          </div>

          <Link
            to="/contests"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-violet-400 transition hover:gap-3 hover:text-violet-300"
          >
            View All Contests <ArrowRight size={17} />
          </Link>
        </div>

        {contests.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contests.slice(0, 3).map((contest) => (
              <div
                key={contest.id}
                className="group overflow-hidden rounded-xl border border-white/[0.07] bg-[#111318] transition duration-300 hover:-translate-y-1 hover:border-violet-500/30"
              >
                <div className="relative border-b border-white/[0.06] bg-[#0D1017] p-6">
                  <div className="absolute right-5 top-5 h-20 w-20 rounded-full bg-violet-500/[0.07] blur-2xl" />

                  <div className="relative flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-400">
                      <Trophy size={21} />
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
                        statusStyles[contest.status] ||
                        "border-white/10 bg-white/5 text-slate-400"
                      }`}
                    >
                      {contest.status === "Ongoing" && (
                        <Radio size={12} />
                      )}
                      {contest.status || "Contest"}
                    </span>
                  </div>

                  <h3 className="relative mt-5 text-lg font-semibold text-white transition group-hover:text-violet-300">
                    {contest.title}
                  </h3>

                  <p className="relative mt-2 line-clamp-2 min-h-10 text-sm leading-6 text-slate-500">
                    {contest.description || "Test your skills in this contest."}
                  </p>
                </div>

                <div className="p-6">
                  <div className="space-y-3">
                    {contest.date && (
                      <div className="flex items-center gap-3 text-sm text-slate-400">
                        <CalendarDays size={16} className="text-violet-400" />
                        <span>{contest.date}</span>
                      </div>
                    )}

                    {contest.duration && (
                      <div className="flex items-center gap-3 text-sm text-slate-400">
                        <Clock3 size={16} className="text-violet-400" />
                        <span>{contest.duration}</span>
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/contests/${contest.id}`}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-violet-500/20 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-300 transition hover:border-violet-500/40 hover:bg-violet-500/15"
                  >
                    View Contest <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/10 bg-[#111318] px-5 py-14 text-center">
            <Trophy size={30} className="mx-auto text-slate-600" />
            <h3 className="mt-4 font-semibold text-white">
              New competitions are on the horizon
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Connect your contests API to display ongoing and upcoming events.
            </p>
            <Link
              to="/contests"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300"
            >
              Explore Contests <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgrammingContests;
