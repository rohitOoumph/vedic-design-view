import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Save, X, GripVertical } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Database } from "@/integrations/supabase/types";

type NavLink = Database["public"]["Tables"]["nav_links"]["Row"];

export const NavLinksPage = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<NavLink | null>(null);
  const [formData, setFormData] = useState({ label: "", href: "", order_index: 0, is_visible: true });

  const { data: navLinks, isLoading } = useQuery({
    queryKey: ["admin-nav-links"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("nav_links")
        .select("*")
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("nav_links").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Navigation link deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-nav-links"] });
      queryClient.invalidateQueries({ queryKey: ["nav-links"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete link");
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData & { id?: string }) => {
      if (data.id) {
        const { error } = await supabase
          .from("nav_links")
          .update({
            label: data.label,
            href: data.href,
            order_index: data.order_index,
            is_visible: data.is_visible,
          })
          .eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("nav_links").insert([{
          label: data.label,
          href: data.href,
          order_index: data.order_index,
          is_visible: data.is_visible,
        }]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editingLink ? "Link updated" : "Link created");
      queryClient.invalidateQueries({ queryKey: ["admin-nav-links"] });
      queryClient.invalidateQueries({ queryKey: ["nav-links"] });
      handleCloseForm();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to save link");
    },
  });

  const handleEdit = (link: NavLink) => {
    setEditingLink(link);
    setFormData({
      label: link.label,
      href: link.href,
      order_index: link.order_index,
      is_visible: link.is_visible || true,
    });
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingLink(null);
    setFormData({
      label: "",
      href: "/",
      order_index: (navLinks?.length || 0) + 1,
      is_visible: true,
    });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingLink(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLink) {
      saveMutation.mutate({ ...formData, id: editingLink.id });
    } else {
      saveMutation.mutate(formData);
    }
  };

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
          <h1 className="text-3xl font-bold">Navigation Links</h1>
          <p className="text-muted-foreground">Manage website navigation menu</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Link
        </Button>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Path</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Visible</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {navLinks?.map((link) => (
              <TableRow key={link.id}>
                <TableCell>
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                </TableCell>
                <TableCell className="font-medium">{link.label}</TableCell>
                <TableCell className="text-muted-foreground">{link.href}</TableCell>
                <TableCell>{link.order_index}</TableCell>
                <TableCell>
                  {link.is_visible ? (
                    <span className="text-green-600">Visible</span>
                  ) : (
                    <span className="text-muted-foreground">Hidden</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(link)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMutation.mutate(link.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingLink ? "Edit Link" : "Create Link"}</DialogTitle>
            <DialogDescription>
              {editingLink ? "Update navigation link details" : "Add a new navigation link"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="label">Label *</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="e.g., Home, About, Services"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="href">Path *</Label>
              <Input
                id="href"
                value={formData.href}
                onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                placeholder="e.g., /, /about, /services"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                min={0}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="visible"
                checked={formData.is_visible}
                onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
              />
              <Label htmlFor="visible">Visible in navigation</Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleCloseForm}>
                Cancel
              </Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
