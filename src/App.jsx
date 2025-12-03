import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminLayout from "./components/Layout/AdminLayout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PostsList from "./pages/posts/PostsList.jsx";
import PostForm from "./pages/posts/PostForm.jsx";
import PagesList from "./pages/pages/PagesList.jsx";
import PageForm from "./pages/pages/PageForm.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/posts"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <PostsList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts/new"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <PostForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts/:id"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <PostForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/pages"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <PagesList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pages/new"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <PageForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pages/:id"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <PageForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default App;
