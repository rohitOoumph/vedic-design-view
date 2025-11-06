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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { ImageUpload } from "./ImageUpload";
import { Star } from "lucide-react";

type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];

const testimonialSchema = z.object({
  client_name: z.string().trim().min(1, "Client name is required").max(100, "Name must be less than 100 characters"),
  designation: z.string().trim().max(100, "Designation must be less than 100 characters").optional(),
  company: z.string().trim().max(100, "Company must be less than 100 characters").optional(),
  project_type: z.string().trim().max(100, "Project type must be less than 100 characters").optional(),
  quote: z.string().trim().min(1, "Quote is required").max(1000, "Quote must be less than 1000 characters"),
  rating: z.number().int().min(1).max(5).optional(),
  avatar_url: z.string().url().optional().or(z.literal("")),
  order_index: z.number().int().min(0).default(0),
  status: z.enum(["draft", "published"]).default("published"),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

interface TestimonialFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonial?: Testimonial | null;
  onSuccess: () => void;
}

export const TestimonialFormDialog = ({
  open,
  onOpenChange,
  testimonial,
  onSuccess,
}: TestimonialFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = !!testimonial;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      client_name: "",
      designation: "",
      company: "",
      project_type: "",
      quote: "",
      rating: 5,
      avatar_url: "",
      order_index: 0,
      status: "published",
    },
  });

  useEffect(() => {
    if (testimonial) {
      reset({
        client_name: testimonial.client_name,
        designation: testimonial.designation || "",
        company: testimonial.company || "",
        project_type: testimonial.project_type || "",
        quote: testimonial.quote,
        rating: testimonial.rating || 5,
        avatar_url: testimonial.avatar_url || "",
        order_index: testimonial.order_index || 0,
        status: (testimonial.status as "draft" | "published") || "published",
      });
    } else {
      reset({
        client_name: "",
        designation: "",
        company: "",
        project_type: "",
        quote: "",
        rating: 5,
        avatar_url: "",
        order_index: 0,
        status: "published",
      });
    }
  }, [testimonial, reset]);

  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        client_name: data.client_name,
        designation: data.designation || null,
        company: data.company || null,
        project_type: data.project_type || null,
        quote: data.quote,
        rating: data.rating || null,
        avatar_url: data.avatar_url || null,
        order_index: data.order_index,
        status: data.status,
      };

      if (isEdit) {
        const { error } = await supabase
          .from("testimonials")
          .update(payload)
          .eq("id", testimonial.id);

        if (error) throw error;
        toast.success("Testimonial updated successfully");
      } else {
        const { error } = await supabase.from("testimonials").insert([payload]);

        if (error) throw error;
        toast.success("Testimonial created successfully");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to save testimonial");
    } finally {
      setIsSubmitting(false);
    }
  };

  const rating = watch("rating") || 5;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Testimonial" : "Create Testimonial"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update testimonial details" : "Add a new client testimonial"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="client_name">Client Name *</Label>
              <Input id="client_name" {...register("client_name")} />
              {errors.client_name && (
                <p className="text-sm text-destructive">{errors.client_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input id="designation" {...register("designation")} placeholder="e.g., Director" />
              {errors.designation && (
                <p className="text-sm text-destructive">{errors.designation.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" {...register("company")} />
              {errors.company && (
                <p className="text-sm text-destructive">{errors.company.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="project_type">Project Type</Label>
              <Input id="project_type" {...register("project_type")} placeholder="e.g., Corporate" />
              {errors.project_type && (
                <p className="text-sm text-destructive">{errors.project_type.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote">Testimonial Quote *</Label>
            <Textarea
              id="quote"
              {...register("quote")}
              rows={4}
              placeholder="What did the client say about your work?"
            />
            {errors.quote && (
              <p className="text-sm text-destructive">{errors.quote.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setValue("rating", star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= rating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">{rating} / 5</span>
            </div>
          </div>

          <ImageUpload
            value={watch("avatar_url")}
            onChange={(url) => setValue("avatar_url", url)}
            label="Client Avatar (Optional)"
            aspectRatio="1/1"
          />

          <div className="grid gap-4 md:grid-cols-2">
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
