import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import AllBooks from "../pages/AllBooks";
import ErrorPage from "../pages/ErrorPage";
import BookDetails from "../pages/BookDetails";
import Dashboard from "../layout/Dashboard";
import MyReserve from "../pages/MyReserve";
import Forbidden from "../pages/Forbidden";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../pages/UserProfile";
import ManageBooks from "../pages/admin/ManageBooks";
import ManageUsers from "../pages/admin/ManageUsers";
import IssueBooks from "../pages/admin/IssueBooks";
import MyIssuedBooks from "../pages/MyIssuedBooks";
import AdminProtected from "./AdminProtected";
import ReturnBooks from "../pages/admin/ReturnBooks";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import HelpCenter from "../pages/HelpCenter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
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
        path: "/allBooks",
        element: <AllBooks />,
      },
      {
        path: "/help",
        element: <HelpCenter />,
      },
      {
        path: "/faq",
        element: <ContactUs />,
      },
      {
        path: "/books/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
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
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
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
        path: "myReserve",
        element: <MyReserve />,
      },
      {
        path: "myIssuedBooks",
        element: <MyIssuedBooks />,
      },
      {
        path: "manageBooks",
        element: (
          <AdminProtected>
            <ManageBooks />
          </AdminProtected>
        ),
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
        path: "issueBooks",
        element: (
          <AdminProtected>
            <IssueBooks />
          </AdminProtected>
        ),
      },
      {
        path: "returnBook",
        element: (
          <AdminProtected>
            <ReturnBooks />
          </AdminProtected>
        ),
      },
    ],
  },
]);

export default router;
