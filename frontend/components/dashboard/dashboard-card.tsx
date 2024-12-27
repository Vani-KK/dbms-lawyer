import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export function DashboardCard({ title, description, icon: Icon, href }: DashboardCardProps) {
  return (
    <Link href={href}>
      <div className="group relative overflow-hidden rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}