import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  Search,
  ChevronDown,
  Code2,
  Trophy,
  ClipboardCheck,
  UserRound,
  BarChart3,
  MessageCircle,
  ArrowRight,
  HelpCircle,
  CircleHelp,
  Terminal,
  X,
} from "lucide-react";

const faqData = [
  {
    category: "General",
    icon: HelpCircle,
    questions: [
      {
        question: "What is DACP?",
        answer:
          "DACP (Developer Assessment and Coding Platform) is a platform designed to help developers practice coding challenges, participate in programming contests, take technical assessments, and track their progress.",
      },
      {
        question: "Who can use DACP?",
        answer:
          "DACP is designed for students, beginners, competitive programmers, and developers who want to improve their programming and problem-solving skills.",
      },
      {
        question: "Is DACP free to use?",
        answer:
          "The availability of platform features depends on the access and policies configured by the DACP administrators. Check the platform for the latest information about available features.",
      },
      {
        question: "How can I get help if I face a problem?",
        answer:
          "Visit the Help Center to explore support topics. If you cannot find an answer, use the Contact page to send your question or report an issue.",
      },
    ],
  },
  {
    category: "Account",
    icon: UserRound,
    questions: [
      {
        question: "How do I create a DACP account?",
        answer:
          "Click the Sign Up option, complete the registration form with the required information, and submit it. After successful registration, you can log in using your account credentials.",
      },
      {
        question: "How do I log in to my account?",
        answer:
          "Navigate to the Login page and enter your registered username and password. Submit the form to access your account.",
      },
      {
        question: "What should I do if I forget my password?",
        answer:
          "If password recovery is available on the Login page, follow its instructions. Otherwise, contact the DACP support team for assistance.",
      },
      {
        question: "Can I update my account information?",
        answer:
          "Account information management depends on the profile features currently available on DACP. Visit your profile or dashboard to check the available options.",
      },
    ],
  },
  {
    category: "Challenges",
    icon: Code2,
    questions: [
      {
        question: "How do I start solving a coding challenge?",
        answer:
          "Visit the Challenges section, choose a problem, and read its description carefully. Review the input/output format and constraints before writing your solution.",
      },
      {
        question: "What should I check before submitting my code?",
        answer:
          "Make sure your solution follows the required input/output format, handles the given constraints, and considers edge cases. Then submit it for evaluation.",
      },
      {
        question: "Why might my submission fail?",
        answer:
          "A submission may fail because of incorrect output, missed edge cases, compilation errors, runtime errors, or exceeding the allowed execution time or memory limit.",
      },
      {
        question: "What does Wrong Answer mean?",
        answer:
          "Wrong Answer means your program executed but produced output that did not match the expected result for at least one test case.",
      },
      {
        question: "What is Time Limit Exceeded?",
        answer:
          "Time Limit Exceeded means your solution took longer than the allowed execution time. Consider improving your algorithm or choosing a more efficient data structure.",
      },
    ],
  },
  {
    category: "Contests",
    icon: Trophy,
    questions: [
      {
        question: "How can I participate in a programming contest?",
        answer:
          "Open the Contests section, select an available contest, and follow the participation instructions shown on its page.",
      },
      {
        question: "Can I participate in a contest after it starts?",
        answer:
          "This depends on the specific contest rules and configuration. Check the contest details for its start time, end time, and participation requirements.",
      },
      {
        question: "How are contest rankings determined?",
        answer:
          "Rankings depend on the scoring and ranking rules configured for each contest. Check the contest page for its specific scoring policy.",
      },
    ],
  },
  {
    category: "Assessments",
    icon: ClipboardCheck,
    questions: [
      {
        question: "What is a technical assessment?",
        answer:
          "A technical assessment is an evaluation designed to measure programming knowledge, problem-solving ability, and technical skills.",
      },
      {
        question: "Are assessments time-limited?",
        answer:
          "Assessment time limits depend on the assessment configuration. Always review the instructions before starting an assessment.",
      },
      {
        question: "Can I review my assessment results?",
        answer:
          "Result visibility depends on the assessment settings and available platform features. Check your dashboard or the assessment page for result information.",
      },
    ],
  },
  {
    category: "Progress & Security",
    icon: BarChart3,
    questions: [
      {
        question: "Where can I track my coding progress?",
        answer:
          "Visit your dashboard or profile to explore the progress information and performance statistics currently available to your account.",
      },
      {
        question: "How does the leaderboard work?",
        answer:
          "The leaderboard displays developer rankings based on the scoring rules configured by DACP. Ranking criteria may differ depending on the platform activity.",
      },
      {
        question: "How can I keep my account secure?",
        answer:
          "Use a strong, unique password, never share your login credentials, and log out when using a shared device.",
      },
    ],
  },
];

