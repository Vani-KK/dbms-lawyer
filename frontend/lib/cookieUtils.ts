import Cookies from "js-cookie";

/**
 * Set a cookie (client-side)
 * @param name - The name of the cookie
 * @param value - The value of the cookie
 * @param options - Additional options such as expires, path, domain, secure
 */
export const setCookie = (
  name: string,
  value: string,
  options?: Cookies.CookieAttributes
): void => {
  Cookies.set(name, value, options);
};

/**
 * Get a cookie by name (client-side)
 * @param name - The name of the cookie to retrieve
 * @returns The value of the cookie, or undefined if not found
 */
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

/**
 * Remove a cookie (client-side)
 * @param name - The name of the cookie to remove
 * @param options - Additional options such as path or domain (should match the original cookie settings)
 */
export const removeCookie = (name: string, options?: Cookies.CookieAttributes): void => {
  Cookies.remove(name, options);
};