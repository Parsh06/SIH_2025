import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import GuestRoute from "./components/GuestRoute";
import Preloader from "./components/Preloader";
import ProtectedRoute from "./components/ProtectedRoute";
import { usePreloader } from "./context/PreloaderContext";
import { DataProvider } from "./context/DataContext";
import Activity from "./pages/Activity";
import Advisory from "./pages/Advisory";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import Knowledge from "./pages/Knowledge";
import Login from "./pages/Login";
import NearbyMarketPlace from "./pages/NearbyMarketPlace";
import Prices from "./pages/Prices";
import Profile from "./pages/Profile";
import Reminders from "./pages/Reminders";
import Schemes from "./pages/Schemes";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import Landing from "./pages/landing";

function AppContent() {
  const { isLoading, hidePreloader } = usePreloader();

  if (isLoading) {
    return <Preloader onComplete={hidePreloader} />;
  }

  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<Landing />} />
      <Route path="/features" element={<Landing />} />

      {/* Guest Routes (Login/Signup) */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected Routes (Dashboard and other pages) */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <AppLayout>
              <Profile />
            </AppLayout>
          }
        />
        <Route
          path="/activity"
          element={
            <AppLayout>
              <Activity />
            </AppLayout>
          }
        />
        <Route
          path="/advisory"
          element={
            <AppLayout>
              <Advisory />
            </AppLayout>
          }
        />
        <Route
          path="/reminders"
          element={
            <AppLayout>
              <Reminders />
            </AppLayout>
          }
        />
        <Route
          path="/knowledge"
          element={
            <AppLayout>
              <Knowledge />
            </AppLayout>
          }
        />
        <Route
          path="/schemes"
          element={
            <AppLayout>
              <Schemes />
            </AppLayout>
          }
        />
        <Route
          path="/prices"
          element={
            <AppLayout>
              <Prices />
            </AppLayout>
          }
        />
        <Route
          path="/marketplace"
          element={
            <AppLayout>
              <NearbyMarketPlace />
            </AppLayout>
          }
        />
        <Route
          path="/chat"
          element={
            <AppLayout>
              <Chat />
            </AppLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <AppLayout>
              <Settings />
            </AppLayout>
          }
        />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
