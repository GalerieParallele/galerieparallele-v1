const ROUTES = {
    ACCUEIL: "/",
    LOGIN: "/connexion",
    ADMIN: {
        HOME: "/admin",
        ARTICLES: {
            HOME: "/admin/articles",
            NEW: "/admin/articles/new",
            EDIT: "/admin/articles/edit/",
            PREVIEW: "/admin/articles/view/",
            DELETE: "/admin/articles/delete/",
        },
        USERS: {
            HOME: "/admin/utilisateurs",
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
        ARTICLES: {
            GET: "/api/articles",
        },
        AUTHENTICATION: {
            LOGIN: "/api/login",
            LOGOUT: "/api/logout",
            REGISTER: "/api/users",
        },
    }
}

export default ROUTES;