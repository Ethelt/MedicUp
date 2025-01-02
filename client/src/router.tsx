import { BrowserRouter, Route, Routes } from "react-router";
import { AppRoutes } from "./constants/AppRoutes";
import App from "./pages/App";
import AuthLayout from "./pages/auth/AuthLayout";
import DoctorLogin from "./pages/auth/DoctorLogin";
import PatientLogin from "./pages/auth/PatientLogin";
import Register from "./pages/auth/Register";
import RegistrarLogin from "./pages/auth/RegistrarLogin";
import DoctorLayout from "./pages/doctor/DoctorLayout";
import DoctorHome from "./pages/doctor/home";
import PatientHome from "./pages/patient/home";
import PatientLayout from "./pages/patient/PatientLayout";
import RegistrarHome from "./pages/registrar/home";
import RegistrarLayout from "./pages/registrar/RegistrarLayout";

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
        <Route element={<DoctorLayout />}>
          <Route path={AppRoutes.doctor.home} element={<DoctorHome />} />
        </Route>
        <Route element={<RegistrarLayout />}>
          <Route path={AppRoutes.registrar.home} element={<RegistrarHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
