import { Link } from "react-router";
import {
  Code2,
  ArrowRight,
  Terminal,
  Braces,
  Trophy,
  Sparkles,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const FinalCTA = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <section className="relative overflow-hidden bg-[#08090D] px-5 py-20 sm:px-8 lg:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-blue-500/20 bg-[#111827]">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-32 h-80 w-80 rounded-full bg-blue-500/15 blur-[100px]" />
          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-violet-500/15 blur-[120px]" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="relative grid items-center gap-12 px-7 py-14 sm:px-12 sm:py-16 lg:grid-cols-[1fr_0.7fr] lg:px-16">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-medium text-blue-300">
              <Sparkles size={14} />
              Your coding journey starts here
            </div>

            <h2 className="mt-7 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Level Up Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Coding Skills?
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Start solving problems, compete with developers, and challenge
              yourself to become better every day. Your next achievement begins
              with one line of code.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {!authUser && (
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Get Started Free <ArrowRight size={17} />
                </Link>
              )}

              {authUser && (
                <Link
                  to="/challenges"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08]"
                >
                  Explore Challenges <Code2 size={17} />
                </Link>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <Code2 size={14} className="text-blue-400" />
                Solve Problems
              </span>
              <span className="flex items-center gap-2">
                <Trophy size={14} className="text-violet-400" />
                Compete
              </span>
              <span className="flex items-center gap-2">
                <Braces size={14} className="text-emerald-400" />
                Improve Skills
              </span>
            </div>
          </div>

          {/* Decorative Code Panel */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-2xl bg-blue-500/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#080D18] shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Terminal size={14} />
                  solution.cpp
                </div>
              </div>

              <div className="space-y-3 p-5 font-mono text-xs leading-6 sm:p-7 sm:text-sm">
                <p className="text-slate-600">
                  <span className="mr-4 text-slate-700">01</span>
                  // Your next challenge begins
                </p>

                <p className="text-violet-400">
                  <span className="mr-4 text-slate-700">02</span>
                  #include &lt;iostream&gt;
                </p>

                <p className="text-blue-300">
                  <span className="mr-4 text-slate-700">03</span>
                  using namespace std;
                </p>

                <p className="text-slate-300">
                  <span className="mr-4 text-slate-700">04</span>
                  int main() {"{"}
                </p>

                <p className="text-emerald-300">
                  <span className="mr-4 text-slate-700">05</span>
                  {"  "}cout &lt;&lt; "Hello, DACP!";
                </p>

                <p className="text-amber-300">
                  <span className="mr-4 text-slate-700">06</span>
                  {"  "}return 0;
                </p>

                <p className="text-slate-300">
                  <span className="mr-4 text-slate-700">07</span>
                  {"}"}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.07] bg-white/[0.02] px-5 py-4">
                <span className="flex items-center gap-2 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Ready to compile
                </span>

                <span className="text-xs text-slate-600">C++ · 17</span>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-xl border border-white/10 bg-[#111827] px-4 py-3 shadow-xl sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <Trophy size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  Keep improving
                </p>
                <p className="mt-1 text-[10px] text-slate-500">
                  One problem at a time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
