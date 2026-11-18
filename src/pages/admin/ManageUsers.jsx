import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  Users,
  Search,
  RefreshCw,
  ShieldCheck,
  UserRound,
  UserCog,
  Mail,
  Phone,
  Pencil,
  Trash2,
  X,
  LoaderCircle,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  UserX,
  Terminal,
  Filter,
  ArrowUpRight,
  ShieldAlert,
  Activity,
} from "lucide-react";
import Swal from "sweetalert2";

import { baseURL } from "../../services/BaseURL";
import { AuthContext } from "../../context/AuthContext";

const API_URL = `${baseURL}/admin/users/all`;

// DACP SweetAlert theme
const swalTheme = {
  background: "#111318",
  color: "#F8FAFC",
  confirmButtonColor: "#2563EB",
  cancelButtonColor: "#475569",
  iconColor: "#3B82F6",
  customClass: {
    popup: "dacp-swal",
    title: "dacp-swal-title",
    confirmButton: "dacp-swal-button",
    cancelButton: "dacp-swal-button",
  },
};

// Keep these values consistent with your backend.
const roles = ["developer", "admin"];

const roleStyles = {
  admin: "border-violet-500/20 bg-violet-500/10 text-violet-300",
  developer: "border-blue-500/20 bg-blue-500/10 text-blue-300",
};

