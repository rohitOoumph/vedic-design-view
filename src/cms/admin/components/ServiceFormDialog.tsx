import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Service = Database["public"]["Tables"]["services"]["Row"];

const iconOptions = [
  { value: "Home", label: "Home" },
  { value: "Building2", label: "Building" },
  { value: "Box", label: "Box" },
  { value: "Layout", label: "Layout" },
  { value: "PackageCheck", label: "Package" },
  { value: "Ruler", label: "Ruler" },
  { value: "Briefcase", label: "Briefcase" },
  { value: "Sparkles", label: "Sparkles" },
];

const serviceSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  slug: z.string().trim().min(1, "Slug is required").max(100, "Slug must be less than 100 characters"),
  short_desc: z.string().trim().max(200, "Short description must be less than 200 characters").optional(),
  full_description: z.string().trim().max(2000, "Full description must be less than 2000 characters").optional(),
  icon_name: z.string().optional(),
  is_featured: z.boolean().default(false),
  order_index: z.number().int().min(0).default(0),
  status: z.enum(["draft", "published"]).default("published"),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServiceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: Service | null;
  onSuccess: () => void;
}

export const ServiceFormDialog = ({
  open,
  onOpenChange,
  service,
  onSuccess,
}: ServiceFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = !!service;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      slug: "",
      short_desc: "",
      full_description: "",
      icon_name: "Home",
      is_featured: false,
      order_index: 0,
      status: "published",
    },
  });

  const title = watch("title");

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !isEdit) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setValue("slug", slug);
    }
  }, [title, isEdit, setValue]);

  // Load service data when editing
  useEffect(() => {
    if (service) {
      reset({
        title: service.title,
        slug: service.slug,
        short_desc: service.short_desc || "",
        full_description: service.full_description || "",
        icon_name: service.icon_name || "Home",
        is_featured: service.is_featured || false,
        order_index: service.order_index || 0,
        status: (service.status as "draft" | "published") || "published",
      });
    } else {
      reset({
        title: "",
        slug: "",
        short_desc: "",
        full_description: "",
        icon_name: "Home",
        is_featured: false,
        order_index: 0,
        status: "published",
      });
    }
  }, [service, reset]);

  const onSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        title: data.title,
        slug: data.slug,
        short_desc: data.short_desc || null,
        full_description: data.full_description || null,
        icon_name: data.icon_name || null,
        is_featured: data.is_featured,
        order_index: data.order_index,
        status: data.status,
      };

      if (isEdit) {
        const { error } = await supabase
          .from("services")
          .update(payload)
          .eq("id", service.id);

        if (error) throw error;
        toast.success("Service updated successfully");
      } else {
        const { error } = await supabase.from("services").insert([payload]);

        if (error) throw error;
        toast.success("Service created successfully");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to save service");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Service" : "Create Service"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update service details" : "Add a new service to your portfolio"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" {...register("title")} />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" {...register("slug")} />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_desc">Short Description</Label>
            <Textarea
              id="short_desc"
              {...register("short_desc")}
              rows={2}
              placeholder="Brief description shown in cards"
            />
            {errors.short_desc && (
              <p className="text-sm text-destructive">{errors.short_desc.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_description">Full Description</Label>
            <Textarea
              id="full_description"
              {...register("full_description")}
              rows={4}
              placeholder="Detailed description for the service page"
            />
            {errors.full_description && (
              <p className="text-sm text-destructive">{errors.full_description.message}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="icon_name">Icon</Label>
              <Select
                value={watch("icon_name")}
                onValueChange={(value) => setValue("icon_name", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order_index">Display Order</Label>
              <Input
                id="order_index"
                type="number"
                {...register("order_index", { valueAsNumber: true })}
              />
              {errors.order_index && (
                <p className="text-sm text-destructive">{errors.order_index.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured"
                checked={watch("is_featured")}
                onCheckedChange={(checked) => setValue("is_featured", checked)}
              />
              <Label htmlFor="is_featured">Featured Service</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={watch("status")}
                onValueChange={(value: "draft" | "published") => setValue("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
