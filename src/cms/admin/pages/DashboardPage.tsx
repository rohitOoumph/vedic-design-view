import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useServices, useProjects, useTestimonials } from "@/cms/hooks/useContent";
import { useLeads } from "@/cms/hooks/useLeads";
import { Briefcase, FolderKanban, MessageSquare, Users } from "lucide-react";

export const DashboardPage = () => {
  const { data: services } = useServices();
  const { data: projects } = useProjects();
  const { data: testimonials } = useTestimonials();
  const { data: leads } = useLeads();

  const stats = [
    {
      title: "Total Services",
      value: services?.length || 0,
      icon: Briefcase,
      color: "text-blue-500",
    },
    {
      title: "Total Projects",
      value: projects?.length || 0,
      icon: FolderKanban,
      color: "text-green-500",
    },
    {
      title: "Testimonials",
      value: testimonials?.length || 0,
      icon: MessageSquare,
      color: "text-purple-500",
    },
    {
      title: "New Leads",
      value: leads?.filter(l => l.status === 'new').length || 0,
      icon: Users,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin panel</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Track recent changes and updates across your content.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Manage your content efficiently from here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
