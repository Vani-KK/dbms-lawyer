"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkUserLoggedIn } from "@/services/auth";
import { usePathname } from "next/navigation";
export const UserContext = createContext(null);
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  let unauthenticatedPaths = [
    "/",
    "/login/lawyer",
    "/signup/lawyer",
    "/login/client",
    "/signup/client",
  ];
  useEffect(() => {
    let user = checkUserLoggedIn();

    if (!user) {
      if (!unauthenticatedPaths.includes(pathname)) {
        router.push("/");
      }
    } else {
      setUser(user);
      if (unauthenticatedPaths.includes(pathname)) {
        if (user.type === "lawyer") {
          router.push("/dashboard/lawyer");
        } else {
          router.push("/dashboard/client");
        }
      }
    }
  }, [pathname]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
