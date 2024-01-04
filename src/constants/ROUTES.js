const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://galerieparallele.com/';
const API_BASE = `${BASE_URL}api/`;

/**
 * Permet de créer un chemin à partir de segments
 * @param segments {string[]}
 * @returns {string} Le chemin créé à partir des segments
 */
const createPath = (...segments) => segments.join('/');

/**
 * Permet de créer une URL à partir de segments
 */
const PATHS = {
    HOME: '',
    AUTH: 'auth',
    ARTISTES: {
        TEST: createPath('artistes', 'profil', 'artisteTest'),
    },
    ADMIN: {
        HOME: createPath('dashboard'),
        ARTICLES: {
            HOME: createPath('admin', 'articles'),
            EDIT: createPath('admin', 'articles', 'edit'),
            NEW: createPath('admin', 'articles', 'new'),
            PREVIEW: createPath('admin', 'articles', 'preview'),
        },
        ARTISTES: {
            HOME: createPath('dashboard', 'artistes'),
            NEW: createPath('dashboard', 'artistes', 'new'),
            EDIT(artisteId) {
                return createPath('dashboard', 'artistes', 'edit', artisteId);
            },
            LEGAL_INFORMATION: createPath('admin', 'artistes', 'legal-information'),
            OEUVRES: {
                HOME: createPath('admin', 'artistes', 'oeuvres'),
                NEW: createPath('admin', 'artistes', 'oeuvres', 'new'),
            },
            SAVE_THE_DATE: {
                HOME: createPath('admin', 'artistes', 'save-the-date'),
                NEW: createPath('admin', 'artistes', 'save-the-date', 'new'),
                EDIT: createPath('admin', 'artistes', 'save-the-date', 'edit'),
            },
            ILLUSTRATIONS: {
                HOME: createPath('admin', 'artistes', 'illustrations'),
            }
        },
        CLOUD: {
            HOME: createPath('admin', 'cloud'),
        },
        UTILISATEURS: {
            HOME: createPath('admin', 'utilisateurs'),
        },
    },
    API: {
        AUTH: {
            LOGIN: createPath('auth', 'login'),
            LOGOUT: createPath('auth', 'logout'),
            ME: createPath('auth', 'me'),
            REGISTER: createPath('users'),
        },
        ARTISTES: {
            HOME: createPath('artistes'),
            LEGAL_INFORMATION: createPath('legalsinformation'),
        },
        USERS: {
            HOME: 'users',
        }
    }
}

/**
 * Permet de créer une route à partir d'un chemin
 */
const ROUTES = {
    HOME: BASE_URL + PATHS.HOME,
    AUTH: BASE_URL + PATHS.AUTH,
    ARTISTES: {
        TEST: BASE_URL + PATHS.ARTISTES.TEST,
    },
    ADMIN: {
        HOME: BASE_URL + PATHS.ADMIN.HOME,
        ARTICLES: {
            HOME: BASE_URL + PATHS.ADMIN.ARTICLES.HOME,
            EDIT: BASE_URL + PATHS.ADMIN.ARTICLES.EDIT,
            NEW: BASE_URL + PATHS.ADMIN.ARTICLES.NEW,
            PREVIEW: BASE_URL + PATHS.ADMIN.ARTICLES.PREVIEW,
        },
        ARTISTES: {
            HOME: BASE_URL + PATHS.ADMIN.ARTISTES.HOME,
            NEW: BASE_URL + PATHS.ADMIN.ARTISTES.NEW,
            EDIT(artisteId) {
                return BASE_URL + PATHS.ADMIN.ARTISTES.EDIT(artisteId);
            },
            LEGAL_INFORMATION: BASE_URL + PATHS.ADMIN.ARTISTES.LEGAL_INFORMATION,
            OEUVRES: {
                HOME: BASE_URL + PATHS.ADMIN.ARTISTES.OEUVRES.HOME,
                NEW: BASE_URL + PATHS.ADMIN.ARTISTES.OEUVRES.NEW,
            },
            SAVE_THE_DATE: {
                HOME: BASE_URL + PATHS.ADMIN.ARTISTES.SAVE_THE_DATE.HOME,
                NEW: BASE_URL + PATHS.ADMIN.ARTISTES.SAVE_THE_DATE.NEW,
                EDIT: BASE_URL + PATHS.ADMIN.ARTISTES.SAVE_THE_DATE.EDIT,
            },
            ILLUSTRATIONS: {
                HOME: BASE_URL + PATHS.ADMIN.ARTISTES.ILLUSTRATIONS.HOME,
            }
        },
        CLOUD: {
            HOME: BASE_URL + PATHS.ADMIN.CLOUD.HOME,
        },
        UTILISATEURS: {
            HOME: BASE_URL + PATHS.ADMIN.UTILISATEURS.HOME,
        },
    },
    API: {
        AUTH: {
            LOGIN: API_BASE + PATHS.API.AUTH.LOGIN,
            LOGOUT: API_BASE + PATHS.API.AUTH.LOGOUT,
            ME: API_BASE + PATHS.API.AUTH.ME,
            REGISTER: API_BASE + PATHS.API.AUTH.REGISTER,
        },
        ARTISTES: {
            HOME: API_BASE + PATHS.API.ARTISTES.HOME,
            LEGAL_INFORMATION: API_BASE + PATHS.API.ARTISTES.LEGAL_INFORMATION,
        },
        USERS: {
            HOME: API_BASE + PATHS.API.USERS.HOME,
        }
    }
}

export default ROUTES;