import { ComponentType } from "react";
import { useAuthContext } from "../AuthProvider";
import { Navigate } from "react-router-dom";

export const AuthenticationGuard = ({
  Component,
}: {
  Component: ComponentType;
}) => {
  const user = useAuthContext();
  if (!user.token) {
    return <Navigate to="/login" />;
  }
  return <Component />;
};
