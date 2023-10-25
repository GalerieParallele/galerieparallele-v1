const BASE = {
    ADMIN: `/admin`,
    ADMIN_ARTICLES: `/admin/articles`,
    ADMIN_USERS: `/admin/utilisateurs`,
    ADMIN_MON_CLOUD: `/admin/my-cloud`,
    ADMIN_ARTISTES: `/admin/artistes`,

    API: `/api/`,
    API_USERS: `/api/users`,
    API_ARTICLES: `/api/articles`,
}

const ROUTES = {
    ACCUEIL: `/`,
    LOGIN: `/auth`,
    ADMIN: {
        HOME: `${BASE.ADMIN}`,
        ARTICLES: {
            HOME: `${BASE.ADMIN_ARTICLES}`,
            NEW: `${BASE.ADMIN_ARTICLES}/new`,
            EDIT: `${BASE.ADMIN_ARTICLES}/edit/`,
            PREVIEW: `${BASE.ADMIN_ARTICLES}/view/`,
            DELETE: `${BASE.ADMIN_ARTICLES}/delete/`,
        },
        USERS: {
            HOME: `${BASE.ADMIN_USERS}`,
            NEW: `${BASE.ADMIN_USERS}/new`,
        },
        MY_CLOUD: {
            HOME: `${BASE.ADMIN_MON_CLOUD}`
        },
        ARTISTES: {
            HOME: `${BASE.ADMIN_ARTISTES}`,
        }
    },
    API: {
        ARTISTES: {
            GET: `${BASE.API}artistes`,
        },
        USER: {
            GET: `${BASE.API_USERS}`,
            ME: `${BASE.API_USERS}/me`,
        },
        ARTICLES: {
            GET: `${BASE.API_ARTICLES}`,
            PUT: `${BASE.API_ARTICLES}`,
            GET_SPECIAL: `${BASE.API_ARTICLES}/getSpecial?id=`,
        },
        AUTHENTICATION: {
            LOGIN: `${BASE.API}login`,
            LOGOUT: `${BASE.API}logout`,
            REGISTER: `${BASE.API}users`,
        },
    }
}

export default ROUTES;