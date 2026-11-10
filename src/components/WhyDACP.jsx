import {
  Code2,
  BrainCircuit,
  Trophy,
  ChartNoAxesCombined,
  Target,
  Users,
  CheckCircle2,
} from "lucide-react";

const benefits = [
  {
    icon: Code2,
    title: "Practice Real Problems",
    description:
      "Improve your coding ability by solving programming challenges across different difficulty levels.",
    color: "text-blue-400",
    background: "bg-blue-500/10",
    border: "group-hover:border-blue-500/30",
  },
  {
    icon: BrainCircuit,
    title: "Build Problem-Solving Skills",
    description:
      "Develop logical thinking and learn to approach complex programming problems efficiently.",
    color: "text-violet-400",
    background: "bg-violet-500/10",
    border: "group-hover:border-violet-500/30",
  },
  {
    icon: Trophy,
    title: "Compete With Developers",
    description:
      "Challenge yourself through programming contests and measure your skills through competition.",
    color: "text-amber-400",
    background: "bg-amber-500/10",
    border: "group-hover:border-amber-500/30",
  },
  {
    icon: Target,
    title: "Evaluate Your Skills",
    description:
      "Test your programming knowledge and technical abilities through structured assessments.",
    color: "text-emerald-400",
    background: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/30",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Track Your Progress",
    description:
      "Monitor your coding journey and understand your performance as you continue learning.",
    color: "text-cyan-400",
    background: "bg-cyan-500/10",
    border: "group-hover:border-cyan-500/30",
  },
  {
    icon: Users,
    title: "Grow as a Developer",
    description:
      "Stay motivated, learn consistently, and become part of a community of problem solvers.",
    color: "text-pink-400",
    background: "bg-pink-500/10",
    border: "group-hover:border-pink-500/30",
  },
];

const WhyDACP = () => {
  return (
    <section className="relative overflow-hidden bg-[#08090D] px-5 py-20 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-600/[0.06] blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-violet-600/[0.06] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Why choose DACP
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            More Than Just a{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Coding Platform
            </span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
            Everything you need to practice, compete, evaluate your abilities,
            and become a better developer.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className={`group relative overflow-hidden rounded-xl border border-white/[0.07] bg-[#111318] p-6 transition duration-300 hover:-translate-y-1 ${benefit.border}`}
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/[0.02] blur-2xl transition group-hover:bg-white/[0.05]" />

                <div className="relative flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${benefit.background} ${benefit.color}`}
                  >
                    <Icon size={22} />
                  </div>

                  <span className="text-xs font-medium text-slate-700">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="relative mt-6 text-lg font-semibold text-white">
                  {benefit.title}
                </h3>

                <p className="relative mt-3 text-sm leading-7 text-slate-500">
                  {benefit.description}
                </p>

                <div className="relative mt-5 flex items-center gap-2 text-xs font-medium text-slate-600 transition group-hover:text-blue-400">
                  <CheckCircle2 size={14} />
                  <span>Part of your coding journey</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyDACP;
