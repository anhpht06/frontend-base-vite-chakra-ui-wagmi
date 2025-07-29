import { createBrowserRouter } from "react-router-dom";
import { appRoutes } from "./router/appRoutes";
import { adminRoutes } from "./router/adminRouter";
import { brandRoutes } from "./router/brandRouter";
import { kolRoutes } from "./router/kolRouter";

export const router = createBrowserRouter([
  appRoutes,
  adminRoutes,
  brandRoutes,
  kolRoutes,
]);
