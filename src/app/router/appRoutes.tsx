import { ROUTES } from "@/shared/constants/router";
import AppLayout from "../layout/AppLayout";
import NotFound from "../page/NotFound";
import { Home } from "../page/app/Home";
import { AuthProvider } from "@/providers/AuthProvider";

export const appRoutes = {
  path: ROUTES.APP.HOME,
  element: (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  ),
  errorElement: <NotFound />,
  children: [
    {
      index: true,
      element: <Home />,
    },
  ],
};
