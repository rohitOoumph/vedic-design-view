import { useLeads } from "@/cms/hooks/useLeads";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const LeadsPage = () => {
  const { data: leads, isLoading } = useLeads();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500';
      case 'contacted':
        return 'bg-yellow-500';
      case 'qualified':
        return 'bg-purple-500';
      case 'converted':
        return 'bg-green-500';
      case 'archived':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leads</h1>
        <p className="text-muted-foreground">Manage consultation requests</p>
      </div>

      <div className="grid gap-4">
        {leads?.map((lead) => (
          <Card key={lead.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-xl">{lead.name}</CardTitle>
                <div className="flex gap-2 text-sm text-muted-foreground">
                  {lead.email && <span>{lead.email}</span>}
                  {lead.phone && <span>• {lead.phone}</span>}
                </div>
              </div>
              <Badge className={getStatusColor(lead.status)}>
                {lead.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {lead.project_type && (
                <div>
                  <span className="text-sm font-medium">Project Type: </span>
                  <span className="text-sm text-muted-foreground">{lead.project_type}</span>
                </div>
              )}
              {lead.message && (
                <div>
                  <span className="text-sm font-medium">Message: </span>
                  <p className="text-sm text-muted-foreground mt-1">{lead.message}</p>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t text-xs text-muted-foreground">
                <span>Source: {lead.source}</span>
                <span>{format(new Date(lead.created_at), 'PPp')}</span>
              </div>
            </CardContent>
          </Card>
        ))}

        {leads?.length === 0 && (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">No leads yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
