import { Routes, Route, Navigate } from "react-router-dom";
import "./assets/tailwind.css";
import React, { Suspense } from "react";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";

// Lazy-loaded components
const ErrorPage = React.lazy(() => import("./components/ErrorPage"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const DashboardLayout = React.lazy(() => import("./Admin/Layouts/DashboardLayout"));
const Product = React.lazy(() => import("./Admin/Pages/Product"));
const DashboardHome = React.lazy(() => import("./Admin/Pages/DashboardHome"));
const AboutUs = React.lazy(() => import("./Admin/Pages/AboutUs"));
const OurTeam = React.lazy(() => import("./Admin/Pages/OurTeam"));
const TestimoniForm = React.lazy(() => import("./Admin/Pages/TestimoniForm"));
const UserManagement = React.lazy(() => import("./Admin/Users/UserManagement"));
const Notes = React.lazy(() => import("./pages/Notes"));
const BookingAdmin = React.lazy(() => import("./Admin/Pages/BookingAdmin"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* ✅ ADMIN & USER bisa akses homepage */}
        <Route element={<PrivateRoute requiredRole={["user", "admin"]} />}>
          <Route path="/homepage" element={<HomePage />} />
        </Route>

        {/* ✅ Hanya ADMIN yang bisa akses dashboard */}
        <Route element={<PrivateRoute requiredRole="admin" />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="products" element={<Product />} />
              <Route path="booking" element={<BookingAdmin />} /> 
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="ourteam" element={<OurTeam />} />
            <Route path="testimoniform" element={<TestimoniForm />} />
            <Route path="users" element={<UserManagement />} />
          </Route>
        </Route>

        {/* Error pages */}
        <Route
          path="/error/400"
          element={<ErrorPage code={400} description="The server cannot process the request due to a bad syntax." image="/img/400.jpg" />}
        />
        <Route
          path="/error/401"
          element={<ErrorPage code={401} description="You are not authorized to view this page." image="/img/401.jpg" />}
        />
        <Route
          path="/error/403"
          element={<ErrorPage code={403} description="You don't have permission to access this page." image="/img/403.jpg" />}
        />
        <Route
          path="*"
          element={<ErrorPage code={404} description="Page Not Found" image="/img/404.jpg" />}
        />
      </Routes>
    </Suspense>
  );
}