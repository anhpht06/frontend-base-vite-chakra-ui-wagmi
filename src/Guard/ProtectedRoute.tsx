import NotFound from "@/app/page/NotFound";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  // const { role } = useRoles();
  const role = "kol";
  if (!role || !allowedRoles.includes(role)) {
    return <NotFound />;
  }

  return <>{children}</>;
}
