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
import { ImageUpload } from "./ImageUpload";

type Project = Database["public"]["Tables"]["projects"]["Row"];

const categories = ["Residential", "Corporate", "Coworking", "Temple", "Retail", "Hospitality"];

const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  slug: z.string().trim().min(1, "Slug is required").max(100),
  category: z.string().max(50).optional(),
  short_desc: z.string().trim().max(200).optional(),
  full_description: z.string().trim().max(2000).optional(),
  cover_image_url: z.string().url().optional().or(z.literal("")),
  model_3d_url: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  order_index: z.number().int().min(0).default(0),
  status: z.enum(["draft", "published"]).default("published"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Project | null;
  onSuccess: () => void;
}

export const ProjectFormDialog = ({
  open,
  onOpenChange,
  project,
  onSuccess,
}: ProjectFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = !!project;

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "",
      short_desc: "",
      full_description: "",
      cover_image_url: "",
      model_3d_url: "",
      featured: false,
      order_index: 0,
      status: "published",
    },
  });

  const title = watch("title");

  useEffect(() => {
    if (title && !isEdit) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      setValue("slug", slug);
    }
  }, [title, isEdit, setValue]);

  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        slug: project.slug,
        category: project.category || "",
        short_desc: project.short_desc || "",
        full_description: project.full_description || "",
        cover_image_url: project.cover_image_url || "",
        model_3d_url: project.model_3d_url || "",
        featured: project.featured || false,
        order_index: project.order_index || 0,
        status: (project.status as "draft" | "published") || "published",
      });
    } else {
      reset();
    }
  }, [project, reset]);

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        title: data.title,
        slug: data.slug,
        category: data.category || null,
        short_desc: data.short_desc || null,
        full_description: data.full_description || null,
        cover_image_url: data.cover_image_url || null,
        model_3d_url: data.model_3d_url || null,
        featured: data.featured,
        order_index: data.order_index,
        status: data.status,
      };

      if (isEdit) {
        const { error } = await supabase.from("projects").update(payload).eq("id", project.id);
        if (error) throw error;
        toast.success("Project updated successfully");
      } else {
        const { error } = await supabase.from("projects").insert([payload]);
        if (error) throw error;
        toast.success("Project created successfully");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to save project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Project" : "Create Project"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update project details" : "Add a new portfolio project"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" {...register("title")} />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" {...register("slug")} />
              {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={watch("category")} onValueChange={(value) => setValue("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_desc">Short Description</Label>
            <Textarea id="short_desc" {...register("short_desc")} rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_description">Full Description</Label>
            <Textarea id="full_description" {...register("full_description")} rows={4} />
          </div>

          <ImageUpload
            value={watch("cover_image_url")}
            onChange={(url) => setValue("cover_image_url", url)}
            label="Cover Image"
          />

          <div className="space-y-2">
            <Label htmlFor="model_3d_url">3D Model URL (Optional)</Label>
            <Input id="model_3d_url" {...register("model_3d_url")} placeholder="https://..." />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={watch("featured")}
                onCheckedChange={(checked) => setValue("featured", checked)}
              />
              <Label htmlFor="featured">Featured Project</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order_index">Display Order</Label>
              <Input id="order_index" type="number" {...register("order_index", { valueAsNumber: true })} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={watch("status")} onValueChange={(value: "draft" | "published") => setValue("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
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
