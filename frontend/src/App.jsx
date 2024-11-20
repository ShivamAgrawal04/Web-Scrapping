import { Navigate, Route, Routes } from "react-router-dom";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Side from "./components/Side";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <>
      <div className="bg-[url(bg.svg)]">
        <Header />
        <div className="flex flex-1">
          <Side />
          <div className="flex-1 relative flex flex-col">
            <Toaster
              position="top-center"
              toastOptions={{
                className: "custom-toast",
              }}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
                    <RedirectAuthenticatedUser>
                      <SignUpPage />
                    </RedirectAuthenticatedUser>
                  </div>
                }
              />
              <Route
                path="/login"
                element={
                  <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
                    <RedirectAuthenticatedUser>
                      <LoginPage />
                    </RedirectAuthenticatedUser>
                  </div>
                }
              />
              <Route path="/verify-email" element={<EmailVerificationPage />} />
              <Route
                path="/forgot-password"
                element={
                  <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
                    <RedirectAuthenticatedUser>
                      <ForgotPasswordPage />
                    </RedirectAuthenticatedUser>
                  </div>
                }
              />
              <Route
                path="/reset-password/:token"
                element={
                  <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
                    <RedirectAuthenticatedUser>
                      <ResetPasswordPage />
                    </RedirectAuthenticatedUser>
                  </div>
                }
              />
              {/* catch all routes */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
