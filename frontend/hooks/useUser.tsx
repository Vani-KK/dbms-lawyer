"use client";

import { useContext } from "react";
import { UserContext } from "@/components/common/UserProvider";

export default function useUser() {
  let userContext = useContext(UserContext);
  return [userContext.user, userContext.setUser];
}
