
import { useState } from "react";
import {
  Mail,
  Globe,
  Clock,
  MessageSquare,
  Send,
  ArrowRight,
  Code2,
  Bug,
  Lightbulb,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Have a question or need assistance?",
    value: "support@dacp.com",
    href: "mailto:support@dacp.com",
  },
  {
    icon: Globe,
    title: "Platform Access",
    description: "Connect with our developer platform.",
    value: "Available Online",
    href: null,
  },
  {
    icon: Clock,
    title: "Support Availability",
    description: "Send us your questions anytime.",
    value: "Online Inquiries",
    href: null,
  },
];

const inquiryTypes = [
  {
    icon: HelpCircle,
    title: "General Questions",
    description: "Questions about DACP and its features.",
  },
  {
    icon: Bug,
    title: "Report an Issue",
    description: "Found a bug or something not working?",
  },
  {
    icon: Lightbulb,
    title: "Suggestions",
    description: "Share ideas to improve the platform.",
  },
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect your backend API here to deliver the message.
    console.log("DACP contact form data:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090D] text-slate-100">

      {/* Hero Section */}
      <section className="relative border-b border-white/[0.06]">
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/[0.12] blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="max-w-3xl">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.08] px-4 py-2 text-sm font-medium text-blue-300">
              <MessageSquare size={16} />
              We're here to help
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Let's talk
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                about code.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
              Have a question, found an issue, or have an idea that could make
              DACP better? We'd love to hear from you. Get in touch and let's
              build a better developer experience together.
            </p>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail size={17} className="text-blue-400" />
                General Inquiries
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Bug size={17} className="text-blue-400" />
                Technical Support
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Lightbulb size={17} className="text-blue-400" />
                Feature Suggestions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Details and Form */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16">

          {/* Left Information */}
          <div className="lg:col-span-2">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Get in Touch
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
              We'd love to hear from you.
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              Whether you're experiencing a problem, have questions about
              coding challenges, or want to share feedback, your message
              matters to us.
            </p>

            {/* Contact Information */}
            <div className="mt-9 space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex gap-4 rounded-2xl border border-white/[0.07] bg-[#111318] p-5 transition duration-300 hover:border-blue-400/30 hover:bg-[#141923]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/10">
                      <Icon size={22} className="text-blue-400" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {item.description}
                      </p>

                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-2 inline-block break-all text-sm font-medium text-blue-400 transition hover:text-blue-300 hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-2 text-sm font-medium text-slate-300">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inquiry Types */}
            <div className="mt-9">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                How can we help?
              </h3>

              <div className="space-y-4">
                {inquiryTypes.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                        <Icon size={18} className="text-blue-400" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-200">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Promise Card */}
            <div className="relative mt-9 overflow-hidden rounded-2xl border border-blue-400/15 bg-[#111722] p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                    <Code2 size={22} className="text-blue-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    The DACP Community
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  Every question, suggestion, and feedback helps us create a
                  better environment for developers to practice, compete, and
                  improve their skills.
                </p>

                <p className="mt-4 text-sm font-semibold text-blue-300">
                  Code. Compete. Evaluate. Excel.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111318] shadow-2xl shadow-black/20">

              {/* Form Header */}
              <div className="border-b border-white/[0.07] bg-[#151922] px-6 py-6 md:px-9">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/10">
                    <Send size={21} className="text-blue-400" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Send us a message
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      We'd be happy to hear from you.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <div className="p-6 md:p-9">

                {submitted && (
                  <div
                    role="status"
                    className="mb-6 flex items-start gap-3 rounded-xl border border-green-400/20 bg-green-500/[0.08] p-4"
                  >
                    <CheckCircle2
                      size={21}
                      className="mt-0.5 shrink-0 text-green-400"
                    />

                    <div>
                      <p className="text-sm font-semibold text-green-300">
                        Form submitted successfully!
                      </p>
                      <p className="mt-1 text-xs leading-6 text-slate-400">
                        This is currently a frontend demo. Connect your
                        backend API to deliver messages to your team.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Name and Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <fieldset className="space-y-2">
                      <label
                        htmlFor="contact-name"
                        className="text-sm font-medium text-slate-300"
                      >
                        Full Name <span className="text-red-400">*</span>
                      </label>

                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        autoComplete="name"
                        required
                        className="w-full rounded-xl border border-white/10 bg-[#0D1017] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/10"
                      />
                    </fieldset>

                    <fieldset className="space-y-2">
                      <label
                        htmlFor="contact-email"
                        className="text-sm font-medium text-slate-300"
                      >
                        Email Address <span className="text-red-400">*</span>
                      </label>

                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        className="w-full rounded-xl border border-white/10 bg-[#0D1017] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/10"
                      />
                    </fieldset>
                  </div>

                  {/* Subject */}
                  <fieldset className="space-y-2">
                    <label
                      htmlFor="contact-subject"
                      className="text-sm font-medium text-slate-300"
                    >
                      Subject <span className="text-red-400">*</span>
                    </label>

                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is your message about?"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#0D1017] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/10"
                    />
                  </fieldset>

                  {/* Message */}
                  <fieldset className="space-y-2">
                    <label
                      htmlFor="contact-message"
                      className="text-sm font-medium text-slate-300"
                    >
                      Your Message <span className="text-red-400">*</span>
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      rows={7}
                      required
                      className="w-full resize-y rounded-xl border border-white/10 bg-[#0D1017] px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/10"
                    />
                  </fieldset>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#111318]"
                  >
                    Send Message
                    <Send
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>

                  <p className="text-center text-xs leading-6 text-slate-500">
                    Your information should be handled securely and used only
                    to respond to your inquiry.
                  </p>
                </form>
              </div>
            </div>

            {/* Small Note */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-600">
              <ShieldCheck size={14} className="text-blue-400" />
              <span>We value your feedback and privacy.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111722] p-8 md:flex-row md:p-10">

          <div className="pointer-events-none absolute -right-20 -top-32 h-64 w-64 rounded-full bg-blue-600/10 blur-[100px]" />

          <div className="relative">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-400">
              <Sparkles size={16} />
              Ready to get started?
            </div>

            <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
              Your next coding challenge awaits.
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              Explore challenges, test your knowledge, and take your coding
              skills to the next level.
            </p>
          </div>

          <Link
            to="/challenges"
            className="relative inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
          >
            Explore Challenges
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
