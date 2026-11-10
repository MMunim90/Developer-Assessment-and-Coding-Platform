import { Link } from "react-router";
import {
  Code2,
  Trophy,
  ClipboardCheck,
  ArrowRight,
  ArrowUpRight,
  Target,
  BrainCircuit,
  ChartNoAxesCombined,
} from "lucide-react";

const platformFeatures = [
  {
    number: "01",
    title: "Coding Challenges",
    description:
      "Practice programming with carefully structured problems. Improve your logic, explore algorithms, and strengthen your problem-solving skills.",
    icon: Code2,
    color: "text-blue-400",
    background: "bg-blue-500/10",
    border: "group-hover:border-blue-500/30",
    link: "/challenges",
    linkText: "Explore Challenges",
  },
  {
    number: "02",
    title: "Programming Contests",
    description:
      "Put your programming skills to the test. Participate in competitions, solve problems under time constraints, and challenge other developers.",
    icon: Trophy,
    color: "text-violet-400",
    background: "bg-violet-500/10",
    border: "group-hover:border-violet-500/30",
    link: "/contests",
    linkText: "Explore Contests",
  },
  {
    number: "03",
    title: "Technical Assessments",
    description:
      "Evaluate your technical knowledge through structured assessments and discover opportunities to improve your programming abilities.",
    icon: ClipboardCheck,
    color: "text-emerald-400",
    background: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/30",
    link: "/assessments",
    linkText: "Explore Assessments",
  },
];

const PlatformOverview = () => {
  return (
    <section className="relative overflow-hidden bg-[#08090D] px-5 py-20 sm:px-8 lg:px-10">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-80 w-96 -translate-x-1/2 rounded-full bg-blue-600/[0.06] blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-600/[0.05] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-blue-400">
            <Target size={14} />
            Explore the platform
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Grow as a Developer
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            DACP brings coding practice, competitive programming, and technical
            evaluation together in one platform. Learn, compete, evaluate, and
            keep improving.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-5 lg:grid-cols-3">
          {platformFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.number}
                className={`group relative overflow-hidden rounded-xl border border-white/[0.07] bg-[#111318] p-7 transition duration-300 hover:-translate-y-1 ${feature.border}`}
              >
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/[0.025] blur-3xl transition group-hover:bg-white/[0.06]" />

                <div className="relative flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.background} ${feature.color}`}
                  >
                    <Icon size={23} />
                  </div>

                  <span className="font-mono text-sm font-semibold text-slate-700">
                    {feature.number}
                  </span>
                </div>

                <h3 className="relative mt-7 text-xl font-bold text-white transition group-hover:text-blue-300">
                  {feature.title}
                </h3>

                <p className="relative mt-3 min-h-24 text-sm leading-7 text-slate-500">
                  {feature.description}
                </p>

                <Link
                  to={feature.link}
                  className={`relative mt-7 inline-flex items-center gap-2 text-sm font-semibold ${feature.color} transition group-hover:gap-3`}
                >
                  {feature.linkText}
                  <ArrowUpRight size={16} />
                </Link>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        {/* How DACP Works */}
        <div className="mt-16 rounded-xl border border-white/[0.07] bg-[#0D1017] p-7 sm:p-10">
          <div className="mb-10 text-center">
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              Your Journey with DACP
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              A simple path toward becoming a better developer.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BrainCircuit,
                title: "Learn",
                description: "Understand concepts and explore programming.",
              },
              {
                icon: Code2,
                title: "Practice",
                description: "Solve problems and strengthen your logic.",
              },
              {
                icon: Trophy,
                title: "Compete",
                description: "Challenge yourself through programming contests.",
              },
              {
                icon: ChartNoAxesCombined,
                title: "Improve",
                description: "Evaluate your performance and keep progressing.",
              },
            ].map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="relative text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                    <Icon size={22} />
                  </div>

                  <h4 className="mt-4 font-semibold text-white">
                    {step.title}
                  </h4>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    {step.description}
                  </p>

                  <span className="mt-3 inline-block font-mono text-xs text-slate-700">
                    STEP 0{index + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Link */}
        <div className="mt-9 text-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-blue-400"
          >
            Learn more about DACP
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PlatformOverview;
