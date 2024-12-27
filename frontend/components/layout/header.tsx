"use client";

import { LogOut, Scale, User } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { removeCookie } from "@/lib/cookieUtils";
import { useRouter } from "next/navigation";
export function Header() {
  const router = useRouter();
  const logout = () => {
    removeCookie("user");
    router.push("/");
  };
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link href="/dashboard/lawyer" className="flex items-center gap-2">
          <Scale className="h-6 w-6" />
          <span className="text-lg font-semibold">Law Firm Manager</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuItem asChild>
                <p>Delete Profile</p>
              </DropdownMenuItem> */}
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
