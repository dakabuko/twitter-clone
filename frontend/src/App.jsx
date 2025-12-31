import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";

import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel.jsx";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner.jsx";

function App() {
  const { data: authuser, isLoading } = useQuery({
    // we use useQuery to give a unique name to our query and refer to it later
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("auth user is here:", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  return (
    <>
      <div className="flex max-w-6xl mx-auto">
        {/* Common components, bc it's not wrapped with routes  */}
        {authuser && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={authuser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authuser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authuser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/notifications"
            element={authuser ? <NotificationPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:username"
            element={authuser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>
        {authuser && <RightPanel />}
        <Toaster />
      </div>
    </>
  );
}

export default App;
