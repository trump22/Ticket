import Cookies from "js-cookie";

export const clearAllCookies = () => {
    Object.keys(Cookies.get()).forEach((cookieName) => {
        Cookies.remove(cookieName, { path: '/' });
    });
};
