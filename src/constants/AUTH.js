const isProduction = process.env.ENV === "production";

const AUTH = {
    COOKIE_MAX_AGE: 3600, // 1 hour in seconds
    TOKEN_EXPIRATION_TIME: '1h', // JWT token expiration
    isProduction: isProduction,
    secureCookieFlag: isProduction ? "Secure; " : "",
    sameSiteSetting: isProduction ? "SameSite=Strict; " : "SameSite=Lax; "
}

export default AUTH;