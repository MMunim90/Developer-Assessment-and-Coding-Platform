import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { Link } from "react-router";
import {
  Code2,
  Mail,
  Info,
  Trophy,
  ClipboardCheck,
  CodeXml,
  ArrowUpRight,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#08090D] border-t border-white/[0.08] text-slate-400">

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/4 w-80 h-40 bg-blue-600/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16">

          {/* Brand */}
          <div className="lg:col-span-1">

            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                <Code2 size={24} className="text-white" />
              </div>

              <span className="text-2xl font-bold tracking-tight text-white">
                DACP
              </span>
            </Link>

            <p className="text-sm leading-7 text-slate-500 max-w-xs">
              Developer Assessment and Coding Platform.
              Practice, compete, evaluate, and grow as a developer.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://github.com/MMunim90"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <IoLogoGithub size={19} />
              </a>

              <a
                href="https://www.linkedin.com/in/m-munim"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-400/30 transition-all"
              >
                <IoLogoLinkedin size={19}/>
              </a>

              <a
                href="mailto:contact@dacp.com"
                aria-label="Email"
                className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-400/30 transition-all"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-6">
              Platform
            </h3>

            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/challenges" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Code2 size={16} />
                  Coding Challenges
                </Link>
              </li>

              <li>
                <Link to="/contests" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Trophy size={16} />
                  Contests
                </Link>
              </li>

              <li>
                <Link to="/assessments" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <ClipboardCheck size={16} />
                  Assessments
                </Link>
              </li>

              <li>
                <Link to="/leaderboard" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <CodeXml size={16} />
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-6">
              Resources
            </h3>

            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Info size={16} />
                  About DACP
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Mail size={16} />
                  Contact Us
                </Link>
              </li>

              <li>
                <Link to="/help" className="hover:text-blue-400 transition-colors">
                  Help Center
                </Link>
              </li>

              <li>
                <Link to="/faq" className="hover:text-blue-400 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Tagline */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-6">
              Keep Improving
            </h3>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <Code2 size={21} className="text-blue-400" />
              </div>

              <h4 className="text-lg font-semibold text-white mb-2">
                Code. Compete.
                <span className="block text-blue-400">
                  Evaluate. Excel.
                </span>
              </h4>

              <p className="text-xs leading-6 text-slate-500">
                Every challenge is an opportunity to become a better developer.
              </p>

              <Link
                to="/challenges"
                className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Start Coding
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/[0.08] py-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-xs text-slate-500 text-center">
            © {new Date().getFullYear()} DACP. All rights reserved.
          </p>

          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            Built for developers with
            <Heart size={13} className="text-red-400 fill-red-400" />
            by Munim
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Empowering Developers
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;