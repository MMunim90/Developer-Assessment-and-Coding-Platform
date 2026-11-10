import { Code2, Users, Trophy, Send, TrendingUp } from "lucide-react";

const defaultStats = [
  { label: "Total Problems", value: "—", icon: Code2, suffix: "+" },
  { label: "Developers", value: "—", icon: Users, suffix: "+" },
  { label: "Contests", value: "—", icon: Trophy, suffix: "+" },
  { label: "Submissions", value: "—", icon: Send, suffix: "+" },
];

const PlatformStats = ({ stats = defaultStats }) => {
  return (
    <section className="relative overflow-hidden bg-[#08090D] px-5 py-20 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-96 -translate-x-1/2 rounded-full bg-blue-600/[0.07] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            DACP by the numbers
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Platform <span className="text-blue-400">Statistics</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
            A growing community built around coding, competition, and continuous
            improvement.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-xl border border-white/[0.07] bg-[#111318] p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 sm:p-7"
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-500/[0.05] blur-2xl transition group-hover:bg-blue-500/10" />

                <div className="relative flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400">
                    <Icon size={21} />
                  </div>

                  <TrendingUp
                    size={17}
                    className="text-slate-700 transition group-hover:text-blue-400"
                  />
                </div>

                <div className="relative mt-7">
                  <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {stat.value}
                    {stat.value !== "—" && stat.suffix}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;
