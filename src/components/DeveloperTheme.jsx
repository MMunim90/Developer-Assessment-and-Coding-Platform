import { Link } from "react-router";
import {
  Code2,
  Terminal,
  Trophy,
  Braces,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const DeveloperTheme = () => {
  return (
    <section className="relative flex min-h-[480px] flex-col justify-between overflow-hidden border-b border-white/[0.06] px-6 py-8 sm:px-10 lg:min-h-screen lg:border-b-0 lg:border-r lg:border-white/[0.06] lg:px-14 xl:px-20 hidden lg:block">
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-600/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px]" />

      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      {/* Brand */}
      <Link to="/" className="relative z-10 flex w-fit items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
          <Code2 size={25} />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            DACP<span className="text-blue-400">.</span>
          </h1>
          <p className="text-[10px] font-medium tracking-[0.2em] text-slate-500">
            DEVELOPER PLATFORM
          </p>
        </div>
      </Link>

      {/* Main Content */}
      <div className="relative z-10 mx-auto my-14 w-full max-w-xl lg:my-0 lg:py-14">
        {/* Badge */}
        <div className="mb-7 flex w-fit items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.07] px-4 py-2">
          <Sparkles size={14} className="text-blue-400" />
          <span className="text-xs font-medium text-blue-300">
            Your Developer Journey Starts Here
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl xl:text-6xl">
          Think. Code.
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Compete.
          </span>
          <br />
          Excel.
        </h2>

        <p className="mt-6 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
          Sharpen your programming skills, solve real-world coding challenges,
          compete with developers, and prove what you can do.
        </p>

        {/* Code Editor Preview */}
        <div className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-[#0D1017] shadow-2xl shadow-blue-950/20">
          {/* Editor Header */}
          <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#131720] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              <span className="ml-3 text-xs text-slate-500">solution.cpp</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Terminal size={14} />
              C++
            </div>
          </div>

          {/* Editor Code */}
          <div className="overflow-hidden px-4 py-5 font-mono text-xs leading-7 sm:px-6 sm:text-sm">
            <div className="flex gap-5">
              <div className="select-none text-right text-slate-700">
                {Array.from({ length: 9 }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              <div className="min-w-0">
                <div>
                  <span className="text-violet-400">#include</span>{" "}
                  <span className="text-green-300">&lt;bits/stdc++.h&gt;</span>
                </div>
                <div className="text-slate-400">using namespace std;</div>
                <div />
                <div>
                  <span className="text-violet-400">int</span>{" "}
                  <span className="text-blue-300">main</span>() {"{"}
                </div>
                <div className="pl-5">
                  <span className="text-violet-400">int</span>{" "}
                  <span className="text-slate-200">score</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-orange-300">100</span>;
                </div>
                <div className="pl-5">
                  <span className="text-blue-300">cout</span>{" "}
                  <span className="text-slate-400">&lt;&lt;</span>{" "}
                  <span className="text-green-300">"Keep Learning!"</span>;
                </div>
                <div className="pl-5">
                  <span className="text-violet-400">return</span>{" "}
                  <span className="text-orange-300">0</span>;
                </div>
                <div>{"}"}</div>
              </div>
            </div>
          </div>

          {/* Editor Footer */}
          <div className="flex items-center justify-between border-t border-white/[0.07] bg-[#131720] px-4 py-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Ready to compile
            </div>
            <span className="text-xs text-slate-500">UTF-8</span>
          </div>
        </div>

        {/* Platform Highlights */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 sm:p-4">
            <Braces size={20} className="mb-3 text-blue-400" />
            <h3 className="text-xs font-semibold sm:text-sm">Challenges</h3>
            <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
              Solve problems
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 sm:p-4">
            <Trophy size={20} className="mb-3 text-violet-400" />
            <h3 className="text-xs font-semibold sm:text-sm">Contests</h3>
            <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
              Compete & win
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 sm:p-4">
            <CheckCircle2 size={20} className="mb-3 text-emerald-400" />
            <h3 className="text-xs font-semibold sm:text-sm">Assessments</h3>
            <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
              Test your skills
            </p>
          </div>
        </div>
      </div>

      {/* Left Footer */}
      <div className="relative z-10 hidden items-center justify-between border-t border-white/[0.07] pt-5 text-xs text-slate-600 lg:flex">
        <span>© {new Date().getFullYear()} DACP</span>
        <span>Code. Compete. Evaluate. Excel.</span>
      </div>
    </section>
  );
};

export default DeveloperTheme;
