import { useCallback, useContext, useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  AtSign,
  ShieldCheck,
  Pencil,
  LockKeyhole,
  Save,
  X,
  Eye,
  EyeOff,
  LoaderCircle,
  CheckCircle2,
  Code2,
  Terminal,
  Activity,
  Fingerprint,
} from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { baseURL } from "../services/BaseURL";

const API_URL = `${baseURL}/user_profile`;
const UPDATE_USER_URL = `${baseURL}/update_user`;
const UPDATE_PASSWORD_URL = `${baseURL}/update_password`;

const initialProfile = {
  email: "",
  username: "",
  firstname: "",
  lastname: "",
  phone_number: "",
  role: "",
  is_active: false,
  id: null,
};

const swalTheme = {
  background: "#111318",
  color: "#e2e8f0",
  confirmButtonColor: "#3B82F6",
  customClass: {
    popup: "dacp-swal",
    title: "dacp-swal-title",
    confirmButton: "dacp-swal-button",
  },
};

const UserProfile = () => {
  const { accessToken } = useContext(AuthContext);

  const [profile, setProfile] = useState(initialProfile);
  const [formData, setFormData] = useState(initialProfile);

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Fetch Profile
  const fetchProfile = useCallback(async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          response.status === 401
            ? "Your session has expired. Please log in again."
            : "Failed to load your profile.",
        );
      }

      const data = await response.json();

      const safeProfile = {
        ...initialProfile,
        ...data,
      };

      delete safeProfile.hash_password;

      setProfile(safeProfile);

      setFormData({
        email: safeProfile.email || "",
        username: safeProfile.username || "",
        firstname: safeProfile.firstname || "",
        lastname: safeProfile.lastname || "",
        phone_number: safeProfile.phone_number || "",
      });
    } catch (error) {
      Swal.fire({
        ...swalTheme,
        icon: "error",
        iconColor: "#f87171",
        title: "Unable to Load Profile",
        text: error.message || "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Input Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset Profile Form
  const resetProfileForm = () => {
    setFormData({
      email: profile.email || "",
      username: profile.username || "",
      firstname: profile.firstname || "",
      lastname: profile.lastname || "",
      phone_number: profile.phone_number || "",
    });
  };

  // Update Profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      ...swalTheme,
      icon: "question",
      iconColor: "#60a5fa",
      title: "Save Profile Changes?",
      text: "Do you want to update your profile information?",
      showCancelButton: true,
      confirmButtonText: "Yes, Save Changes",
      cancelButtonText: "Keep Editing",
      cancelButtonColor: "#475569",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setSavingProfile(true);

    try {
      const payload = {
        email: formData.email.trim(),
        username: formData.username.trim(),
        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
        phone_number: formData.phone_number.trim(),
      };

      const response = await fetch(UPDATE_USER_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.detail || data.message || "Failed to update your profile.",
        );
      }

      setProfile((prev) => ({
        ...prev,
        ...payload,
        ...(data && typeof data === "object" ? data : {}),
      }));

      setEditing(false);

      await Swal.fire({
        ...swalTheme,
        icon: "success",
        iconColor: "#60a5fa",
        title: "Profile Updated!",
        text: "Your profile information has been saved successfully.",
      });

      await fetchProfile();
    } catch (error) {
      Swal.fire({
        ...swalTheme,
        icon: "error",
        iconColor: "#f87171",
        title: "Update Failed",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  // Update Password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (passwordData.new_password.length < 8) {
      Swal.fire({
        ...swalTheme,
        icon: "warning",
        iconColor: "#fbbf24",
        title: "Password Too Short",
        text: "Your new password must contain at least 8 characters.",
      });
      return;
    }

    const result = await Swal.fire({
      ...swalTheme,
      icon: "warning",
      iconColor: "#fbbf24",
      title: "Change Password?",
      text: "You will use your new password the next time you log in.",
      showCancelButton: true,
      confirmButtonText: "Yes, Change Password",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#475569",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setSavingPassword(true);

    try {
      const response = await fetch(UPDATE_PASSWORD_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(passwordData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.detail || data.message || "Failed to change your password.",
        );
      }

      setPasswordData({
        current_password: "",
        new_password: "",
      });

      setShowCurrentPassword(false);
      setShowNewPassword(false);

      await Swal.fire({
        ...swalTheme,
        icon: "success",
        iconColor: "#60a5fa",
        title: "Password Changed!",
        text: "Your password has been updated successfully.",
      });
    } catch (error) {
      Swal.fire({
        ...swalTheme,
        icon: "error",
        iconColor: "#f87171",
        title: "Password Update Failed",
        text: error.message || "Please check your current password.",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  // Profile Information
  const fullName =
    `${profile.firstname} ${profile.lastname}`.trim() || "DACP Developer";

  const initials =
    `${profile.firstname?.[0] || ""}${profile.lastname?.[0] || ""}`.toUpperCase() ||
    profile.username?.[0]?.toUpperCase() ||
    "D";

  const inputClass =
    "mt-2 w-full rounded-lg border border-white/10 bg-[#0D1017] px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60";

  const labelClass = "text-sm font-medium text-slate-300";

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#08090D]">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
            <LoaderCircle className="animate-spin text-blue-400" size={27} />
          </div>

          <p className="text-sm text-slate-400">
            Loading your developer profile...
          </p>
        </div>
      </div>
    );
  }

  // Login Required
  if (!accessToken) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#08090D] px-4">
        <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#111318] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
            <LockKeyhole size={26} className="text-blue-400" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-white">
            Authentication Required
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Please log in to DACP to access and manage your developer profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08090D] px-4 py-10 text-slate-200 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-blue-600/[0.07] blur-[130px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-violet-600/[0.05] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-400">
            <Terminal size={17} />
            <span>Developer Account</span>
            <span className="text-slate-700">/</span>
            <span className="text-slate-500">Profile</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Manage your developer identity, personal information, and account
            security in one place.
          </p>
        </div>

        {/* Profile Banner */}
        <section className="relative mb-6 overflow-hidden rounded-xl border border-white/[0.08] bg-[#111318]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-blue-600/15 via-violet-600/10 to-transparent" />

          <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-3xl font-bold text-blue-300 shadow-lg shadow-blue-950/30">
              {initials}
            </div>

            {/* Profile Details */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="break-words text-2xl font-bold text-white sm:text-3xl">
                  {fullName}
                </h2>

                {profile.is_active && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 size={13} />
                    Active
                  </span>
                )}
              </div>

              <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                <AtSign size={15} className="text-blue-400" />
                {profile.username || "username"}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-medium capitalize text-blue-300">
                  <ShieldCheck size={14} />
                  {profile.role || "Developer"}
                </span>

                {profile.id != null && (
                  <span className="inline-flex items-center gap-2 rounded-lg border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-xs text-violet-300">
                    <Fingerprint size={14} />
                    ID: {profile.id}
                  </span>
                )}
              </div>
            </div>

            {/* Edit Button */}
            <button
              type="button"
              onClick={() => {
                if (editing) {
                  resetProfileForm();
                  setEditing(false);
                } else {
                  resetProfileForm();
                  setEditing(true);
                }
              }}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-blue-500/25 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-300 transition hover:border-blue-500/40 hover:bg-blue-500/20"
            >
              {editing ? <X size={17} /> : <Pencil size={17} />}
              {editing ? "Cancel Editing" : "Edit Profile"}
            </button>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
          {/* Personal Information */}
          <section className="rounded-xl border border-white/[0.07] bg-[#111318] p-5 sm:p-7 lg:col-span-3">
            <div className="mb-7 flex items-center gap-3 border-b border-white/[0.07] pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10">
                <UserRound size={21} className="text-blue-400" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Personal Information
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Manage your developer account details
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* First Name */}
                <div>
                  <label className={labelClass} htmlFor="firstname">
                    First Name
                  </label>

                  <input
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="Enter first name"
                    required
                    disabled={!editing || savingProfile}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className={labelClass} htmlFor="lastname">
                    Last Name
                  </label>

                  <input
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="Enter last name"
                    required
                    disabled={!editing || savingProfile}
                  />
                </div>

                {/* Username */}
                <div>
                  <label className={labelClass} htmlFor="username">
                    Username
                  </label>

                  <div className="relative">
                    <AtSign
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                    />

                    <input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`${inputClass} pl-10`}
                      placeholder="Enter username"
                      required
                      disabled={!editing || savingProfile}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass} htmlFor="email">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                    />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`${inputClass} pl-10`}
                      placeholder="Enter email"
                      required
                      disabled={!editing || savingProfile}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="phone_number">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                    />

                    <input
                      id="phone_number"
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className={`${inputClass} pl-10`}
                      placeholder="Enter phone number"
                      disabled={!editing || savingProfile}
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              {editing && (
                <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-white/[0.07] pt-5">
                  <button
                    type="button"
                    disabled={savingProfile}
                    onClick={() => {
                      resetProfileForm();
                      setEditing(false);
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 disabled:opacity-50"
                  >
                    <X size={16} />
                    Discard
                  </button>

                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {savingProfile ? (
                      <LoaderCircle size={17} className="animate-spin" />
                    ) : (
                      <Save size={17} />
                    )}

                    {savingProfile ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </form>

            {!editing && (
              <div className="mt-6 flex items-start gap-2 border-t border-white/[0.07] pt-5 text-xs leading-5 text-slate-500">
                <ShieldCheck
                  size={16}
                  className="mt-0.5 shrink-0 text-blue-400"
                />
                <p>
                  Your personal information is securely associated with your
                  DACP developer account.
                </p>
              </div>
            )}
          </section>

          {/* Right Sidebar */}
          <div className="space-y-6 lg:col-span-2">
            {/* Account Overview */}
            <section className="rounded-xl border border-white/[0.07] bg-[#111318] p-5 sm:p-6">
              <div className="mb-6 flex items-center gap-3 border-b border-white/[0.07] pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
                  <Activity size={20} className="text-violet-400" />
                </div>

                <div>
                  <h3 className="font-bold text-white">Account Overview</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Your account at a glance
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm text-slate-500">
                    <Fingerprint size={15} />
                    Account ID
                  </span>

                  <span className="text-sm font-semibold text-blue-300">
                    {profile.id ?? "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm text-slate-500">
                    <ShieldCheck size={15} />
                    Role
                  </span>

                  <span className="rounded-md border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold capitalize text-blue-300">
                    {profile.role || "Developer"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm text-slate-500">
                    <CheckCircle2 size={15} />
                    Account Status
                  </span>

                  <span
                    className={`inline-flex items-center gap-2 text-xs font-semibold ${
                      profile.is_active ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        profile.is_active ? "bg-emerald-400" : "bg-red-400"
                      }`}
                    />
                    {profile.is_active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] pt-5">
                  <span className="flex items-center gap-2 text-sm text-slate-500">
                    <Mail size={15} />
                    Email
                  </span>

                  <span className="max-w-[60%] truncate text-xs text-slate-300">
                    {profile.email || "Not provided"}
                  </span>
                </div>
              </div>
            </section>

            {/* Change Password */}
            <section className="rounded-xl border border-white/[0.07] bg-[#111318] p-5 sm:p-6">
              <div className="mb-6 flex items-center gap-3 border-b border-white/[0.07] pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10">
                  <LockKeyhole size={20} className="text-blue-400" />
                </div>

                <div>
                  <h3 className="font-bold text-white">Change Password</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Keep your account secure
                  </p>
                </div>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                {/* Current Password */}
                <div>
                  <label htmlFor="current_password" className={labelClass}>
                    Current Password
                  </label>

                  <div className="relative">
                    <input
                      id="current_password"
                      type={showCurrentPassword ? "text" : "password"}
                      name="current_password"
                      value={passwordData.current_password}
                      onChange={handlePasswordChange}
                      className={`${inputClass} pr-12`}
                      placeholder="Enter current password"
                      autoComplete="current-password"
                      required
                      disabled={savingPassword}
                    />

                    <button
                      type="button"
                      aria-label={
                        showCurrentPassword
                          ? "Hide current password"
                          : "Show current password"
                      }
                      onClick={() => setShowCurrentPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition hover:text-blue-400"
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label htmlFor="new_password" className={labelClass}>
                    New Password
                  </label>

                  <div className="relative">
                    <input
                      id="new_password"
                      type={showNewPassword ? "text" : "password"}
                      name="new_password"
                      value={passwordData.new_password}
                      onChange={handlePasswordChange}
                      className={`${inputClass} pr-12`}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                      disabled={savingPassword}
                    />

                    <button
                      type="button"
                      aria-label={
                        showNewPassword
                          ? "Hide new password"
                          : "Show new password"
                      }
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition hover:text-blue-400"
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-600">
                    Use at least 8 characters.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={
                    savingPassword ||
                    !passwordData.current_password ||
                    !passwordData.new_password
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-300 transition hover:border-blue-500/40 hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {savingPassword ? (
                    <LoaderCircle size={17} className="animate-spin" />
                  ) : (
                    <LockKeyhole size={17} />
                  )}

                  {savingPassword ? "Updating Password..." : "Update Password"}
                </button>
              </form>
            </section>

            {/* Security Note */}
            <div className="flex gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
              <ShieldCheck size={19} className="shrink-0 text-emerald-400" />

              <div>
                <h4 className="text-sm font-semibold text-emerald-300">
                  Account Security
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Keep your credentials private and update your password
                  regularly to protect your developer account.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-center sm:flex-row">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Code2 size={15} />
            <span>DACP · Developer Assessment and Coding Platform</span>
          </div>

          <span className="text-xs text-slate-600">
            Code. Compete. Evaluate. Excel.
          </span>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
