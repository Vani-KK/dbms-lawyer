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
        <Link href="/dashboard/client" className="flex items-center gap-2">
          <Scale className="h-6 w-6" />
          <span className="text-lg font-semibold">Legal Services Portal</span>
        </Link>
        <nav className="ml-8 hidden md:flex gap-6">
          <Link
            href="/dashboard/client/cases"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            My Cases
          </Link>
          <Link
            href="/dashboard/client/contact"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Contact
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
