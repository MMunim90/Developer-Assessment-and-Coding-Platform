import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  X,
  ChartNoAxesCombined,
  Code2,
  Users,
  Trophy,
  Send,
  Save,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

import { baseURL } from "../services/BaseURL";
import { AuthContext } from "../context/AuthContext";

const initialStats = {
  total_problems: "",
  developers: "",
  contests: "",
  submissions: "",
};

const fields = [
  {
    name: "total_problems",
    label: "Total Problems",
    icon: Code2,
    description: "Total coding problems available on DACP.",
  },
  {
    name: "developers",
    label: "Developers",
    icon: Users,
    description: "Total registered developers.",
  },
  {
    name: "contests",
    label: "Contests",
    icon: Trophy,
    description: "Total programming contests.",
  },
  {
    name: "submissions",
    label: "Submissions",
    icon: Send,
    description: "Total code submissions.",
  },
];

const UpdatePlatformStatModal = () => {
  const navigate = useNavigate();
  const { accessToken } = useContext(AuthContext);

  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const closeModal = () => {
    navigate("/dashboard");
  };

  // Fetch existing platform statistics
  useEffect(() => {
    const fetchPlatformStats = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${baseURL}/platform_stat`);

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data.detail || "Unable to load platform statistics.");
        }

        setStats({
          total_problems: data.total_problems ?? 0,
          developers: data.developers ?? 0,
          contests: data.contests ?? 0,
          submissions: data.submissions ?? 0,
        });
      } catch (err) {
        setError(err.message || "Failed to load platform statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlatformStats();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value !== "" && (!/^\d+$/.test(value) || Number(value) < 0)) {
      return;
    }

    setStats((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const payload = {};

    for (const field of fields) {
      const value = stats[field.name];

      if (value === "" || !Number.isSafeInteger(Number(value))) {
        setError(`Please enter a valid value for ${field.label}.`);
        return;
      }

      payload[field.name] = Number(value);
    }

    setSaving(true);

    try {
      const response = await fetch(`${baseURL}/admin/update_platform_stat`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.detail || "Failed to update platform statistics.");
      }

      setSuccess(data.message || "Platform statistics updated successfully!");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/15 p-4 backdrop-blur-xs"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !saving) {
          closeModal();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="platform-stat-title"
        className="relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#111318] shadow-2xl shadow-black/50"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
              <ChartNoAxesCombined size={22} />
            </div>

            <div>
              <h2
                id="platform-stat-title"
                className="text-lg font-bold text-white"
              >
                Update Platform Statistics
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Manage the statistics displayed on your homepage.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeModal}
            disabled={saving}
            aria-label="Close modal"
            className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 p-6">
            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400">
                {success}
              </div>
            )}

            {loading ? (
              <div className="flex min-h-64 flex-col items-center justify-center gap-3">
                <LoaderCircle
                  size={30}
                  className="animate-spin text-blue-400"
                />
                <p className="text-sm text-slate-400">
                  Loading platform statistics...
                </p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((field) => {
                  const Icon = field.icon;

                  return (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200"
                      >
                        <Icon size={16} className="text-blue-400" />
                        {field.label}
                      </label>

                      <input
                        id={field.name}
                        name={field.name}
                        type="number"
                        min="0"
                        step="1"
                        required
                        value={stats[field.name]}
                        onChange={handleChange}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className="w-full rounded-lg border border-white/10 bg-[#0D1017] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
                      />

                      <p className="mt-2 text-xs text-slate-500">
                        {field.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-white/[0.07] bg-[#0D1017] px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeModal}
              disabled={saving}
              className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || saving}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Statistics
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePlatformStatModal;
