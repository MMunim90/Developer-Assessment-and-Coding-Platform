import { Link } from "react-router";
import {
  ClipboardCheck,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  FileQuestion,
  BrainCircuit,
  Target,
  CheckCircle2,
} from "lucide-react";

const assessmentStyles = {
  Beginner: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Intermediate: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  Advanced: "border-rose-500/20 bg-rose-500/10 text-rose-400",
};

const TechnicalAssessments = ({ assessments = [] }) => {
  return (
    <section className="relative overflow-hidden bg-[#08090D] px-5 py-20 sm:px-8 lg:px-10">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-emerald-500/[0.05] blur-[130px]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-600/[0.05] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Test your knowledge
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Technical <span className="text-emerald-400">Assessments</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              Go beyond practice. Evaluate your technical knowledge, challenge
              your understanding, and discover where you can improve.
            </p>
          </div>

          <Link
            to="/assessments"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:gap-3 hover:text-emerald-300"
          >
            View All Assessments <ArrowRight size={17} />
          </Link>
        </div>

        {/* Assessment Cards */}
        {assessments.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {assessments.slice(0, 6).map((assessment) => (
              <div
                key={assessment.id}
                className="group flex flex-col rounded-xl border border-white/[0.07] bg-[#111318] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-[#131720]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                    <ClipboardCheck size={21} />
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${
                      assessmentStyles[assessment.level] ||
                      "border-white/10 bg-white/5 text-slate-400"
                    }`}
                  >
                    {assessment.level || "Assessment"}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white transition group-hover:text-emerald-300">
                  {assessment.title}
                </h3>

                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-6 text-slate-500">
                  {assessment.description ||
                    "Test your technical knowledge with this assessment."}
                </p>

                {/* Assessment Information */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-white/[0.06] bg-[#0D1017] p-3">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock3 size={14} />
                      <span className="text-xs">Duration</span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-slate-200">
                      {assessment.duration || "—"}
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/[0.06] bg-[#0D1017] p-3">
                    <div className="flex items-center gap-2 text-slate-500">
                      <FileQuestion size={14} />
                      <span className="text-xs">Questions</span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-slate-200">
                      {assessment.questionCount ?? "—"}
                    </p>
                  </div>
                </div>

                {/* Topics */}
                {assessment.topics?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {assessment.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-400"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto border-t border-white/[0.07] pt-5">
                  <Link
                    to={`/assessments/${assessment.id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300 transition hover:border-emerald-500/40 hover:bg-emerald-500/15"
                  >
                    View Assessment
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/10 bg-[#111318] px-5 py-14 text-center">
            <ClipboardCheck size={32} className="mx-auto text-slate-600" />

            <h3 className="mt-4 font-semibold text-white">
              Ready to test your skills?
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Technical assessments will be displayed here when assessment data
              is available.
            </p>

            <Link
              to="/assessments"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
            >
              Explore Assessments <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Bottom Feature Highlights */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: Target,
              text: "Evaluate Your Knowledge",
            },
            {
              icon: BrainCircuit,
              text: "Challenge Your Thinking",
            },
            {
              icon: CheckCircle2,
              text: "Identify Areas to Improve",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.text}
                className="flex items-center justify-center gap-3 rounded-lg border border-white/[0.06] bg-[#0D1017] px-4 py-4"
              >
                <Icon size={17} className="text-emerald-400" />
                <span className="text-xs font-medium text-slate-400">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnicalAssessments;
