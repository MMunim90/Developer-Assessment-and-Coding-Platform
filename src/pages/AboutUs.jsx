
import {
  Code2,
  Target,
  Eye,
  Heart,
  Users,
  Lightbulb,
  ArrowRight,
  Trophy,
  Terminal,
  BrainCircuit,
  CheckCircle2,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router";

const values = [
  {
    icon: BrainCircuit,
    title: "Learn by Solving",
    description:
      "We believe the best way to improve programming skills is through consistent practice, problem-solving, and real coding challenges.",
  },
  {
    icon: Trophy,
    title: "Fair Competition",
    description:
      "We encourage healthy competition where developers can challenge themselves, measure their progress, and learn from others.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Growth",
    description:
      "Technology never stops evolving. We promote curiosity, continuous learning, and the development of practical technical skills.",
  },
];

const features = [
  {
    icon: Code2,
    title: "Coding Challenges",
    description:
      "Practice programming problems and strengthen your problem-solving abilities.",
    number: "01",
  },
  {
    icon: Trophy,
    title: "Programming Contests",
    description:
      "Compete with other developers and test your skills under time constraints.",
    number: "02",
  },
  {
    icon: ShieldCheck,
    title: "Technical Assessments",
    description:
      "Evaluate your programming knowledge and measure your technical abilities.",
    number: "03",
  },
];

const AboutUs = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08090D] text-slate-100">

      {/* Hero Section */}
      <section className="relative border-b border-white/[0.06]">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/[0.12] blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:py-32 lg:grid-cols-2">

          {/* Hero Content */}
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.08] px-4 py-2 text-sm font-medium text-blue-300">
              <Code2 size={16} />
              Discover the story behind DACP
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Build Skills.
              <br />
              Write Code.
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Prove Your Worth.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 md:text-lg">
              DACP is a developer-focused platform designed to help programmers
              practice coding, participate in competitions, evaluate their
              technical skills, and grow through continuous problem-solving.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/challenges"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                Explore Challenges
                <ArrowRight size={18} />
              </Link>

              <a
                href="#our-mission"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              >
                Learn About Us
              </a>
            </div>

            {/* Highlights */}
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-4">
              {["Practice", "Compete", "Improve"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-400" />
                  <span className="text-sm text-slate-400">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Editor Preview */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-3xl bg-gradient-to-br from-blue-500/15 to-violet-500/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#10131A] shadow-2xl shadow-black/40">

              {/* Editor Header */}
              <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#151922] px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Code2 size={14} className="text-blue-400" />
                  solution.cpp
                </div>

                <Terminal size={17} className="text-slate-500" />
              </div>

              {/* Editor Body */}
              <div className="flex">
                <div className="select-none border-r border-white/[0.06] bg-[#0D1016] px-4 py-6 text-right font-mono text-xs leading-8 text-slate-600">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                <div className="overflow-x-auto p-5 font-mono text-xs leading-8 sm:text-sm">
                  <p>
                    <span className="text-violet-400">#include</span>{" "}
                    <span className="text-green-300">&lt;iostream&gt;</span>
                  </p>
                  <p className="text-slate-500">// Solve. Practice. Improve.</p>
                  <p>
                    <span className="text-violet-400">using namespace</span>{" "}
                    <span className="text-blue-300">std</span>;
                  </p>
                  <p>&nbsp;</p>
                  <p>
                    <span className="text-blue-400">int</span>{" "}
                    <span className="text-yellow-300">main</span>() {"{"}
                  </p>
                  <p className="pl-5">
                    <span className="text-blue-400">int</span> skills ={" "}
                    <span className="text-orange-300">0</span>;
                  </p>
                  <p className="pl-5">
                    <span className="text-violet-400">while</span> (true) {"{"}
                  </p>
                  <p className="pl-10">
                    practice();
                  </p>
                  <p className="pl-10">
                    skills++;
                  </p>
                  <p className="pl-5">{"}"}</p>
                  <p className="pl-5">
                    <span className="text-violet-400">return</span>{" "}
                    <span className="text-orange-300">0</span>;
                  </p>
                  <p>{"}"}</p>
                </div>
              </div>

              {/* Editor Footer */}
              <div className="flex items-center justify-between border-t border-white/[0.07] bg-[#0D1016] px-5 py-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Ready to code
                </div>
                <span className="text-xs text-slate-500">
                  C++ · UTF-8
                </span>
              </div>
            </div>

            {/* Floating Status */}
            <div className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-xl border border-white/10 bg-[#171B24] p-4 shadow-xl sm:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <Zap size={21} className="text-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Keep Improving
                </p>
                <p className="text-xs text-slate-500">
                  Every problem makes you better
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              About DACP
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
              A platform built for developers who never stop learning.
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              Becoming a better programmer requires more than learning syntax.
              It takes consistent practice, logical thinking, and the ability
              to solve problems efficiently.
            </p>

            <p className="mt-4 leading-8 text-slate-400">
              DACP brings coding challenges, programming competitions, and
              technical assessments together in one place. Our goal is to
              provide an organized environment where developers can challenge
              themselves and improve their programming abilities.
            </p>
          </div>

          {/* Platform Features */}
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.number}
                  className="group rounded-2xl border border-white/[0.07] bg-[#111318] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-[#141923] sm:last:col-span-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/10">
                      <Icon size={23} className="text-blue-400" />
                    </div>

                    <span className="font-mono text-xs text-slate-600">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section
        id="our-mission"
        className="border-y border-white/[0.06] bg-[#0D1017]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Our Purpose
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Empowering the next generation of developers.
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              We want to make programming practice more accessible,
              competitive, and rewarding for every developer.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Mission */}
            <article className="rounded-2xl border border-white/[0.07] bg-[#11151D] p-8 transition hover:border-blue-400/30 md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10">
                <Target size={27} className="text-blue-400" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                Our Mission
              </h3>

              <p className="mt-4 leading-8 text-slate-400">
                To create a developer-friendly platform that helps programmers
                strengthen their problem-solving skills through coding
                challenges, competitive programming, and structured technical
                assessments.
              </p>
            </article>

            {/* Vision */}
            <article className="rounded-2xl border border-white/[0.07] bg-[#11151D] p-8 transition hover:border-violet-400/30 md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10">
                <Eye size={27} className="text-violet-400" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                Our Vision
              </h3>

              <p className="mt-4 leading-8 text-slate-400">
                To build an engaging learning and evaluation ecosystem where
                developers can continuously improve, demonstrate their
                abilities, and grow through meaningful programming
                experiences.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">

        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            What We Believe
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            The principles behind DACP.
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Our platform is shaped by the values that make developers better
            problem-solvers and lifelong learners.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.title}
                className="group rounded-2xl border border-white/[0.07] bg-[#111318] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-950/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/10 ring-1 ring-blue-400/10">
                  <Icon size={24} className="text-blue-400" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-blue-400/15 bg-[#111722] px-7 py-16 text-center md:px-14 md:py-20">

          {/* Background Effects */}
          <div className="pointer-events-none absolute -left-24 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-violet-600/15 blur-[110px]" />

          <div className="relative z-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
              <Heart size={27} className="text-blue-400" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
              Your Journey Starts Here
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
              Ready to level up your coding skills?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
              Take on new challenges, test your knowledge, and become a better
              problem-solver. Your next coding milestone starts with one
              problem.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                to="/challenges"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                Start Solving
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.09] hover:text-white"
              >
                Join DACP
                <Users size={17} />
              </Link>
            </div>

            <p className="mt-8 text-xs font-medium tracking-widest text-slate-600">
              CODE. COMPETE. EVALUATE. EXCEL.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
