import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const RequireAuth: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const loc = useLocation();

  if (loading) return null; // TODO: replace with a skeleton/spinner if desired
  if (!user)
    return (
      <Navigate
        to={`/login?from=${encodeURIComponent(loc.pathname)}`}
        replace
      />
    );

  return <>{children}</>;
};