const categories = [
  { name: "All Questions", icon: CircleHelp },
  ...faqData.map(({ category, icon }) => ({
    name: category,
    icon,
  })),
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("All Questions");
  const [searchTerm, setSearchTerm] = useState("");
  const [openQuestion, setOpenQuestion] = useState(null);

  const filteredFAQs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return faqData
      .filter(
        (group) =>
          activeCategory === "All Questions" ||
          group.category === activeCategory,
      )
      .map((group) => ({
        ...group,
        questions: group.questions.filter(
          (item) =>
            !query ||
            item.question.toLowerCase().includes(query) ||
            item.answer.toLowerCase().includes(query),
        ),
      }))
      .filter((group) => group.questions.length > 0);
  }, [activeCategory, searchTerm]);

  const totalResults = filteredFAQs.reduce(
    (total, group) => total + group.questions.length,
    0,
  );

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setOpenQuestion(null);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setOpenQuestion(null);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090D] text-slate-200">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute -top-40 left-1/2 h-[420px] w-[650px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute left-[-150px] top-[700px] h-[350px] w-[350px] rounded-full bg-violet-600/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        {/* Hero */}
        <section className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/[0.07] px-4 py-2 text-sm text-blue-300">
            <HelpCircle size={16} />
            Frequently Asked Questions
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Got questions?
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              We've got answers.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Everything you need to know about DACP, from getting started to
            solving challenges and tracking your progress.
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
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search frequently asked questions..."
              className="h-16 w-full rounded-xl border border-white/10 bg-[#111318] pl-14 pr-12 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"
            />

            {searchTerm && (
              <button
                onClick={() => handleSearch("")}
                aria-label="Clear search"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </section>

        {/* FAQ Content */}
        <section className="mt-20 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          {/* Sidebar */}
          <aside>
            <div className="sticky top-24">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Browse by category
              </p>

              <div className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.name;

                  return (
                    <button
                      key={category.name}
                      onClick={() => handleCategoryChange(category.name)}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${
                        isActive
                          ? "border border-blue-500/20 bg-blue-500/10 font-medium text-blue-300"
                          : "border border-transparent text-slate-400 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      <Icon
                        size={17}
                        className={
                          isActive ? "text-blue-400" : "text-slate-500"
                        }
                      />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 rounded-xl border border-white/[0.07] bg-[#111318] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                  <MessageCircle size={19} />
                </div>

                <h3 className="mt-4 font-semibold text-white">
                  Still have questions?
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  Our contact page is the place to send your questions and
                  feedback.
                </p>

                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition hover:text-blue-300"
                >
                  Contact us <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </aside>

          {/* Questions */}
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] pb-5">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {activeCategory}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Find answers to common questions.
                </p>
              </div>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400">
                {totalResults} {totalResults === 1 ? "question" : "questions"}
              </span>
            </div>

            {filteredFAQs.length > 0 ? (
              <div className="space-y-8">
                {filteredFAQs.map((group) => {
                  const Icon = group.icon;

                  return (
                    <div key={group.category}>
                      {activeCategory === "All Questions" && (
                        <div className="mb-4 flex items-center gap-2">
                          <Icon size={17} className="text-blue-400" />
                          <h3 className="text-sm font-semibold text-blue-300">
                            {group.category}
                          </h3>
                        </div>
                      )}

                      <div className="space-y-3">
                        {group.questions.map((item, index) => {
                          const questionId = `${group.category}-${index}`;
                          const isOpen = openQuestion === questionId;

                          return (
                            <div
                              key={questionId}
                              className={`overflow-hidden rounded-xl border bg-[#111318] transition-all duration-200 ${
                                isOpen
                                  ? "border-blue-500/30"
                                  : "border-white/[0.07] hover:border-white/15"
                              }`}
                            >
                              <button
                                onClick={() =>
                                  setOpenQuestion(isOpen ? null : questionId)
                                }
                                aria-expanded={isOpen}
                                className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                              >
                                <span className="text-sm font-medium leading-6 text-slate-200 sm:text-base">
                                  {item.question}
                                </span>

                                <span
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition ${
                                    isOpen
                                      ? "rotate-180 border-blue-500/30 bg-blue-500/10 text-blue-400"
                                      : "border-white/10 bg-white/[0.03] text-slate-500"
                                  }`}
                                >
                                  <ChevronDown size={17} />
                                </span>
                              </button>

                              {isOpen && (
                                <div className="border-t border-white/[0.06] px-5 pb-5 pt-4 sm:px-6">
                                  <p className="text-sm leading-7 text-slate-400">
                                    {item.answer}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-white/[0.07] bg-[#111318] px-5 py-16 text-center">
                <Search size={32} className="mx-auto text-slate-600" />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  No questions found
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  We couldn't find any questions matching your search. Try a
                  different keyword or select another category.
                </p>

                <button
                  onClick={() => {
                    handleSearch("");
                    handleCategoryChange("All Questions");
                  }}
                  className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-24 rounded-2xl border border-white/[0.07] bg-[#111318] p-8 text-center sm:p-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
            <Terminal size={22} />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
            Didn't find your answer?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400">
            Every great developer encounters questions. Let us know what you
            need help with, and we'll do our best to guide you.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Ask a Question <ArrowRight size={16} />
            </Link>

            <Link
              to="/help"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.08]"
            >
              <HelpCircle size={16} /> Help Center
            </Link>
          </div>
        </section>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
          <Code2 size={14} />
          <span>DACP</span>
          <span>·</span>
          <span>Code. Compete. Evaluate. Excel.</span>
        </div>
      </div>
    </main>
  );
};

export default FAQ;
