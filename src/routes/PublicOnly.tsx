import { Navigate } from "react-router-dom";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function PublicOnly({ children }: Props) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}