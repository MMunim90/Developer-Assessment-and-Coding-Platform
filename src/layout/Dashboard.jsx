import { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  Menu,
  X,
  UserRound,
  Code2,
  Trophy,
  ClipboardCheck,
  LayoutDashboard,
  ChevronRight,
  Terminal,
  ShieldCheck,
  Braces,
  ChartNoAxesCombined,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { authUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAdmin = authUser?.role === "admin";

  const firstName = authUser?.firstname || "Developer";
  const fullName = `${authUser?.firstname || ""} ${
    authUser?.lastname || ""
  }`.trim();

  const navItems = [
    {
      section: "Overview",
      items: [
        {
          title: "Dashboard Home",
          path: "/dashboard",
          icon: LayoutDashboard,
          end: true,
        },
        {
          title: "My Profile",
          path: "/profile",
          icon: UserRound,
        },
      ],
    },
    {
      section: "Developer Zone",
      items: [
        {
          title: "Coding Challenges",
          path: "/dashboard/challenges",
          icon: Code2,
        },
        {
          title: "My Submissions",
          path: "/dashboard/submissions",
          icon: Terminal,
        },
        {
          title: "My Contests",
          path: "/dashboard/myContests",
          icon: Trophy,
        },
        {
          title: "Assessments",
          path: "/dashboard/myAssessments",
          icon: ClipboardCheck,
        },
        {
          title: "My Progress",
          path: "/dashboard/progress",
          icon: ChartNoAxesCombined,
        },
      ],
    },
    ...(isAdmin
      ? [
          {
            section: "Administration",
            items: [
              {
                title: "Manage Challenges",
                path: "/dashboard/manageChallenges",
                icon: Braces,
              },
              {
                title: "Manage Contests",
                path: "/dashboard/manageContests",
                icon: Trophy,
              },
              {
                title: "Manage Assessments",
                path: "/dashboard/manageAssessments",
                icon: ClipboardCheck,
              },
              {
                title: "Manage Users",
                path: "/dashboard/manageUsers",
                icon: ShieldCheck,
              },
            ],
          },
        ]
      : []),
  ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-[#08090D] text-slate-100">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-violet-600/5 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/[0.07] bg-[#0D0F14] transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/[0.07] px-6">
          <NavLink
            to="/"
            onClick={closeSidebar}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10">
              <Code2 size={23} className="text-blue-400" />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-wide text-white">
                DACP
              </h2>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                Developer Platform
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="mx-4 mt-5 rounded-xl border border-white/[0.07] bg-[#131720] p-3 hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-sm font-bold uppercase text-blue-300">
              {firstName.charAt(0)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-100">
                {fullName || "Developer"}
              </p>
              <p className="mt-0.5 truncate text-xs text-slate-500">
                @{authUser?.username || "developer"}
              </p>
            </div>

            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
            <span className="text-[11px] uppercase tracking-wider text-slate-500">
              Account Role
            </span>
            <span className="rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-300">
              {authUser?.role || "Developer"}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {navItems.map((section) => (
            <div key={section.section} className="mb-7">
              <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                {section.section}
              </p>

              <nav>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          end={item.end}
                          onClick={closeSidebar}
                          className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-lg border px-3 py-2.5 text-[13px] transition-all duration-200 ${
                              isActive
                                ? "border-blue-500/20 bg-blue-500/10 font-semibold text-blue-300"
                                : "border-transparent text-slate-400 hover:border-white/[0.05] hover:bg-white/[0.04] hover:text-slate-100"
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <Icon
                                size={18}
                                className={
                                  isActive
                                    ? "text-blue-400"
                                    : "text-slate-500 transition group-hover:text-blue-400"
                                }
                              />

                              <span className="flex-1">{item.title}</span>

                              {isActive && (
                                <ChevronRight
                                  size={15}
                                  className="text-blue-400"
                                />
                              )}
                            </>
                          )}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-white/[0.07] p-4">
          <div className="rounded-xl border border-blue-500/15 bg-blue-500/[0.05] p-4">
            <div className="mb-2 flex items-center gap-2">
              <Terminal size={16} className="text-blue-400" />
              <p className="text-xs font-semibold text-blue-300">
                Keep Improving
              </p>
            </div>

            <p className="text-[11px] leading-5 text-slate-500">
              Practice consistently, solve challenges, and become a better
              developer every day.
            </p>
          </div>

          <p className="mt-4 text-center text-[10px] text-slate-600">
            DACP © {new Date().getFullYear()} · Code. Compete. Excel.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="relative min-h-screen lg:pl-72">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/[0.07] bg-[#08090D]/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Open sidebar"
              aria-expanded={sidebarOpen}
              className="rounded-lg border border-white/10 bg-[#131720] p-2.5 text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-300 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <LayoutDashboard size={17} className="text-blue-400" />
                <h1 className="text-sm font-semibold text-white sm:text-base">
                  Developer Dashboard
                </h1>
              </div>

              <p className="mt-1 hidden text-xs text-slate-500 sm:block">
                Welcome back, {firstName}. Ready to write some code?
              </p>
            </div>
          </div>

          {/* Header Right */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/[0.06] px-3 py-1.5 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-medium text-emerald-400">
                System Online
              </span>
            </div>

            <NavLink
              to="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-sm font-bold uppercase text-blue-300 transition hover:bg-blue-500/20"
              title="My Profile"
            >
              {firstName.charAt(0)}
            </NavLink>
          </div>
        </header>

        {/* Page Content */}
        <main className="relative min-w-0 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
