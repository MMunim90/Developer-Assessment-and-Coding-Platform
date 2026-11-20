import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Edit3,
  Filter,
  Image,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Trophy,
  Users,
  X,
} from "lucide-react";
import Swal from "sweetalert2";

import { AuthContext } from "../../context/AuthContext";
import { baseURL } from "../../services/BaseURL";

// Convert API datetime into a value suitable for datetime-local input.
const toLocalDateTimeInput = (date) => {
  if (!date) return "";
  return String(date).slice(0, 16);
};

const initialFormData = {
  title: "",
  writers: "",
  category: "",
  description: "",
  status: "upcoming",
  length: "",
  cover_image: "",
  start_at: "",
  end_at: "",
};

const statusStyles = {
  upcoming: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  running: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  past: "border-slate-500/20 bg-slate-500/10 text-slate-400",
};

const ManageContests = () => {
  const {
    authUser,
    accessToken,
    loading: authLoading,
  } = useContext(AuthContext);

  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContest, setEditingContest] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  // Fetch all contests.
  const fetchContests = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(`${baseURL}/contests/all`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to load contests.");
      }

      setContests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch contests error:", error);

      Swal.fire({
        icon: "error",
        title: "Unable to Load Contests",
        text: error.message || "Something went wrong.",
        background: "#111318",
        color: "#F1F5F9",
        confirmButtonColor: "#3B82F6",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContests();
  }, [fetchContests]);

  // Search and filter.
  const filteredContests = useMemo(() => {
    return contests.filter((contest) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        contest.title?.toLowerCase().includes(search) ||
        contest.category?.toLowerCase().includes(search) ||
        contest.writers?.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "all" || contest.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [contests, searchTerm, statusFilter]);

  // Statistics.
  const statistics = useMemo(
    () => [
      {
        label: "Total Contests",
        value: contests.length,
        icon: Trophy,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
      },
      {
        label: "Upcoming",
        value: contests.filter((item) => item.status === "upcoming").length,
        icon: CalendarDays,
        color: "text-violet-400",
        bg: "bg-violet-500/10",
      },
      {
        label: "Running",
        value: contests.filter((item) => item.status === "running").length,
        icon: Clock3,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
      },
      {
        label: "Past Contests",
        value: contests.filter((item) => item.status === "past").length,
        icon: Users,
        color: "text-slate-400",
        bg: "bg-slate-500/10",
      },
    ],
    [contests],
  );

  const openCreateModal = () => {
    setEditingContest(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const openEditModal = (contest) => {
    setEditingContest(contest);

    setFormData({
      title: contest.title || "",
      writers: contest.writers || "",
      category: contest.category || "",
      description: contest.description || "",
      status: contest.status || "upcoming",
      length: contest.length ?? "",
      cover_image: contest.cover_image || "",
      start_at: toLocalDateTimeInput(contest.start_at),
      end_at: toLocalDateTimeInput(contest.end_at),
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;

    setIsModalOpen(false);
    setEditingContest(null);
    setFormData(initialFormData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Create or update a contest.
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!accessToken) {
      Swal.fire({
        icon: "error",
        title: "Authentication Required",
        text: "Please log in again.",
        background: "#111318",
        color: "#F1F5F9",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }

    if (new Date(formData.end_at) <= new Date(formData.start_at)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Contest Schedule",
        text: "The end date and time must be after the start date and time.",
        background: "#111318",
        color: "#F1F5F9",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }

    const payload = {
      title: formData.title.trim(),
      writers: formData.writers.trim() || null,
      category: formData.category.trim(),
      description: formData.description.trim() || null,
      status: formData.status,
      length: Number(formData.length),
      cover_image: formData.cover_image.trim() || null,
      start_at: formData.start_at,
      end_at: formData.end_at,
    };

    try {
      setSubmitting(true);

      const isEditing = Boolean(editingContest);

      const url = isEditing
        ? `${baseURL}/admin/update_contest/${editingContest.id}`
        : `${baseURL}/admin/create_contest`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.detail ||
            `Failed to ${isEditing ? "update" : "create"} contest.`,
        );
      }

      await Swal.fire({
        icon: "success",
        title: isEditing ? "Contest Updated!" : "Contest Created!",
        text:
          result.message ||
          `Contest ${isEditing ? "updated" : "created"} successfully.`,
        background: "#111318",
        color: "#F1F5F9",
        confirmButtonColor: "#3B82F6",
      });

      setIsModalOpen(false);
      setEditingContest(null);
      setFormData(initialFormData);

      await fetchContests();
    } catch (error) {
      console.error("Contest submission error:", error);

      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: error.message || "Something went wrong.",
        background: "#111318",
        color: "#F1F5F9",
        confirmButtonColor: "#3B82F6",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Delete a contest.
  const handleDelete = async (contest) => {
    if (!accessToken) {
      Swal.fire({
        icon: "error",
        title: "Authentication Required",
        text: "Please log in again.",
        background: "#111318",
        color: "#F1F5F9",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }

    const confirmation = await Swal.fire({
      title: "Delete Contest?",
      text: `Are you sure you want to delete "${contest.title}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      background: "#111318",
      color: "#F1F5F9",
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#334155",
      reverseButtons: true,
    });

    if (!confirmation.isConfirmed) return;

    try {
      const response = await fetch(
        `${baseURL}/admin/delete_contest/${contest.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "Failed to delete contest.");
      }

      setContests((previous) =>
        previous.filter((item) => item.id !== contest.id),
      );

      Swal.fire({
        icon: "success",
        title: "Contest Deleted!",
        text: result.message || "Contest deleted successfully.",
        background: "#111318",
        color: "#F1F5F9",
        confirmButtonColor: "#3B82F6",
      });
    } catch (error) {
      console.error("Delete contest error:", error);

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error.message || "Something went wrong.",
        background: "#111318",
        color: "#F1F5F9",
        confirmButtonColor: "#3B82F6",
      });
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (authLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#08090D]">
        <RefreshCw className="animate-spin text-blue-400" size={30} />
      </div>
    );
  }

  if (!authUser || authUser.role !== "admin") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#08090D] px-4 text-center">
        <div className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
          <X size={32} className="text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Access Denied</h2>
        <p className="mt-2 text-sm text-slate-400">
          Only administrators can manage contests.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090D] px-4 py-8 text-slate-200 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-8xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-400">
              <Trophy size={16} />
              <span>Administration</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">Contests</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Manage Contests
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Create, update, and manage programming contests on DACP.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchContests}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#111318] px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-blue-500/40 hover:bg-[#161B25] hover:text-white disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              <Plus size={18} />
              Create Contest
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-white/[0.07] bg-[#111318] p-5 transition hover:border-blue-500/20"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <div className={`rounded-xl p-2.5 ${item.bg}`}>
                    <Icon size={19} className={item.color} />
                  </div>
                </div>

                <h3 className="mt-4 text-3xl font-bold tracking-tight text-white">
                  {item.value}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Contest Table Section */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111318]">
          <div className="flex flex-col gap-4 border-b border-white/[0.07] p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">All Contests</h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage your platform's programming contests.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Search */}
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="text"
                  placeholder="Search contests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0D1017] py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50 sm:w-60"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-[#0D1017] py-2.5 pl-9 pr-9 text-sm text-slate-300 outline-none transition focus:border-blue-500/50 sm:w-40"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="running">Running</option>
                  <option value="past">Past</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="border-b border-white/[0.07] bg-[#0D1017]">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4 font-semibold">Contest</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Schedule</th>
                  <th className="px-6 py-4 font-semibold">Duration</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.05]">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center">
                      <RefreshCw
                        size={26}
                        className="mx-auto animate-spin text-blue-400"
                      />
                      <p className="mt-3 text-sm text-slate-500">
                        Loading contests...
                      </p>
                    </td>
                  </tr>
                ) : filteredContests.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
                        <Trophy size={25} className="text-blue-400" />
                      </div>
                      <h3 className="mt-4 font-semibold text-white">
                        No contests found
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {searchTerm || statusFilter !== "all"
                          ? "Try changing your search or filter."
                          : "Create your first contest to get started."}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredContests.map((contest) => (
                    <tr
                      key={contest.id}
                      className="transition hover:bg-white/[0.02]"
                    >
                      {/* Contest Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0D1017]">
                            {contest.cover_image ? (
                              <img
                                src={contest.cover_image}
                                alt={contest.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Trophy size={20} className="text-blue-400" />
                            )}
                          </div>

                          <div className="max-w-[230px]">
                            <p className="truncate font-semibold text-white">
                              {contest.title}
                            </p>
                            <p className="mt-1 truncate text-xs text-slate-500">
                              {contest.writers || "No writer specified"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300">
                          {contest.category}
                        </span>
                      </td>

                      {/* Schedule */}
                      <td className="px-6 py-4">
                        <div className="space-y-2 text-xs">
                          <div>
                            <p className="mb-1 text-slate-600">Starts</p>
                            <p className="text-slate-300">
                              {formatDate(contest.start_at)}
                            </p>
                          </div>
                          <div>
                            <p className="mb-1 text-slate-600">Ends</p>
                            <p className="text-slate-300">
                              {formatDate(contest.end_at)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Duration */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-300">
                          {contest.length} hours
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${
                            statusStyles[contest.status] ||
                            "border-slate-500/20 bg-slate-500/10 text-slate-400"
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {contest.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(contest)}
                            title="Edit contest"
                            className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-2.5 text-blue-400 transition hover:bg-blue-500/20"
                          >
                            <Edit3 size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(contest)}
                            title="Delete contest"
                            className="rounded-lg border border-red-500/20 bg-red-500/10 p-2.5 text-red-400 transition hover:bg-red-500/20"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {!loading && (
            <div className="flex flex-col gap-2 border-t border-white/[0.07] px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing{" "}
                <span className="font-semibold text-slate-300">
                  {filteredContests.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-300">
                  {contests.length}
                </span>{" "}
                contests
              </p>

              <p className="text-slate-600">
                Developer Assessment and Coding Platform
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#111318] shadow-2xl shadow-black/50">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
              <div>
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                  <Trophy size={14} />
                  DACP Administration
                </div>

                <h2 className="text-xl font-bold text-white">
                  {editingContest ? "Update Contest" : "Create New Contest"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {editingContest
                    ? "Modify the contest information below."
                    : "Fill in the details to publish a new contest."}
                </p>
              </div>

              <button
                onClick={closeModal}
                disabled={submitting}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit}>
              <div className="max-h-[65vh] space-y-5 overflow-y-auto p-6">
                {/* Title and Category */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Contest Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      minLength={3}
                      maxLength={200}
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. DACP Monthly Challenge"
                      className="w-full rounded-xl border border-white/10 bg-[#0D1017] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Category <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="category"
                      required
                      minLength={2}
                      maxLength={100}
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="e.g. Algorithm, Data Structures"
                      className="w-full rounded-xl border border-white/10 bg-[#0D1017] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60"
                    />
                  </div>
                </div>

                {/* Writers and Status */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Writers
                    </label>
                    <input
                      type="text"
                      name="writers"
                      value={formData.writers}
                      onChange={handleChange}
                      placeholder="e.g. DACP Team"
                      className="w-full rounded-xl border border-white/10 bg-[#0D1017] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Contest Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-[#0D1017] px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500/60"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="running">Running</option>
                      <option value="past">Past</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the contest, rules, and objectives..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#0D1017] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60"
                  />
                </div>

                {/* Cover Image */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Image size={15} className="text-blue-400" />
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    name="cover_image"
                    value={formData.cover_image}
                    onChange={handleChange}
                    placeholder="https://example.com/contest-cover.jpg"
                    className="w-full rounded-xl border border-white/10 bg-[#0D1017] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Duration (Hours) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="length"
                    required
                    min="0"
                    step="0.5"
                    value={formData.length}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                    className="w-full rounded-xl border border-white/10 bg-[#0D1017] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60"
                  />
                </div>

                {/* Start and End Date */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                      <CalendarDays size={15} className="text-blue-400" />
                      Start Date & Time
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      name="start_at"
                      required
                      value={formData.start_at}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-[#0D1017] px-3 py-3 text-sm text-slate-300 outline-none focus:border-blue-500/60"
                    />
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                      <CalendarDays size={15} className="text-blue-400" />
                      End Date & Time
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      name="end_at"
                      required
                      value={formData.end_at}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-[#0D1017] px-3 py-3 text-sm text-slate-300 outline-none focus:border-blue-500/60"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col-reverse gap-3 border-t border-white/[0.07] bg-[#0D1017] px-6 py-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Plus size={17} />
                      {editingContest ? "Save Changes" : "Create Contest"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContests;
