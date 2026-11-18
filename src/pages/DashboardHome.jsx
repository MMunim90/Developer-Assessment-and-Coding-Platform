import { useContext } from "react";
import { Link } from "react-router";
import {
  Code2,
  Trophy,
  ClipboardCheck,
  Target,
  Flame,
  ArrowUpRight,
  Clock3,
  Terminal,
  CalendarDays,
  ChevronRight,
  Activity,
  FileCode2,
  Sparkles,
  Play,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const DashboardHome = () => {
  const { authUser } = useContext(AuthContext);

  const firstName = authUser?.firstname || "Developer";

  // Replace these sample values with real API data.
  const stats = [
    {
      title: "Problems Solved",
      value: "0",
      description: "Start solving challenges",
      icon: Code2,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/15",
      path: "/dashboard/challenges",
    },
    {
      title: "Total Submissions",
      value: "0",
      description: "Your coding attempts",
      icon: FileCode2,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/15",
      path: "/dashboard/submissions",
    },
    {
      title: "Contests Joined",
      value: "0",
      description: "Participate and compete",
      icon: Trophy,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/15",
      path: "/dashboard/myContests",
    },
    {
      title: "Assessments",
      value: "0",
      description: "Test your knowledge",
      icon: ClipboardCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/15",
      path: "/dashboard/myAssessments",
    },
  ];

  const quickActions = [
    {
      title: "Solve Challenges",
      description: "Practice your problem-solving skills.",
      icon: Code2,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      path: "/dashboard/challenges",
    },
    {
      title: "Join Contests",
      description: "Compete with other developers.",
      icon: Trophy,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      path: "/dashboard/myContests",
    },
    {
      title: "Take Assessments",
      description: "Evaluate your technical knowledge.",
      icon: Target,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      path: "/dashboard/myAssessments",
    },
  ];

  // Replace with the user's actual recent submissions from your API.
  const recentSubmissions = [];

  // Replace with upcoming contest data from your API.
  const upcomingContests = [];

  return (
    <div className="mx-auto max-w-[1600px] space-y-8">
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-2xl border border-blue-500/15 bg-[#111722] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 right-1/3 h-64 w-64 rounded-full bg-violet-500/10 blur-[100px]" />

        <div className="relative z-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5">
              <Sparkles size={14} className="text-blue-400" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-300">
                Developer Workspace
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Welcome back, <span className="text-blue-400">{firstName}!</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Every great developer starts with a single line of code. Keep
              practicing, challenge yourself, and take your coding skills to the
              next level.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/dashboard/challenges"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                <Code2 size={17} />
                Explore Challenges
                <ArrowUpRight size={16} />
              </Link>

              <Link
                to="/dashboard/progress"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
              >
                View My Progress
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {/* Decorative Code Card */}
          <div className="hidden w-full max-w-sm rounded-xl border border-white/10 bg-[#090C12]/90 p-4 shadow-2xl lg:block">
            <div className="mb-4 flex items-center justify-between border-b border-white/[0.07] pb-3">
              <div className="flex items-center gap-2">
                <Terminal size={15} className="text-blue-400" />
                <span className="text-xs font-medium text-slate-300">
                  your_journey.js
                </span>
              </div>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-400/70" />
                <span className="h-2 w-2 rounded-full bg-amber-400/70" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs leading-6">
              <p>
                <span className="text-violet-400">const</span>{" "}
                <span className="text-blue-300">developer</span> = {"{"}
              </p>
              <p className="pl-5">
                <span className="text-slate-400">goal:</span>{" "}
                <span className="text-emerald-300">"Keep Learning"</span>,
              </p>
              <p className="pl-5">
                <span className="text-slate-400">practice:</span>{" "}
                <span className="text-amber-300">"Every Day"</span>,
              </p>
              <p className="pl-5">
                <span className="text-slate-400">mindset:</span>{" "}
                <span className="text-emerald-300">"Never Give Up"</span>
              </p>
              <p>{"};"}</p>
              <p className="pt-2 text-blue-400">
                <span className="text-violet-400">return</span> developer.
                <span className="text-amber-300">success</span>();
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-3">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-[10px] text-slate-500">
                Ready for your next challenge
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Your Overview</h2>
            <p className="mt-1 text-xs text-slate-500">
              A quick look at your developer activities.
            </p>
          </div>

          <Activity size={19} className="text-blue-400" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Link
                to={stat.path}
                key={stat.title}
                className={`group rounded-xl border ${stat.border} bg-[#111318] p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-[#141923]`}
              >
                <div className="flex items-start justify-between">
                  <div className={`rounded-xl ${stat.bg} p-3`}>
                    <Icon size={21} className={stat.color} />
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="text-slate-600 transition group-hover:text-blue-400"
                  />
                </div>

                <p className="mt-5 text-3xl font-bold text-white">
                  {stat.value}
                </p>

                <h3 className="mt-1 text-sm font-semibold text-slate-300">
                  {stat.title}
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                  {stat.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-bold text-white">Quick Actions</h2>
          <p className="mt-1 text-xs text-slate-500">
            What would you like to work on today?
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                to={action.path}
                className="group flex items-center gap-4 rounded-xl border border-white/[0.07] bg-[#111318] p-5 transition hover:border-blue-500/25 hover:bg-[#141923]"
              >
                <div className={`shrink-0 rounded-xl ${action.bg} p-3.5`}>
                  <Icon size={23} className={action.color} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-slate-200 transition group-hover:text-blue-300">
                    {action.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {action.description}
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="shrink-0 text-slate-600 transition group-hover:translate-x-1 group-hover:text-blue-400"
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Activity and Contests */}
      <section className="grid gap-5 xl:grid-cols-5">
        {/* Recent Submissions */}
        <div className="rounded-xl border border-white/[0.07] bg-[#111318] p-5 xl:col-span-3">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">
                Recent Submissions
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Track your latest coding attempts.
              </p>
            </div>

            <Link
              to="/dashboard/submissions"
              className="flex items-center gap-1 text-xs font-semibold text-blue-400 transition hover:text-blue-300"
            >
              View All
              <ChevronRight size={15} />
            </Link>
          </div>

          {recentSubmissions.length > 0 ? (
            <div className="space-y-3">
              {recentSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.05] bg-[#0D1017] p-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="rounded-lg bg-blue-500/10 p-2">
                      <Code2 size={18} className="text-blue-400" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-slate-200">
                        {submission.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {submission.language} · {submission.date}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-md px-2.5 py-1 text-[10px] font-semibold ${
                      submission.status === "Accepted"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#0D1017] px-4 text-center">
              <div className="mb-3 rounded-xl bg-blue-500/10 p-3">
                <Terminal size={24} className="text-blue-400" />
              </div>

              <h3 className="text-sm font-semibold text-slate-200">
                No submissions yet
              </h3>

              <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500">
                Your coding submissions will appear here once you start solving
                challenges.
              </p>

              <Link
                to="/dashboard/challenges"
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300"
              >
                Start Coding
                <ArrowUpRight size={15} />
              </Link>
            </div>
          )}
        </div>

        {/* Upcoming Contests */}
        <div className="rounded-xl border border-white/[0.07] bg-[#111318] p-5 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">
                Upcoming Contests
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Get ready to compete.
              </p>
            </div>

            <div className="rounded-lg bg-amber-500/10 p-2">
              <Trophy size={18} className="text-amber-400" />
            </div>
          </div>

          {upcomingContests.length > 0 ? (
            <div className="space-y-3">
              {upcomingContests.map((contest) => (
                <div
                  key={contest.id}
                  className="rounded-lg border border-white/[0.06] bg-[#0D1017] p-4"
                >
                  <h3 className="text-sm font-semibold text-slate-200">
                    {contest.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <CalendarDays size={14} />
                    {contest.date}
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <Clock3 size={14} />
                    {contest.duration}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#0D1017] px-4 text-center">
              <div className="mb-3 rounded-xl bg-amber-500/10 p-3">
                <CalendarDays size={24} className="text-amber-400" />
              </div>

              <h3 className="text-sm font-semibold text-slate-200">
                No upcoming contests
              </h3>

              <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500">
                New programming contests will appear here when available.
              </p>

              <Link
                to="/contests"
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                Explore Contests
                <ArrowUpRight size={15} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Developer Motivation */}
      <section className="relative overflow-hidden rounded-xl border border-violet-500/15 bg-gradient-to-r from-[#15152A] via-[#111827] to-[#111318] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-[90px]" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-xl border border-violet-400/20 bg-violet-500/10 p-3">
              <Flame size={25} className="text-violet-400" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                Consistency builds great developers.
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-6 text-slate-400 sm:text-sm">
                You don't need to solve every problem today. Just solve one,
                learn something new, and keep moving forward.
              </p>
            </div>
          </div>

          <Link
            to="/dashboard/challenges"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-violet-400/20 bg-violet-500/10 px-5 py-3 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20"
          >
            <Play size={16} />
            Start Practicing
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;
