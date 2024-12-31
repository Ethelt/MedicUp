import { BrowserRouter, Route, Routes } from "react-router";
import App from "./pages/App";
import Login from "./pages/auth/Login";
import AuthLayout from "./pages/auth/AuthLayout";
import { AppRoutes } from "./constants/AppRoutes";
import Register from "./pages/auth/Register";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.home} element={<App />} />
        <Route element={<AuthLayout />}>
          <Route path={AppRoutes.auth.login} element={<Login />} />
          <Route path={AppRoutes.auth.register} element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
