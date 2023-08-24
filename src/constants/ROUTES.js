const ROUTES = {
    ACCUEIL: "/",
    LOGIN: "/connexion",
    ADMIN: "/admin",
    ADMIN_ARTICLES_HOME: "/admin/articles/home",
    ADMIN_USERS_HOME: "/admin/utilisateurs/home",
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