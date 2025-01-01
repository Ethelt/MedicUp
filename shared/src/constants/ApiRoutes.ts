export const ApiRoutes = {
  health: "/health",
  auth: {
    loginPatient: "/auth/login/patient",
    loginDoctor: "/auth/login/doctor",
    loginRegistrar: "/auth/login/registrar",
    registerPatient: "/auth/register/patient",
    logout: "/auth/logout",
  },
  patients: {
    me: "/patients/me",
  },
} as const;
