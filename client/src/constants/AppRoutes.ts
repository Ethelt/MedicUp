export const AppRoutes = {
  home: "/",
  auth: {
    login: {
      patient: "/login/patient",
      doctor: "/login/doctor",
      registrar: "/login/registrar",
    },
    register: "/patient/register",
  },
  patient: {
    home: "/patient/home",
    profile: "/patient/profile",
  },
  doctor: {
    home: "/doctor/home",
    patientDetails: "/doctor/patient/:patientId",
  },
  registrar: {
    home: "/registrar/home",
  },
} as const;
