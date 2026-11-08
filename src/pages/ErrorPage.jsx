import {
  House,
  Search,
  ArrowLeft,
  Code2,
  Terminal,
  Braces,
  Bug,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#08090D] text-slate-100">
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px]" />

      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      {/* ================= NAVBAR ================= */}
      <header className="relative z-10 border-b border-white/[0.07]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
              <Code2 size={25} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                DACP<span className="text-blue-400">.</span>
              </h1>
              <p className="text-[10px] font-medium tracking-[0.2em] text-slate-500">
                DEVELOPER PLATFORM
              </p>
            </div>
          </Link>

          {/* Home Link */}
          <Link
            to="/"
            className="hidden items-center gap-2 text-sm text-slate-400 transition hover:text-blue-400 sm:inline-flex"
          >
            <House size={17} />
            Home
          </Link>
        </nav>
      </header>

      {/* ================= ERROR CONTENT ================= */}
      <section className="relative z-10 flex flex-1 items-center justify-center px-5 py-16 sm:px-8">
        <div className="mx-auto w-full max-w-3xl text-center">
          {/* Terminal Illustration */}
          <div className="relative mx-auto mb-10 max-w-lg">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-[90px]" />

            {/* Terminal Window */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D1017] text-left shadow-2xl shadow-blue-950/30">
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#131720] px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Terminal size={14} />
                  terminal
                </div>

                <Code2 size={17} className="text-blue-400" />
              </div>

              {/* Terminal Body */}
              <div className="px-5 py-8 font-mono sm:px-8 sm:py-10">
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                  <span className="text-green-400">developer@dacp</span>
                  <span className="text-slate-500">~</span>
                  <span className="text-slate-300">$</span>
                  <span className="text-blue-300">navigate --page</span>
                </div>

                {/* 404 */}
                <div className="my-7 flex items-center justify-center gap-3 sm:gap-6">
                  <span className="text-7xl font-black tracking-tighter text-blue-400 sm:text-9xl">
                    4
                  </span>

                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10 sm:h-28 sm:w-28">
                    <Bug
                      size={48}
                      className="text-violet-400 sm:h-16 sm:w-16"
                    />

                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-lg border border-blue-400/30 bg-[#111827]">
                      <Search size={14} className="text-blue-400" />
                    </span>
                  </div>

                  <span className="text-7xl font-black tracking-tighter text-blue-400 sm:text-9xl">
                    4
                  </span>
                </div>

                {/* Terminal Output */}
                <div className="space-y-2 text-xs sm:text-sm">
                  <p className="text-red-400">Error 404: Page_Not_Found</p>

                  <p className="text-slate-500">
                    &gt; Searching requested route...
                  </p>

                  <p className="text-slate-500">
                    &gt; Looking for available resources...
                  </p>

                  <p className="text-yellow-400">
                    &gt; No matching page found.
                  </p>

                  <div className="flex items-center gap-2 pt-2 text-slate-400">
                    <span className="text-green-400">$</span>
                    <span>Waiting for next command</span>
                    <span className="h-4 w-1 animate-pulse bg-blue-400" />
                  </div>
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="flex items-center justify-between border-t border-white/[0.07] bg-[#131720] px-5 py-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  Route unavailable
                </div>

                <span className="text-xs text-slate-600">DACP Terminal</span>
              </div>
            </div>

            {/* Floating Decorations */}
            <div className="absolute -left-5 top-12 hidden h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-[#111827] shadow-lg sm:flex">
              <Braces size={22} className="text-blue-400" />
            </div>

            <div className="absolute -right-5 bottom-12 hidden h-12 w-12 items-center justify-center rounded-xl border border-violet-400/20 bg-[#111827] shadow-lg sm:flex">
              <Code2 size={22} className="text-violet-400" />
            </div>
          </div>

          {/* Error Message */}
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-400 sm:text-sm">
              Error 404 · Route Not Found
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Lost in the
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                {" "}
                code?
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Looks like this page doesn't exist or the URL might be incorrect.
              Don't worry, every great developer encounters a bug sometimes.
              Let's get you back on track.
            </p>

            {/* Actions */}
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-7 text-sm font-semibold text-white transition hover:bg-blue-500 sm:w-auto"
              >
                <House size={18} />
                Back to Home
              </Link>

              <Link
                to="/challenges"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-7 text-sm font-semibold text-slate-200 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-300 sm:w-auto"
              >
                <Code2 size={18} />
                Explore Challenges
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Go Back */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-7 inline-flex cursor-pointer items-center gap-2 text-sm text-slate-500 transition hover:text-blue-400"
            >
              <ArrowLeft size={16} />
              Go back to the previous page
            </button>

            {/* Bottom Message */}
            <div className="mt-12 flex items-center justify-center gap-3 text-xs text-slate-600 sm:text-sm">
              <span className="h-px w-8 bg-white/10 sm:w-12" />
              <span>Code. Compete. Evaluate. Excel.</span>
              <span className="h-px w-8 bg-white/10 sm:w-12" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:text-sm">
          <p>© {new Date().getFullYear()} DACP. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link to="/about" className="transition hover:text-blue-400">
              About Us
            </Link>

            <Link to="/contact" className="transition hover:text-blue-400">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
