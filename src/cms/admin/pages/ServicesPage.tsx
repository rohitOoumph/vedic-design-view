import { useState } from "react";
import { useServices } from "@/cms/hooks/useContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ServicesPage = () => {
  const { data: services, isLoading } = useServices();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid gap-4">
        {services?.map((service) => (
          <Card key={service.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-4">
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant={service.status === 'published' ? 'default' : 'secondary'}>
                    {service.status}
                  </Badge>
                  {service.is_featured && (
                    <Badge variant="outline">Featured</Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  {service.status === 'published' ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{service.short_desc}</p>
              <div className="mt-4 text-xs text-muted-foreground">
                Order: {service.order_index} | Icon: {service.icon_name || 'None'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
