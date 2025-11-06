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

type FAQ = Database["public"]["Tables"]["faqs"]["Row"];

const faqSchema = z.object({
  question: z.string().trim().min(1, "Question is required").max(200, "Question must be less than 200 characters"),
  answer: z.string().trim().min(1, "Answer is required").max(2000, "Answer must be less than 2000 characters"),
  category: z.string().trim().max(50, "Category must be less than 50 characters").optional(),
  order_index: z.number().int().min(0).default(0),
  status: z.enum(["draft", "published"]).default("published"),
});

type FAQFormData = z.infer<typeof faqSchema>;

interface FAQFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faq?: FAQ | null;
  onSuccess: () => void;
}

export const FAQFormDialog = ({
  open,
  onOpenChange,
  faq,
  onSuccess,
}: FAQFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = !!faq;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FAQFormData>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: "",
      answer: "",
      category: "",
      order_index: 0,
      status: "published",
    },
  });

  useEffect(() => {
    if (faq) {
      reset({
        question: faq.question,
        answer: faq.answer,
        category: faq.category || "",
        order_index: faq.order_index || 0,
        status: (faq.status as "draft" | "published") || "published",
      });
    } else {
      reset({
        question: "",
        answer: "",
        category: "",
        order_index: 0,
        status: "published",
      });
    }
  }, [faq, reset]);

  const onSubmit = async (data: FAQFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        question: data.question,
        answer: data.answer,
        category: data.category || null,
        order_index: data.order_index,
        status: data.status,
      };

      if (isEdit) {
        const { error } = await supabase
          .from("faqs")
          .update(payload)
          .eq("id", faq.id);

        if (error) throw error;
        toast.success("FAQ updated successfully");
      } else {
        const { error } = await supabase.from("faqs").insert([payload]);

        if (error) throw error;
        toast.success("FAQ created successfully");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to save FAQ");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit FAQ" : "Create FAQ"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update FAQ details" : "Add a new frequently asked question"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question *</Label>
            <Input id="question" {...register("question")} />
            {errors.question && (
              <p className="text-sm text-destructive">{errors.question.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="answer">Answer *</Label>
            <Textarea
              id="answer"
              {...register("answer")}
              rows={6}
              placeholder="Provide a detailed answer"
            />
            {errors.answer && (
              <p className="text-sm text-destructive">{errors.answer.message}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                {...register("category")}
                placeholder="e.g., Services, Pricing, Process"
              />
              {errors.category && (
                <p className="text-sm text-destructive">{errors.category.message}</p>
              )}
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
