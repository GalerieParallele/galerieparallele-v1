const ROUTES = {
    ACCUEIL: "/",
    LOGIN: "/login",
    ADMIN: "/admin",
    API: {
        ARTISTES: {
            GET: "/api/artistes",
        },
        USER: {
            ME: "/api/users/me",
        },
        AUTHENTICATION: {
            LOGIN: "/api/login",
            LOGOUT: "/api/logout",
            REGISTER: "/api/users",
        },
    }
}

export default ROUTES;