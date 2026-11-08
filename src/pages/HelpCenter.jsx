import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  Search,
  Code2,
  Trophy,
  ClipboardCheck,
  BarChart3,
  ShieldCheck,
  BookOpen,
  MessageCircle,
  Mail,
  ArrowRight,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

const helpCategories = [
  {
    title: "Getting Started",
    description: "Learn the basics and set up your DACP account.",
    icon: BookOpen,
    color: "text-blue-400",
    topics: [
      "Creating an account",
      "Logging into DACP",
      "Updating your profile",
      "Navigating the platform",
    ],
  },
  {
    title: "Coding Challenges",
    description: "Understand problems, submissions, and evaluations.",
    icon: Code2,
    color: "text-violet-400",
    topics: [
      "How to solve a challenge",
      "Submitting your solution",
      "Understanding test cases",
      "Submission results",
    ],
  },
  {
    title: "Programming Contests",
    description: "Get help with participating in coding competitions.",
    icon: Trophy,
    color: "text-amber-400",
    topics: [
      "Joining a contest",
      "Contest rules",
      "Contest timing",
      "Leaderboard rankings",
    ],
  },
  {
    title: "Assessments",
    description: "Learn how technical assessments work.",
    icon: ClipboardCheck,
    color: "text-emerald-400",
    topics: [
      "Starting an assessment",
      "Assessment instructions",
      "Time limits",
      "Viewing assessment results",
    ],
  },
  {
    title: "Account & Security",
    description: "Manage your account and keep it secure.",
    icon: ShieldCheck,
    color: "text-cyan-400",
    topics: [
      "Changing account details",
      "Password issues",
      "Account security",
      "Logging out",
    ],
  },
  {
    title: "Progress & Leaderboard",
    description: "Understand your performance and achievements.",
    icon: BarChart3,
    color: "text-pink-400",
    topics: [
      "Tracking your progress",
      "Understanding rankings",
      "Points and scores",
      "Viewing achievements",
    ],
  },
];

const quickLinks = [
  {
    title: "Coding Challenges",
    description: "Practice problem-solving skills.",
    icon: Code2,
    to: "/challenges",
  },
  {
    title: "Programming Contests",
    description: "Compete with other developers.",
    icon: Trophy,
    to: "/contests",
  },
  {
    title: "Technical Assessments",
    description: "Test your programming knowledge.",
    icon: ClipboardCheck,
    to: "/assessments",
  },
  {
    title: "Leaderboard",
    description: "Explore developer rankings.",
    icon: BarChart3,
    to: "/leaderboard",
  },
];

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return helpCategories;

    return helpCategories
      .map((category) => {
        const matchesCategory =
          category.title.toLowerCase().includes(query) ||
          category.description.toLowerCase().includes(query);

        const matchingTopics = category.topics.filter((topic) =>
          topic.toLowerCase().includes(query),
        );

        if (matchesCategory) return category;

        if (matchingTopics.length > 0) {
          return { ...category, topics: matchingTopics };
        }

        return null;
      })
      .filter(Boolean);
  }, [searchTerm]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090D] text-slate-200">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute -top-40 left-1/2 h-[420px] w-[650px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute right-[-150px] top-[650px] h-[350px] w-[350px] rounded-full bg-violet-600/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        {/* Hero */}
        <section className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/[0.07] px-4 py-2 text-sm text-blue-300">
            <HelpCircle size={16} />
            DACP Support Center
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            How can we{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              help you?
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Find answers, explore platform guides, and get the support you need
            to make the most of your coding journey.
          </p>

          {/* Search */}
          <div className="group relative mx-auto mt-9 max-w-2xl">
            <Search
              size={21}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for help topics..."
              className="h-16 w-full rounded-xl border border-white/10 bg-[#111318] pl-14 pr-5 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"
            />
            <span className="absolute right-5 top-1/2 hidden -translate-y-1/2 text-xs text-slate-600 sm:block">
              Search help
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span>Popular:</span>
            {["Account", "Challenges", "Submissions", "Contests"].map(
              (term) => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 transition hover:border-blue-500/40 hover:text-blue-300"
                >
                  {term}
                </button>
              ),
            )}
          </div>
        </section>

        {/* Help Categories */}
        <section className="mt-24">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Browse topics
              </p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Explore Help Categories
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Find guidance for every part of the DACP platform.
              </p>
            </div>

            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition hover:text-blue-300"
            >
              Browse FAQs <ArrowRight size={16} />
            </Link>
          </div>

          {filteredCategories.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((category) => {
                const Icon = category.icon;

                return (
                  <div
                    key={category.title}
                    className="group rounded-xl border border-white/[0.07] bg-[#111318] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-[#131720]"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                      <Icon size={21} className={category.color} />
                    </div>

                    <h3 className="text-lg font-semibold text-white">
                      {category.title}
                    </h3>

                    <p className="mt-2 min-h-10 text-sm leading-6 text-slate-500">
                      {category.description}
                    </p>

                    <div className="mt-5 space-y-3 border-t border-white/[0.06] pt-4">
                      {category.topics.slice(0, 4).map((topic) => (
                        <div
                          key={topic}
                          className="flex items-center gap-2 text-sm text-slate-400"
                        >
                          <ChevronRight
                            size={14}
                            className="shrink-0 text-blue-400"
                          />
                          {topic}
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/faq"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition group-hover:gap-3"
                    >
                      Explore topics <ArrowRight size={15} />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-[#111318] px-5 py-14 text-center">
              <Search size={30} className="mx-auto text-slate-600" />
              <h3 className="mt-4 font-semibold text-white">
                No matching topics found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try another keyword or browse all frequently asked questions.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-5 text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Clear search
              </button>
            </div>
          )}
        </section>

        {/* Quick Links */}
        <section className="mt-24">
          <div className="mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Platform navigation
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Looking for something specific?
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.to}
                  className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-[#0D1017] p-5 transition hover:border-blue-500/30 hover:bg-[#131720]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <Icon size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </div>

                  <ArrowRight
                    size={16}
                    className="shrink-0 text-slate-600 transition group-hover:text-blue-400"
                  />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Support CTA */}
        <section className="mt-24 overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-[#111827] to-[#111318] p-8 sm:p-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
                <MessageCircle size={21} />
              </div>

              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Still need a hand?
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Can't find what you're looking for? Visit our contact page to
                share your question, report an issue, or suggest an improvement.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                <Mail size={17} /> Contact Support
              </Link>

              <Link
                to="/faq"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.08]"
              >
                View FAQs <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom note */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
          <Code2 size={14} />
          <span>DACP Support Center</span>
          <span>·</span>
          <span>Code. Compete. Evaluate. Excel.</span>
        </div>
      </div>
    </main>
  );
};

export default HelpCenter;
