import React from "react";
import { Link, Navigate } from "react-router-dom";

import { useAuth } from "./AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { token, user, loading, error: authError, retryAuthCheck } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-[14px] text-[#737373]">
        {authError && (
          <div className="mb-2 text-center text-xs text-red-500">
            {authError}
          </div>
        )}
        Loading...
      </div>
    );
  }

  if (!token) {
    if (authError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="text-center">
            <div className="mb-2 text-xs text-red-500">{authError}</div>
            <div className="text-sm text-[#262626]">
              Session expired. Please log in again.
            </div>
          </div>
        </div>
      );
    }

    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="text-center">
          {authError ? (
            <div className="mb-2 text-xs text-red-500">{authError}</div>
          ) : null}
          <div className="text-sm text-[#262626]">
            Please log in to continue.
          </div>
          <div className="mt-3 flex justify-center gap-4 text-sm font-semibold">
            {authError ? (
              <button
                type="button"
                onClick={retryAuthCheck}
                className="text-[#0095F6]"
              >
                Retry
              </button>
            ) : null}
            <Link to="/login" className="text-[#0095F6]">
              Log in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
