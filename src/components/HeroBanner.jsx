import { Link } from "react-router";
import {
  Code2,
  Trophy,
  ClipboardCheck,
  ArrowRight,
  Play,
  Terminal,
  CheckCircle2,
  CircleDot,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const HeroBanner = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <section className="relative overflow-hidden bg-[#08090D] text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute top-[300px] left-[-200px] w-[350px] h-[350px] rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="absolute top-[300px] right-[-200px] w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-24 md:pt-32 pb-16">
        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            <span className="text-xs sm:text-sm text-slate-300 tracking-wide">
              Your Journey to Coding Excellence Starts Here
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.12]">
            Master Your Code.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Prove Your Skills.
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto mt-7 text-sm sm:text-base md:text-lg leading-8 text-slate-400">
            Challenge yourself with real-world coding problems, participate in
            programming contests, and evaluate your technical skills. Everything
            you need to become a better developer, in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-9">
            {authUser && (
              <Link
                to="/challenges"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                Explore Challenges
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            )}

            {!authUser && (
              <Link
                to="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <Play size={17} />
                Get Started Free
              </Link>
            )}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mt-20 mb-14">
          <div className="flex items-center justify-center gap-3 p-4 border-y sm:border-y-0 sm:border-x border-white/[0.08]">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-500/10 border border-blue-400/10 flex items-center justify-center">
              <Code2 size={20} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">
                Coding Challenges
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Improve your problem solving
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-4 border-b sm:border-b-0 sm:border-r border-white/[0.08]">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-violet-500/10 border border-violet-400/10 flex items-center justify-center">
              <Trophy size={20} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">
                Programming Contests
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Compete with developers
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-4">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-indigo-500/10 border border-indigo-400/10 flex items-center justify-center">
              <ClipboardCheck size={20} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">
                Skill Assessments
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Evaluate your skills
              </p>
            </div>
          </div>
        </div>

        {/* Coding Editor Preview */}
        <div className="relative max-w-5xl mx-auto">
          {/* Glow Behind Editor */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-blue-500/10 blur-2xl" />

          <div className="relative rounded-2xl border border-white/10 bg-[#101116] shadow-2xl shadow-black/60 overflow-hidden">
            {/* Editor Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-white/[0.08] bg-[#14151B]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <span className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>

                <div className="h-5 w-px bg-white/10 mx-1" />

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Code2 size={16} className="text-blue-400" />
                  coding-challenge.cpp
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CircleDot size={13} className="text-green-400" />
                C++17
              </div>
            </div>

            {/* Editor Body */}
            <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.5fr]">
              {/* Problem Panel */}
              <div className="p-5 sm:p-7 border-b md:border-b-0 md:border-r border-white/[0.08]">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Problem Description
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold text-green-400 bg-green-400/10">
                    Easy
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-3">
                  Two Sum
                </h3>

                <p className="text-sm leading-6 text-slate-400">
                  Given an array of integers and a target value, return the
                  indices of two numbers that add up to the target.
                </p>

                <div className="mt-7">
                  <p className="text-xs font-semibold text-slate-300 mb-3">
                    Example
                  </p>

                  <div className="rounded-lg bg-[#090B10] border border-white/[0.07] p-4 font-mono text-xs leading-6">
                    <p className="text-slate-500">
                      Input:
                      <span className="text-blue-300 ml-2">
                        [2, 7, 11, 15], target = 9
                      </span>
                    </p>
                    <p className="text-slate-500">
                      Output:
                      <span className="text-green-400 ml-2">[0, 1]</span>
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex items-center gap-2 text-xs text-slate-500">
                  <ClipboardCheck size={15} />
                  Test your solution with multiple cases
                </div>
              </div>

              {/* Code Editor */}
              <div className="min-w-0">
                {/* Editor Tabs */}
                <div className="flex items-center gap-5 px-5 py-3 border-b border-white/[0.08] bg-[#14151B] text-xs">
                  <span className="text-blue-400 border-b-2 border-blue-400 pb-3 -mb-[13px]">
                    solution.cpp
                  </span>
                  <span className="text-slate-500">Test Cases</span>
                  <span className="text-slate-500">Output</span>
                </div>

                {/* Code */}
                <div className="p-4 sm:p-6 min-h-[260px] bg-[#101116] overflow-x-auto">
                  <div className="font-mono text-xs sm:text-sm leading-8 whitespace-nowrap">
                    <p>
                      <span className="text-slate-600 mr-5">01</span>
                      <span className="text-violet-400">#include</span>{" "}
                      <span className="text-green-400">
                        &lt;bits/stdc++.h&gt;
                      </span>
                    </p>

                    <p>
                      <span className="text-slate-600 mr-5">02</span>
                      <span className="text-violet-400">
                        using namespace
                      </span>{" "}
                      <span className="text-yellow-200">std</span>;
                    </p>

                    <p>
                      <span className="text-slate-600 mr-5">03</span>
                    </p>

                    <p>
                      <span className="text-slate-600 mr-5">04</span>
                      <span className="text-blue-400">int</span>{" "}
                      <span className="text-yellow-200">main</span>() {"{"}
                    </p>

                    <p>
                      <span className="text-slate-600 mr-5">05</span>
                      <span className="text-slate-500 ml-6">
                        // Your solution starts here
                      </span>
                    </p>

                    <p>
                      <span className="text-slate-600 mr-5">06</span>
                      <span className="ml-6 text-blue-400">vector</span>
                      <span className="text-slate-300">&lt;</span>
                      <span className="text-blue-400">int</span>
                      <span className="text-slate-300">&gt;</span>{" "}
                      <span className="text-yellow-200">solve</span>
                      (vector&lt;int&gt;& nums,{" "}
                      <span className="text-blue-400">int</span> target);
                    </p>

                    <p>
                      <span className="text-slate-600 mr-5">07</span>
                    </p>

                    <p>
                      <span className="text-slate-600 mr-5">08</span>
                      <span className="ml-6 text-violet-400">return</span>{" "}
                      <span className="text-orange-300">0</span>;
                    </p>

                    <p>
                      <span className="text-slate-600 mr-5">09</span>
                      {"}"}
                    </p>
                  </div>
                </div>

                {/* Editor Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t border-white/[0.08] bg-[#14151B]">
                  <div className="flex items-center gap-2 text-xs text-green-400">
                    <CheckCircle2 size={15} />
                    Ready to submit
                  </div>

                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg border border-white/10 text-xs text-slate-300">
                      Run Code
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-xs font-semibold text-white">
                      Submit Solution
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#0C0D12] border-t border-white/[0.06]">
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <Terminal size={13} />
                DACP Online Coding Environment
              </div>

              <span className="text-[10px] text-slate-500">
                Preview Interface
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
