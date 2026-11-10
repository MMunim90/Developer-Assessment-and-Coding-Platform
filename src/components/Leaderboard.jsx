import { Link } from "react-router";
import {
  Trophy,
  Medal,
  Crown,
  ArrowRight,
} from "lucide-react";

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

const Leaderboard = ({ developers = [] }) => {
  const topThree = developers.slice(0, 3);
  const remainingDevelopers = developers.slice(3, 8);

  return (
    <section className="relative overflow-hidden bg-[#08090D] px-5 py-20 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute left-1/2 top-20 h-80 w-96 -translate-x-1/2 rounded-full bg-blue-600/[0.07] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Recognize excellence
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

        {developers.length > 0 ? (
          <>
            {/* Top Three */}
            <div className="mb-8 grid items-end gap-4 md:grid-cols-3">
              {topThree.map((developer, index) => {
                const style = rankStyles[index];
                const Icon = style.icon;

                return (
                  <div
                    key={developer.id}
                    className={`relative overflow-hidden rounded-xl border ${style.border} bg-[#111318] p-6 text-center ${
                      index === 0
                        ? "md:order-2 md:py-10"
                        : index === 1
                          ? "md:order-1"
                          : "md:order-3"
                    }`}
                  >
                    <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-white/[0.03] blur-2xl" />

                    <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#0D1017] text-xl font-bold text-white">
                      {(developer.name || "D").charAt(0).toUpperCase()}
                    </div>

                    <div
                      className={`relative mx-auto mt-4 flex h-9 w-9 items-center justify-center rounded-lg ${style.background} ${style.color}`}
                    >
                      <Icon size={19} />
                    </div>

                    <p className="relative mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Rank #{index + 1}
                    </p>

                    <h3 className="relative mt-2 truncate text-lg font-bold text-white">
                      {developer.name}
                    </h3>

                    <p className="relative mt-2 text-sm text-slate-400">
                      {developer.solved ?? "—"} Problems Solved
                    </p>

                    <div className="relative mt-5 border-t border-white/[0.07] pt-4">
                      <p className={`text-2xl font-bold ${style.color}`}>
                        {developer.points ?? "—"}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">Points</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Remaining Rankings */}
            {remainingDevelopers.length > 0 && (
              <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#111318]">
                <div className="grid grid-cols-[55px_1fr_100px_100px] gap-3 border-b border-white/[0.07] bg-[#0D1017] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:grid-cols-[70px_1fr_130px_130px]">
                  <span>Rank</span>
                  <span>Developer</span>
                  <span className="text-center">Solved</span>
                  <span className="text-right">Points</span>
                </div>

                {remainingDevelopers.map((developer, index) => (
                  <div
                    key={developer.id}
                    className="grid grid-cols-[55px_1fr_100px_100px] items-center gap-3 border-b border-white/[0.05] px-5 py-4 last:border-0 transition hover:bg-white/[0.025] sm:grid-cols-[70px_1fr_130px_130px]"
                  >
                    <span className="text-sm font-semibold text-slate-500">
                      #{index + 4}
                    </span>

                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0D1017] text-sm font-semibold text-blue-300">
                        {(developer.name || "D").charAt(0).toUpperCase()}
                      </div>

                      <span className="truncate text-sm font-medium text-slate-200">
                        {developer.name}
                      </span>
                    </div>

                    <span className="text-center text-sm text-slate-400">
                      {developer.solved ?? "—"}
                    </span>

                    <span className="text-right text-sm font-semibold text-blue-400">
                      {developer.points ?? "—"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-white/10 bg-[#111318] px-5 py-14 text-center">
            <Trophy size={30} className="mx-auto text-slate-600" />
            <h3 className="mt-4 font-semibold text-white">
              Your next achievement starts here
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
