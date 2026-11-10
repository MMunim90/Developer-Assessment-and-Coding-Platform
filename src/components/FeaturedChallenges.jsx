import { Link } from "react-router";
import {
  Code2,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Layers3,
} from "lucide-react";

const difficultyStyles = {
  Easy: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Medium: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  Hard: "border-rose-500/20 bg-rose-500/10 text-rose-400",
};

const FeaturedChallenges = ({ challenges = [] }) => {
  return (
    <section className="relative overflow-hidden bg-[#08090D] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Sharpen your skills
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Coding <span className="text-blue-400">Challenges</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              Solve interesting problems, strengthen your logic, and become a
              better problem solver one challenge at a time.
            </p>
          </div>

          <Link
            to="/challenges"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-400 transition hover:gap-3 hover:text-blue-300"
          >
            Explore All Challenges <ArrowRight size={17} />
          </Link>
        </div>

        {challenges.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {challenges.slice(0, 6).map((challenge) => (
              <div
                key={challenge.id}
                className="group flex flex-col rounded-xl border border-white/[0.07] bg-[#111318] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-[#131720]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400">
                    <Braces size={20} />
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${
                      difficultyStyles[challenge.difficulty] ||
                      "border-white/10 bg-white/5 text-slate-400"
                    }`}
                  >
                    {challenge.difficulty || "Unspecified"}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white transition group-hover:text-blue-300">
                  {challenge.title}
                </h3>

                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-6 text-slate-500">
                  {challenge.description || "Explore this coding challenge."}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {(challenge.tags || []).slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Layers3 size={14} />
                    {challenge.category || "Programming"}
                  </div>

                  <Link
                    to={`/challenges/${challenge.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition hover:text-blue-300"
                  >
                    Solve <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/10 bg-[#111318] px-5 py-14 text-center">
            <Code2 size={30} className="mx-auto text-slate-600" />
            <h3 className="mt-4 font-semibold text-white">
              Challenges are waiting for you
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Connect your challenges API to showcase featured problems here.
            </p>
            <Link
              to="/challenges"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300"
            >
              Browse Challenges <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedChallenges;
