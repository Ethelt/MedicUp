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
    root: "/patient",
    me: "/patient/me",
    visits: "/patient/visits",
  },
  registrar: {
    me: "/registrar/me",
  },
  doctor: {
    me: "/doctor/me",
    available: "/doctor/available",
    visits: "/doctor/visits",
  },
  visit: {
    root: "/visit",
  },
} as const;
