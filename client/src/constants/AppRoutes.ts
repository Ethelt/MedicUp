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
} as const;
