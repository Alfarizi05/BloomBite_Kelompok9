import { Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";
import React, { Suspense } from "react";

// Lazy loading of components
const ErrorPage = React.lazy(() => import("./components/ErrorPage"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Loading = React.lazy(() => import("./components/Loading"));
const HomePage = React.lazy(() => import("./pages/HomePage"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Auth layout for authentication pages */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* Guest Page Route */}
        <Route path="/" element={<HomePage />} />

        {/* Error Routes */}
        <Route
          path="/error/400"
          element={
            <ErrorPage
              code={400}
              description="The server cannot process the request due to a bad syntax."
              image="/img/400.jpg"
            />
          }
        />
        <Route
          path="/error/401"
          element={
            <ErrorPage
              code={401}
              description="You are not authorized to view this page."
              image="/img/401.jpg"
            />
          }
        />
        <Route
          path="/error/403"
          element={
            <ErrorPage
              code={403}
              description="You don't have permission to access this page."
              image="/img/403.jpg"
            />
          }
        />
        <Route
          path="*"
          element={
            <ErrorPage
              code={404}
              description="Page Not Found"
              image="/img/404.jpg"
            />
          }
        />
      </Routes>
    </Suspense>
  );
}
