import React from "react";
import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import AppLayout from "./components/AppLayout.jsx";

import Feed from "./pages/Feed.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Reset from "./pages/Reset.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

import NotFound from "./pages/NotFound.jsx";
import Profile from "./pages/Profile.jsx";
import ProfileEdit from "./pages/ProfileEdit.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import PostCreate from "./pages/PostCreate.jsx";
import Followers from "./pages/Followers.jsx";
import Following from "./pages/Following.jsx";
import Explore from "./pages/Explore.jsx";
import Notifications from "./pages/Notifications.jsx";
import Search from "./pages/Search.jsx";

function ProtectedPage({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Shared layout. Feed and Explore are public portfolio views. */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Feed />} />
        <Route path="/explore" element={<Explore />} />
        <Route
          path="/create"
          element={
            <ProtectedPage>
              <PostCreate />
            </ProtectedPage>
          }
        />
        <Route
          path="/posts/new"
          element={
            <ProtectedPage>
              <PostCreate />
            </ProtectedPage>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedPage>
              <PostDetail />
            </ProtectedPage>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedPage>
              <Profile />
            </ProtectedPage>
          }
        />
        <Route
          path="/profile/:id/edit"
          element={
            <ProtectedPage>
              <ProfileEdit />
            </ProtectedPage>
          }
        />
        <Route
          path="/profile/:id/followers"
          element={
            <ProtectedPage>
              <Followers />
            </ProtectedPage>
          }
        />
        <Route
          path="/profile/:id/following"
          element={
            <ProtectedPage>
              <Following />
            </ProtectedPage>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedPage>
              <Search />
            </ProtectedPage>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedPage>
              <Notifications />
            </ProtectedPage>
          }
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
