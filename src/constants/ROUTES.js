const ROUTES = {
    ACCUEIL: "/",
    LOGIN: "/connexion",
    ADMIN: {
        INDEX: "/admin",
        ARTICLES: {
            INDEX: "/admin/articles",
            NEW: "/admin/articles/new",
        },
        USERS: {
            INDEX: "/admin/utilisateurs",
            NEW: "/admin/utilisateurs/new",
        }
    },
    API: {
        ARTISTES: {
            GET: "/api/artistes",
        },
        USER: {
            ME: "/api/users/me",
            GET: "/api/users",
        },
        AUTHENTICATION: {
            LOGIN: "/api/login",
            LOGOUT: "/api/logout",
            REGISTER: "/api/users",
        },
    }
}

export default ROUTES;