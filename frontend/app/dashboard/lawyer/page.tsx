"use client";
import { Users, UserPlus, Settings, Building, Trash2Icon } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { AddClientDialog } from "@/components/clients/add-client";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";
import useUser from "@/hooks/useUser";
import { apiBaseUrl } from "@/lib/baseUrls";
import axios from "axios";
import { useRouter } from "next/navigation";
import { removeCookie } from "@/lib/cookieUtils";
export default function LawyerDashboard() {
  const router = useRouter();
  const [user, setUser] = useUser();
  const dashboardItems = [
    {
      title: "View Clients",
      description: "Access and manage your existing client list",
      icon: Users,
      href: "/dashboard/lawyer/clients",
    },
    {
      title: "View Courts",
      description: "Access the court list",
      icon: Building,
      href: "/dashboard/lawyer/courts",
    },

    {
      title: "Cases",
      description: "View and manage your cases",
      icon: Settings,
      href: "/dashboard/lawyer/cases",
    },
  ];

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        `${apiBaseUrl}/delete-account/${user.lid}`,
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
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Manage your law practice efficiently</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardItems.map((item) => (
          <DashboardCard key={item.title} {...item} />
        ))}
        <AddClientDialog
          trigger={
            <div className="group relative cursor-pointer overflow-hidden rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20">
                  <UserPlus className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    Add Clients
                  </h3>
                  <p className="text-sm text-gray-500">
                    Add new clients to your practice
                  </p>
                </div>
              </div>
            </div>
          }
        />
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
