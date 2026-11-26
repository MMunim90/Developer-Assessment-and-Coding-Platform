
import { useState } from "react";
import {
  Code2,
  Terminal,
  Rocket,
  Clock3,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Connect backend or email service later.
    setSubscribed(true);
    setEmail("");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08090D] text-white">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />
      </div>

      {/* Main content */}
      <section className="relative z-10 mx-auto flex min-h-[75vh] max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        {/* Status */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.08] px-4 py-2">
          <Sparkles size={14} className="text-blue-400" />
          <span className="text-xs font-semibold uppercase tracking-[2px] text-blue-300">
            Launching Soon
          </span>
        </div>

        {/* Developer illustration */}
        <div className="relative mb-10">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-[65px]" />

          <div className="relative flex h-32 w-32 items-center justify-center rounded-[32px] border border-blue-400/20 bg-gradient-to-br from-[#17243d] to-[#10131c] shadow-2xl shadow-blue-950/40 sm:h-36 sm:w-36">
            <Terminal size={64} strokeWidth={1.3} className="text-blue-400" />

            <div className="absolute -right-3 -top-3 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#151923]">
              <Rocket size={21} className="text-violet-400" />
            </div>

            <div className="absolute -bottom-3 -left-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#151923]">
              <Code2 size={19} className="text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h2 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          Something Big Is
          <span className="mt-2 block bg-gradient-to-r from-blue-400 via-blue-300 to-violet-400 bg-clip-text text-transparent">
            In The Works.
          </span>
        </h2>

        <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
          We're building a platform where developers can challenge themselves,
          compete with others, sharpen their programming skills, and prove
          what they're capable of. Your coding journey is about to level up.
        </p>

        {/* Feature tags */}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {["Coding Challenges", "Programming Contests", "Technical Assessments", "Developer Leaderboard"].map(
            (item) => (
              <span
                key={item}
                className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-slate-300"
              >
                {item}
              </span>
            )
          )}
        </div>

        {/* Notification form */}
        <div className="mt-12 w-full max-w-md">
          <p className="mb-4 text-sm font-semibold text-slate-200">
            Be the first to know when we launch.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-400">
              <CheckCircle2 size={18} />
              You're on the list! Stay tuned.
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#111318] p-2 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600"
              />

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
              >
                Notify Me
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          <p className="mt-3 text-xs text-slate-600">
            No spam. Just launch updates.
          </p>
        </div>

        {/* Launch indicator */}
        <div className="mt-14 flex items-center gap-3 text-slate-500">
          <Clock3 size={17} className="text-blue-400" />
          <span className="text-sm">The countdown to a better coding experience has begun.</span>
        </div>
      </section>
    </main>
  );
};

export default ComingSoon;
