import { ReactNode } from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "@/store";

const RouteGuard = ({ children }: { children: ReactNode }) => {
  const { token } = useSelector((state: RootState) => state.global);
  console.log(token);
  if (token) {
    return (
      <div className="flex h-screen w-full items-center justify-center overflow-auto bg-background">
        {children}
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RouteGuard;
