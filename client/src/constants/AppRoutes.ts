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
  },
  doctor: {
    home: "/doctor/home",
  },
  registrar: {
    home: "/registrar/home",
  },
} as const;
