export const ApiRoutes = {
  health: "/health",
  auth: {
    loginPatient: "/auth/login/patient",
    loginDoctor: "/auth/login/doctor",
    loginRegistrar: "/auth/login/registrar",
    registerPatient: "/auth/register/patient",
    logout: "/auth/logout",
  },
  patient: {
    me: "/patient/me",
  },
  registrar: {
    me: "/registrar/me",
  },
  doctor: {
    me: "/doctor/me",
    available: "/doctor/available",
  },
} as const;
