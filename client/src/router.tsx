import { BrowserRouter, Route, Routes } from "react-router";
import { AppRoutes } from "./constants/AppRoutes";
import App from "./pages/App";
import AuthLayout from "./pages/auth/AuthLayout";
import DoctorLogin from "./pages/auth/DoctorLogin";
import PatientLogin from "./pages/auth/PatientLogin";
import Register from "./pages/auth/Register";
import RegistrarLogin from "./pages/auth/RegistrarLogin";
import PatientHome from "./pages/patient/home";
import PatientLayout from "./pages/patient/PatientLayout";

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
        <Route element={<PatientLayout />}>
          <Route path={AppRoutes.patient.home} element={<PatientHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
