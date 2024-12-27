import { getCookie } from "@/lib/cookieUtils";

export const checkUserLoggedIn = () => {
  let user = getCookie("user");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};
