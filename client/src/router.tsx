import { BrowserRouter, Route, Routes } from "react-router";
import App from "./pages/App";
import AuthLayout from "./pages/auth/AuthLayout";
import Register from "./pages/auth/Register";
import { AppRoutes } from "./constants/AppRoutes";
import PatientLogin from "./pages/auth/PatientLogin";
import DoctorLogin from "./pages/auth/DoctorLogin";
import RegistrarLogin from "./pages/auth/RegistrarLogin";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.home} element={<App />} />
        <Route element={<AuthLayout />}>
          <Route path={AppRoutes.auth.register} element={<Register />} />
          <Route
            path={AppRoutes.auth.login.patient}
            element={<PatientLogin />}
          />
          <Route path={AppRoutes.auth.login.doctor} element={<DoctorLogin />} />
          <Route
            path={AppRoutes.auth.login.registrar}
            element={<RegistrarLogin />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
