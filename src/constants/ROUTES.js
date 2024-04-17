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
        HOME: createPath('artistes'),
        PROFIL(artisteId) {
            return createPath('artistes', artisteId, 'profil');
        },
        TEST: createPath('artistes', 'profil', 'artisteTest'),
    },
    OEUVRES: {
        HOME: createPath('oeuvres'),
        VIEW(oeuvreId) {
            return createPath('oeuvres', oeuvreId);
        }
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
            EDIT: {
                HOME(artisteId) {
                    return createPath('dashboard', 'artistes', 'edit', artisteId);
                },
                CONTRATS(artisteId) {
                    return createPath('dashboard', 'artistes', 'edit', artisteId, 'contrats')
                },
                ILLUSTRATIONS(artisteId) {
                    return createPath('dashboard', 'artistes', 'edit', artisteId, 'illustrations')
                },
                INFORMATIONS(artisteId) {
                    return createPath('dashboard', 'artistes', 'edit', artisteId, 'informations')
                },
                LEGAL(artisteId) {
                    return createPath('dashboard', 'artistes', 'edit', artisteId, 'legal')
                },
                OEUVRES: {
                    HOME(artisteId) {
                        return createPath('dashboard', 'artistes', 'edit', artisteId, 'oeuvres')
                    },
                    EDIT(artisteId, oeuvreId) {
                        return createPath('dashboard', 'artistes', 'edit', artisteId, 'oeuvres', 'edit', oeuvreId)
                    },
                    NEW(artisteId) {
                        return createPath('dashboard', 'artistes', 'edit', artisteId, 'oeuvres', 'new')
                    },
                    INFO_GEN(artisteId, oeuvreId) {
                        return createPath('dashboard', 'artistes', 'edit', artisteId, 'oeuvres', 'edit', oeuvreId, 'informations-generales')
                    },
                    INFO_TECH(artisteId, oeuvreId) {
                        return createPath('dashboard', 'artistes', 'edit', artisteId, 'oeuvres', 'edit', oeuvreId, 'informations-techniques')
                    },
                    COLORS(artisteId, oeuvreId) {
                        return createPath('dashboard', 'artistes', 'edit', artisteId, 'oeuvres', 'edit', oeuvreId, 'colors')
                    },
                    DIMENSIONS(artisteId, oeuvreId) {
                        return createPath('dashboard', 'artistes', 'edit', artisteId, 'oeuvres', 'edit', oeuvreId, 'dimensions')
                    },
                    ARTISTES(artisteId, oeuvreId) {
                        return createPath('dashboard', 'artistes', 'edit', artisteId, 'oeuvres', 'edit', oeuvreId, 'artistes')
                    }
                },
                SAVETHEDATE(artisteId) {
                    return createPath('dashboard', 'artistes', 'edit', artisteId, 'save-the-date')
                },
                PORTRAIT_CHINOIS(artisteId) {
                    return createPath('dashboard', 'artistes', 'edit', artisteId, 'portrait-chinois')
                }
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
            GETBYID: createPath('artistes', 'getbyid'),
            LEGAL_INFORMATION: createPath('legalsinformation'),
        },
        OEUVRES: {
            HOME: 'oeuvres',
            GETBYID: createPath('oeuvres', 'getbyid')
        },
        USERS: {
            HOME: 'users',
        },
        COULEURS: {
            HOME: 'couleurs',
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
        HOME: BASE_URL + PATHS.ARTISTES.HOME,
        PROFIL(artisteId) {
            return BASE_URL + PATHS.ARTISTES.PROFIL(artisteId);
        },
        TEST: BASE_URL + PATHS.ARTISTES.TEST,
    },
    OEUVRES: {
        HOME: BASE_URL + PATHS.OEUVRES.HOME,
        VIEW(oeuvreId) {
            return BASE_URL + PATHS.OEUVRES.VIEW(oeuvreId);
        }
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
            EDIT: {
                HOME(artisteId) {
                    return BASE_URL + PATHS.ADMIN.ARTISTES.EDIT.HOME(artisteId)
                },
                CONTRATS(artisteId) {
                    return BASE_URL + PATHS.ADMIN.ARTISTES.EDIT.CONTRATS(artisteId)
                },
                ILLUSTRATIONS(artisteId) {
                    return BASE_URL + PATHS.ADMIN.ARTISTES.EDIT.ILLUSTRATIONS(artisteId)
                },
                INFORMATIONS(artisteId) {
                    return BASE_URL + PATHS.ADMIN.ARTISTES.EDIT.INFORMATIONS(artisteId)
                },
                LEGAL(artisteId) {
                    return BASE_URL + PATHS.ADMIN.ARTISTES.EDIT.LEGAL(artisteId)
                },
                OEUVRES: {
                    HOME(artisteId) {
                        return BASE_URL + PATHS.ADMIN.ARTISTES.EDIT.OEUVRES.HOME(artisteId)
                    },
                    EDIT(artisteId, oeuvreId) {
                        return BASE_URL + PATHS.ADMIN.ARTISTES.EDIT.OEUVRES.EDIT(artisteId, oeuvreId)
                    },
                    NEW(artisteId) {
                        return BASE_URL + PATHS.ADMIN.ARTISTES.EDIT.OEUVRES.NEW(artisteId)
                    },
                    INFO_GEN(artisteId, oeuvreId) {
                        return BASE_URL + PATHS.ADMIN.ARTISTES.EDIT.OEUVRES.INFO_GEN(artisteId, oeuvreId)
                    },
                    INFO_TECH(artisteId, oeuvreId) {
                        return BASE_URL + PATHS.ADMIN.ARTISTES.EDIT.OEUVRES.INFO_TECH(artisteId, oeuvreId)
                    },
                    COLORS(artisteId, oeuvreId) {
                        return BASE_URL + PATHS.ADMIN.ARTISTES.EDIT.OEUVRES.COLORS(artisteId, oeuvreId)
                    },
                    DIMENSIONS(artisteId, oeuvreId) {
                        return BASE_URL + PATHS.ADMIN.ARTISTES.EDIT.OEUVRES.DIMENSIONS(artisteId, oeuvreId)
                    },
                    ARTISTES(artisteId, oeuvreId) {
                        return BASE_URL + PATHS.ADMIN.ARTISTES.EDIT.OEUVRES.ARTISTES(artisteId, oeuvreId)
                    }
                },
                SAVETHEDATE(artisteId) {
                    return BASE_URL + PATHS.ADMIN.ARTISTES.EDIT.SAVETHEDATE(artisteId)
                },
                PORTRAIT_CHINOIS(artisteId) {
                    return BASE_URL + PATHS.ADMIN.ARTISTES.EDIT.PORTRAIT_CHINOIS(artisteId)
                }
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
        OEUVRES: {
            HOME: API_BASE + PATHS.API.OEUVRES.HOME,
            GETBYID: API_BASE + PATHS.API.OEUVRES.GETBYID,
        },
        ARTISTES: {
            HOME: API_BASE + PATHS.API.ARTISTES.HOME,
            GETBYID: API_BASE + PATHS.API.ARTISTES.GETBYID,
            LEGAL_INFORMATION: API_BASE + PATHS.API.ARTISTES.LEGAL_INFORMATION,
        },
        USERS: {
            HOME: API_BASE + PATHS.API.USERS.HOME,
        },
        COULEURS: {
            HOME: API_BASE + PATHS.API.COULEURS.HOME,
        }
    }
}

export default ROUTES;