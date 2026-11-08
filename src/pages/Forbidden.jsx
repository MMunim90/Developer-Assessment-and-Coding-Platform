import { Link, useNavigate } from "react-router";
import {
  ShieldX,
  LockKeyhole,
  ArrowLeft,
  House,
  ShieldCheck,
  Code2,
  Terminal,
  Fingerprint,
} from "lucide-react";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08090D] px-4 py-12 text-slate-100">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-xl">
        {/* Brand */}
        <Link to="/" className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 shadow-lg shadow-blue-500/10">
            <Code2 size={27} className="text-blue-400" />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              DACP<span className="text-blue-400">.</span>
            </h2>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500">
              Developer Platform
            </p>
          </div>
        </Link>

        {/* Forbidden Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#111318]/90 p-6 text-center shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
          {/* Icon */}
          <div className="relative mx-auto mb-7 flex h-28 w-28 items-center justify-center rounded-full border border-red-400/20 bg-red-500/[0.07]">
            <div className="absolute inset-2 rounded-full border border-dashed border-red-400/20" />

            <ShieldX size={55} strokeWidth={1.4} className="text-red-400" />

            <div className="absolute -right-1 -top-1 rounded-full border border-[#111318] bg-[#1C202A] p-2">
              <LockKeyhole size={18} className="text-red-300" />
            </div>
          </div>

          {/* Error Code */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/[0.08] px-4 py-2">
            <ShieldCheck size={15} className="text-red-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
              Error 403 · Forbidden
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Access Denied<span className="text-blue-400">.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
            Looks like you've reached a restricted area. Your current account
            doesn't have the required permissions to access this resource.
          </p>

          {/* Information Panel */}
          <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-[#0D1017] p-4 text-left">
            <Fingerprint size={22} className="mt-0.5 shrink-0 text-blue-400" />

            <div>
              <p className="text-sm font-semibold text-slate-200">
                Restricted Access
              </p>
              <p className="mt-1 text-xs leading-6 text-slate-500 sm:text-sm">
                You may need a different account or additional permissions.
                Contact your platform administrator if you believe this is a
                mistake.
              </p>
            </div>
          </div>

          {/* Terminal Message */}
          <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0A0C11] text-left">
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              <span className="ml-2 text-[11px] text-slate-500">
                access_control.terminal
              </span>
            </div>

            <div className="space-y-2 px-4 py-4 font-mono text-xs sm:text-sm">
              <p className="text-slate-500">
                <span className="text-blue-400">$</span> verify_permissions
              </p>
              <p className="text-red-400">
                <span className="mr-2">✕</span>
                Permission denied: insufficient privileges
              </p>
              <p className="text-slate-500">
                <span className="text-blue-400">$</span>{" "}
                <span className="animate-pulse">_</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#111318]"
            >
              <House size={17} />
              Back to Home
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <ArrowLeft size={17} />
              Go Back
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 border-t border-white/[0.07] pt-5">
            <p className="text-xs text-slate-500">
              Need assistance? Contact the DACP platform administrator.
            </p>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs tracking-wide text-slate-600">
          <Terminal size={13} />
          <span>DACP · Code. Compete. Evaluate. Excel.</span>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