const ManageUsers = () => {
  const { accessToken } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [editingUser, setEditingUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("developer");
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Authorization headers
  const authHeaders = useCallback(
    (json = false) => ({
      Authorization: `Bearer ${accessToken}`,
      ...(json ? { "Content-Type": "application/json" } : {}),
    }),
    [accessToken],
  );

  // Handle API responses
  const readResponse = async (response) => {
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        data?.detail || data?.message || `Request failed (${response.status})`,
      );
    }

    return data;
  };

  // Fetch all users
  const fetchUsers = useCallback(
    async (isRefresh = false) => {
      if (!accessToken) {
        setUsers([]);
        setError("Authentication token not found. Please log in again.");
        setLoading(false);
        setRefreshing(false);
        return;
      }

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: authHeaders(),
        });

        const data = await readResponse(response);

        if (!Array.isArray(data)) {
          throw new Error("The server returned an unexpected users response.");
        }

        // Never expose password fields in the UI.
        setUsers(data.map(({ hash_password, password, ...user }) => user));
      } catch (err) {
        setError(err.message || "Failed to load users.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [accessToken, authHeaders],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Search and filter users
  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const fullName = `${user.firstname || ""} ${user.lastname || ""}`
        .trim()
        .toLowerCase();

      const matchesSearch =
        !query ||
        fullName.includes(query) ||
        String(user.username || "")
          .toLowerCase()
          .includes(query) ||
        String(user.email || "")
          .toLowerCase()
          .includes(query) ||
        String(user.phone_number || "")
          .toLowerCase()
          .includes(query) ||
        String(user.id).includes(query);

      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.is_active === true) ||
        (statusFilter === "inactive" && user.is_active === false);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  // Dashboard statistics
  const stats = useMemo(
    () => ({
      total: users.length,
      active: users.filter((user) => user.is_active === true).length,
      admins: users.filter((user) => user.role === "admin").length,
      developers: users.filter((user) => user.role === "developer").length,
    }),
    [users],
  );

  // Full name helper
  const fullName = (user) =>
    `${user.firstname || ""} ${user.lastname || ""}`.trim() ||
    user.username ||
    "Unnamed User";

  // Open role modal
  const openRoleModal = (user) => {
    setEditingUser(user);
    setSelectedRole(user.role || "developer");
  };

  // Close role modal
  const closeRoleModal = () => {
    if (updating) return;

    setEditingUser(null);
    setSelectedRole("developer");
  };

  // Update user role
  const handleUpdateRole = async (e) => {
    e.preventDefault();

    if (!editingUser || selectedRole === editingUser.role) {
      closeRoleModal();
      return;
    }

    setUpdating(true);

    try {
      const url = new URL(`${baseURL}/admin/update_user_role`);
      url.searchParams.set("user_id", editingUser.id);

      const response = await fetch(url.toString(), {
        method: "PUT",
        headers: authHeaders(true),
        body: JSON.stringify({ role: selectedRole }),
      });

      await readResponse(response);

      setUsers((previous) =>
        previous.map((user) =>
          user.id === editingUser.id ? { ...user, role: selectedRole } : user,
        ),
      );

      setEditingUser(null);

      await Swal.fire({
        ...swalTheme,
        icon: "success",
        title: "Role Updated",
        text: `${editingUser.username || editingUser.email} is now a ${selectedRole}.`,
        confirmButtonText: "Continue",
      });
    } catch (err) {
      await Swal.fire({
        ...swalTheme,
        icon: "error",
        iconColor: "#F87171",
        title: "Update Failed",
        text: err.message || "Could not update the user's role.",
        confirmButtonText: "Try Again",
      });
    } finally {
      setUpdating(false);
    }
  };

  // Remove user
  const handleRemoveUser = async (user) => {
    const result = await Swal.fire({
      ...swalTheme,
      icon: "warning",
      iconColor: "#F87171",
      title: "Remove This User?",
      text: `${fullName(user)} will be removed from DACP.`,
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#475569",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setDeletingId(user.id);

    try {
      const response = await fetch(`${baseURL}/admin/remove_user/${user.id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      await readResponse(response);

      setUsers((previous) => previous.filter((item) => item.id !== user.id));

      await Swal.fire({
        ...swalTheme,
        icon: "success",
        title: "User Removed",
        text: "The user has been removed successfully.",
        confirmButtonText: "Continue",
      });
    } catch (err) {
      await Swal.fire({
        ...swalTheme,
        icon: "error",
        iconColor: "#F87171",
        title: "Removal Failed",
        text: err.message || "Could not remove this user.",
        confirmButtonText: "Try Again",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#0D1017] px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10";

  const selectClass =
    "w-full appearance-none rounded-xl border border-white/10 bg-[#0D1017] px-4 py-3 pr-10 text-sm text-slate-300 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10";

  return (
    <div className="min-h-screen bg-[#08090D] p-4 text-slate-200 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-7">
        {/* Page Header */}
        <section className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111318] p-5 sm:p-7">
          <div className="pointer-events-none absolute -right-20 -top-32 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
                <ShieldCheck size={16} />
                Administration
                <span className="text-slate-700">/</span>
                <span className="text-slate-500">User Management</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Manage Users
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Manage developer accounts, monitor account activity, and control
                user permissions from one place.
              </p>
            </div>

            <button
              type="button"
              onClick={() => fetchUsers(true)}
              disabled={loading || refreshing}
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-blue-500/25 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-300 transition hover:border-blue-400/40 hover:bg-blue-500/15 disabled:cursor-not-allowed disabled:opacity-50 sm:self-center"
            >
              <RefreshCw
                size={17}
                className={refreshing ? "animate-spin" : ""}
              />
              {refreshing ? "Refreshing..." : "Refresh Users"}
            </button>
          </div>
        </section>

        {/* Statistics */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">User Overview</h2>
              <p className="mt-1 text-xs text-slate-500">
                Account statistics and user distribution.
              </p>
            </div>

            <Activity size={19} className="text-blue-400" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total Users",
                value: stats.total,
                icon: Users,
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "border-blue-500/15",
                description: "Registered accounts",
              },
              {
                label: "Active Accounts",
                value: stats.active,
                icon: CheckCircle2,
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/15",
                description: "Currently active users",
              },
              {
                label: "admins",
                value: stats.admins,
                icon: ShieldCheck,
                color: "text-violet-400",
                bg: "bg-violet-500/10",
                border: "border-violet-500/15",
                description: "Elevated role accounts",
              },
              {
                label: "developers",
                value: stats.developers,
                icon: UserRound,
                color: "text-amber-400",
                bg: "bg-amber-500/10",
                border: "border-amber-500/15",
                description: "Standard user accounts",
              },
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={`group rounded-xl border ${stat.border} bg-[#111318] p-5 transition duration-300 hover:-translate-y-1 hover:bg-[#141923]`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`rounded-xl ${stat.bg} p-3`}>
                      <Icon size={21} className={stat.color} />
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="text-slate-600 transition group-hover:text-blue-400"
                    />
                  </div>

                  <p className="mt-5 text-3xl font-bold text-white">
                    {loading ? "—" : stat.value}
                  </p>

                  <h3 className="mt-1 text-sm font-semibold text-slate-300">
                    {stat.label}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* User Management */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111318]">
          {/* Section Header and Filters */}
          <div className="border-b border-white/[0.07] p-5 sm:p-6">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Users size={19} className="text-blue-400" />
                    <h2 className="text-lg font-bold text-white">All Users</h2>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    {loading
                      ? "Loading user records..."
                      : `${filteredUsers.length} of ${users.length} users shown`}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Terminal size={15} className="text-blue-400" />
                  User Management Console
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {/* Search */}
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name, email, username..."
                    className={`${inputClass} pl-10`}
                    aria-label="Search users"
                  />
                </div>

                {/* Role Filter */}
                <div className="relative">
                  <Filter
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className={`${selectClass} pl-10`}
                    aria-label="Filter by role"
                  >
                    <option value="all">All Roles</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <Activity
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`${selectClass} pl-10`}
                    aria-label="Filter by account status"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="m-5 flex flex-col gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0 text-red-400"
                />

                <div>
                  <p className="font-semibold text-red-300">
                    Could not load users
                  </p>
                  <p className="mt-1 break-words text-sm text-red-300/70">
                    {error}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => fetchUsers(true)}
                className="rounded-lg border border-red-500/20 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/10"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && !error ? (
            <div className="flex min-h-72 flex-col items-center justify-center gap-3 p-8">
              <LoaderCircle size={35} className="animate-spin text-blue-400" />
              <p className="text-sm text-slate-400">
                Loading developer accounts...
              </p>
            </div>
          ) : !error && filteredUsers.length === 0 ? (
            /* Empty State */
            <div className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
              <div className="rounded-2xl border border-blue-500/15 bg-blue-500/10 p-4">
                <UserX size={32} className="text-blue-400" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white">
                No users found
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                No accounts match your current search or filter settings. Try
                changing your search keywords or filters.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setRoleFilter("all");
                  setStatusFilter("all");
                }}
                className="mt-5 rounded-lg border border-blue-500/20 px-4 py-2.5 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/10"
              >
                Clear Filters
              </button>
            </div>
          ) : !error ? (
            <>
              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px] text-left">
                  <thead className="border-b border-white/[0.07] bg-[#0D1017]">
                    <tr className="text-[11px] uppercase tracking-wider text-slate-500">
                      <th className="px-5 py-4 font-semibold">User</th>
                      <th className="px-5 py-4 font-semibold">Contact</th>
                      <th className="px-5 py-4 font-semibold">Role</th>
                      <th className="px-5 py-4 font-semibold">Status</th>
                      <th className="px-5 py-4 text-right font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/[0.06]">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="transition hover:bg-blue-500/[0.025]"
                      >
                        {/* User Information */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-sm font-bold uppercase text-blue-300">
                              {(
                                user.firstname?.[0] ||
                                user.username?.[0] ||
                                user.email?.[0] ||
                                "U"
                              ).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-[220px] truncate text-sm font-semibold text-slate-100">
                                {fullName(user)}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                @{user.username || "username"}
                                <span className="mx-1.5">·</span>
                                ID: {user.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact Information */}
                        <td className="px-5 py-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                              <Mail
                                size={14}
                                className="shrink-0 text-blue-400"
                              />
                              <span className="max-w-[220px] truncate">
                                {user.email || "No email"}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Phone
                                size={13}
                                className="shrink-0 text-slate-500"
                              />
                              {user.phone_number || "No phone number"}
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                              roleStyles[user.role] ||
                              "border-slate-500/20 bg-slate-500/10 text-slate-400"
                            }`}
                          >
                            {user.role === "admin" ? (
                              <ShieldCheck size={13} />
                            ) : (
                              <UserRound size={13} />
                            )}

                            {user.role || "Unknown"}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                              user.is_active === true
                                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                : "border-red-500/20 bg-red-500/10 text-red-400"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                user.is_active === true
                                  ? "bg-emerald-400"
                                  : "bg-red-400"
                              }`}
                            />

                            {user.is_active === true ? "Active" : "Inactive"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => openRoleModal(user)}
                              title="Update user role"
                              aria-label={`Update role for ${fullName(user)}`}
                              className="inline-flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-semibold text-blue-300 transition hover:border-blue-500/40 hover:bg-blue-500/20"
                            >
                              <Pencil size={14} />
                              Role
                            </button>

                            <button
                              type="button"
                              onClick={() => handleRemoveUser(user)}
                              disabled={deletingId === user.id}
                              title="Remove user"
                              aria-label={`Remove ${fullName(user)}`}
                              className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 transition hover:border-red-500/40 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {deletingId === user.id ? (
                                <LoaderCircle
                                  size={14}
                                  className="animate-spin"
                                />
                              ) : (
                                <Trash2 size={14} />
                              )}
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="flex flex-col gap-2 border-t border-white/[0.07] px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  Showing {filteredUsers.length} user
                  {filteredUsers.length !== 1 ? "s" : ""}
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  User records loaded
                </span>
              </div>
            </>
          ) : null}
        </section>

        {/* Security Information */}
        <section className="flex flex-col gap-4 rounded-xl border border-blue-500/15 bg-blue-500/[0.04] p-5 sm:flex-row sm:items-center">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
            <ShieldAlert size={21} className="text-blue-400" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              Account Management Security
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Role changes and account removal affect user access. Always verify
              account details before making administrative changes.
            </p>
          </div>
        </section>
      </div>

      {/* Update Role Modal */}
      {editingUser && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-md"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeRoleModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="update-role-title"
            className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#111318] shadow-2xl shadow-black/50"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/[0.07] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3">
                  <ShieldCheck size={22} className="text-blue-400" />
                </div>

                <div>
                  <h2
                    id="update-role-title"
                    className="text-lg font-bold text-white"
                  >
                    Update User Role
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Manage account permissions
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeRoleModal}
                disabled={updating}
                aria-label="Close modal"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
              >
                <X size={19} />
              </button>
            </div>

            {/* User Details */}
            <div className="p-5 sm:p-6">
              <div className="rounded-xl border border-white/[0.07] bg-[#0D1017] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-bold uppercase text-blue-300">
                    {(
                      editingUser.firstname?.[0] ||
                      editingUser.username?.[0] ||
                      "U"
                    ).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {fullName(editingUser)}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {editingUser.email || "No email"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3">
                  <span className="text-xs text-slate-500">Current Role</span>

                  <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold capitalize text-blue-300">
                    {editingUser.role}
                  </span>
                </div>
              </div>

              {/* Role Form */}
              <form onSubmit={handleUpdateRole} className="mt-5 space-y-5">
                <div>
                  <label
                    htmlFor="user-role"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Select New Role
                  </label>

                  <div className="relative">
                    <UserCog
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <select
                      id="user-role"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className={`${selectClass} pl-10`}
                      required
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                  </div>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Elevated roles may grant additional permissions. Only assign
                    roles appropriate for the user's responsibilities.
                  </p>
                </div>

                {/* Modal Actions */}
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeRoleModal}
                    disabled={updating}
                    className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={updating || selectedRole === editingUser.role}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {updating ? (
                      <>
                        <LoaderCircle size={16} className="animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
