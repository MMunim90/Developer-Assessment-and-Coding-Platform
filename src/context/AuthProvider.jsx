import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { baseURL } from "../services/BaseURL";
import Swal from "sweetalert2";

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem("user_token");

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) {
        setAuthUser(null);
        setLoading(false);
        return;
      }

      try {
        const userRes = await fetch(`${baseURL}/user_profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Token expired or invalid
        if (userRes.status === 401) {
          localStorage.removeItem("user_token");
          setAuthUser(null);
          return;
        }

        if (!userRes.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData = await userRes.json();

        // User does not exist
        if (userData.detail === "User Not Found!!!") {
          localStorage.removeItem("user_token");
          setAuthUser(null);
          return;
        }

        setAuthUser(userData);
      } catch (error) {
        console.error("Authentication error:", error);
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  const logout = () => {
    localStorage.removeItem("user_token");
    setAuthUser(null);

    Swal.fire({
      icon: "success",
      title: "See You, Developer!",
      text: "You have successfully logged out of DACP.",
      background: "#111318",
      color: "#F1F5F9",
      confirmButtonColor: "#3B82F6",
      iconColor: "#60A5FA",
      confirmButtonText: "Got it",
      customClass: {
        popup: "dacp-swal",
        title: "dacp-swal-title",
        htmlContainer: "dacp-swal-text",
        confirmButton: "dacp-swal-button",
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        logout,
        accessToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
