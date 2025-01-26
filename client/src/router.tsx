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
import DoctorPatientDetails from "./pages/doctor/patient-details";
import PatientHome from "./pages/patient/home";
import PatientLayout from "./pages/patient/PatientLayout";
import PatientProfile from "./pages/patient/profile";
import RegistrarHome from "./pages/registrar/home";
import RegistrarPatientView from "./pages/registrar/patient-view";
import RegistrarLayout from "./pages/registrar/RegistrarLayout";
import Welcome from "./pages/Welcome";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.home} element={<App />} />
        <Route path={AppRoutes.welcome} element={<Welcome />} />
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
          <Route
            path={AppRoutes.patient.profile}
            element={<PatientProfile />}
          />
        </Route>
        <Route element={<DoctorLayout />}>
          <Route path={AppRoutes.doctor.home} element={<DoctorHome />} />
          <Route
            path={AppRoutes.doctor.patientDetails}
            element={<DoctorPatientDetails />}
          />
        </Route>
        <Route element={<RegistrarLayout />}>
          <Route path={AppRoutes.registrar.home} element={<RegistrarHome />} />
          <Route
            path={AppRoutes.registrar.patientView}
            element={<RegistrarPatientView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
