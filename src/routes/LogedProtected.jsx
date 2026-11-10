import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

const LogedProtected = ({ children }) => {
  const { authUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="loader" role="status" aria-label="Loading"></div>
      </div>
    );
  }

  if (authUser) {
    return <Navigate to={"/"}></Navigate>;
  }

  return children;
};

export default LogedProtected;
