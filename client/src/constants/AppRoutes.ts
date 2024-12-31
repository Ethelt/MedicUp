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
} as const;
