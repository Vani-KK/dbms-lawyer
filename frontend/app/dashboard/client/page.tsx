"use client";

import { MessageSquare, FileText, Settings, Trash2Icon } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";
import { apiBaseUrl } from "@/lib/baseUrls";
import axios from "axios";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { removeCookie } from "@/lib/cookieUtils";

export default function ClientDashboard() {
  const router = useRouter();
  const [user, setUser] = useUser();
  const dashboardItems = [
    {
      title: "Contact Lawyer",
      description: "Communicate with your legal representative",
      icon: MessageSquare,
      href: "/dashboard/client/contact",
    },
    {
      title: "Involved Cases",
      description: "View and track your ongoing legal cases",
      icon: FileText,
      href: "/dashboard/client/cases",
    },
  ];

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        `${apiBaseUrl}/delete-account/${user.cid}`,
        {
          data: { userType: user.type }, // Pass userType in the request body
        }
      );
      removeCookie("user");
      router.push("/");
      console.log("Account deleted:", response.data.message);
    } catch (error) {
      console.error(
        "Error deleting account:",
        error.response?.data?.error || error.message
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Client Dashboard</h1>
        <p className="text-gray-500">Manage your legal matters efficiently</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardItems.map((item) => (
          <DashboardCard key={item.title} {...item} />
        ))}
        <ConfirmDeleteDialog
          trigger={
            <div className="group relative cursor-pointer overflow-hidden rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20">
                  <Trash2Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    Delete Account
                  </h3>
                  <p className="text-sm text-gray-500">
                    Delete your account and all associated data
                  </p>
                </div>
              </div>
            </div>
          }
          onConfirm={handleDeleteAccount}
        />
      </div>
    </div>
  );
}
