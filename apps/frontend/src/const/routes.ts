export const ApplicationRoutes = Object.freeze({
  auth: {
    login: "/auth/login",
    registration: "/auth/registration",
  },
  landing: {
    home: "/",
    about: "/about",
    contact: "/contact",
    terms: "/terms",
    protected: "/protected",
    admin: "/admin",
    customer: "/customer",
  },
  application: {
    dashboard: "/dashboard",
  },
  notFound: "/404",
});

export const ApiRoutes = Object.freeze({
  auth: {
    logout: "/api/auth/logout",
  },
});
