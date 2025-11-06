import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { UserPlus, Trash2, Shield } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type UserRole = {
  id: string;
  user_id: string;
  role: "admin" | "editor" | "viewer";
  created_at: string;
  profiles: {
    full_name: string | null;
  } | null;
};

export const UserRolesPage = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<"admin" | "editor">("editor");
  const [deleteRoleId, setDeleteRoleId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch user roles
  const { data: userRoles, isLoading } = useQuery({
    queryKey: ["user-roles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Fetch profiles separately
      const userIds = data.map(role => role.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", userIds);

      // Merge profiles with roles
      return data.map(role => ({
        ...role,
        profiles: profiles?.find(p => p.id === role.user_id) || null
      })) as UserRole[];
    },
  });

  // Assign role mutation
  const assignRoleMutation = useMutation({
    mutationFn: async ({ email, role }: { email: string; role: string }) => {
      // First, get user by email
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("id")
        .eq("full_name", email)
        .single();

      if (userError) {
        // Try to find by searching in auth metadata
        throw new Error("User not found. Make sure the user has signed up first.");
      }

      // Insert role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert([{
          user_id: userData.id,
          role: role as "admin" | "editor" | "viewer",
        }]);

      if (roleError) {
        if (roleError.code === "23505") {
          throw new Error("User already has this role");
        }
        throw roleError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-roles"] });
      toast.success("Role assigned successfully");
      setOpen(false);
      setEmail("");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to assign role");
    },
  });

  // Delete role mutation
  const deleteRoleMutation = useMutation({
    mutationFn: async (roleId: string) => {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("id", roleId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-roles"] });
      toast.success("Role removed successfully");
      setDeleteRoleId(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove role");
    },
  });

  const handleAssignRole = () => {
    if (!email.trim()) {
      toast.error("Please enter an email");
      return;
    }
    assignRoleMutation.mutate({ email: email.trim(), role: selectedRole });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Roles</h1>
          <p className="text-muted-foreground">Manage admin and editor permissions</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Assign Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign User Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  User Email or Name
                </label>
                <Input
                  placeholder="Enter email or name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Role</label>
                <Select value={selectedRole} onValueChange={(v: any) => setSelectedRole(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleAssignRole}
                disabled={assignRoleMutation.isPending}
                className="w-full"
              >
                {assignRoleMutation.isPending ? "Assigning..." : "Assign Role"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Assigned Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : userRoles?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No roles assigned yet
                </TableCell>
              </TableRow>
            ) : (
              userRoles?.map((userRole) => (
                <TableRow key={userRole.id}>
                  <TableCell className="font-medium">
                    {userRole.profiles?.full_name || "Unknown User"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={userRole.role === "admin" ? "default" : "secondary"}
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      {userRole.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(userRole.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteRoleId(userRole.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteRoleId} onOpenChange={() => setDeleteRoleId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this role? The user will lose their permissions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteRoleId && deleteRoleMutation.mutate(deleteRoleId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
