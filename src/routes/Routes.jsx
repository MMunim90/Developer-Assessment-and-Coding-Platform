import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../layout/Dashboard";
import Forbidden from "../pages/Forbidden";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../pages/UserProfile";
import ManageUsers from "../pages/admin/ManageUsers";
import AdminProtected from "./AdminProtected";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import HelpCenter from "../pages/HelpCenter";
import FAQ from "../pages/FAQ";
import LogedProtected from "./LogedProtected";
import DashboardHome from "../pages/DashboardHome";
import ManageContests from "../pages/admin/ManageContests";
import AllContests from "../pages/AllContests";
import Leaderboard from "../pages/Leaderboard";
import ComingSoon from "../pages/ComingSoon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/help",
        element: <HelpCenter />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/contests",
        element: <AllContests/>,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard/>,
      },
      {
        path: "/challenges",
        element: <ComingSoon/>,
      },
      {
        path: "/assessments",
        element: <ComingSoon/>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LogedProtected><Login/></LogedProtected>,
  },
  {
    path: "/signup",
    element: <LogedProtected><SignUp /></LogedProtected>,
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
  {
    path: "/forbidden",
    element: <Forbidden />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome/>
      },
      {
        path: "manageUsers",
        element: (
          <AdminProtected>
            <ManageUsers />
          </AdminProtected>
        ),
      },
      {
        path: "manageContests",
        element: (
          <AdminProtected>
            <ManageContests />
          </AdminProtected>
        ),
      },
    ],
  },
]);

export default router;
