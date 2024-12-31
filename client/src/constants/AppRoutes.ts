export const AppRoutes = {
  home: "/",
  auth: {
    login: {
      patient: "/login/patient",
      doctor: "/login/doctor",
      registrar: "/login/registrar",
    },
    register: "/register",
  },
  patient: {
    home: "/patient/home",
  },
} as const;
