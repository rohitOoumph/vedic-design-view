import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, Trash2, Search, Copy } from "lucide-react";
import { uploadImage, deleteImage } from "../utils/uploadImage";
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

export const MediaLibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deleteUrl, setDeleteUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch media files
  const { data: mediaFiles, isLoading } = useQuery({
    queryKey: ["media-library"],
    queryFn: async () => {
      const { data, error } = await supabase.storage.from("media").list();
      if (error) throw error;
      
      return data.map((file) => {
        const { data: { publicUrl } } = supabase.storage
          .from("media")
          .getPublicUrl(file.name);
        return {
          name: file.name,
          url: publicUrl,
          createdAt: file.created_at,
          size: file.metadata?.size || 0,
        };
      });
    },
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      return await uploadImage(file, "media");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media-library"] });
      toast.success("File uploaded successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to upload file");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (url: string) => {
      await deleteImage(url, "media");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media-library"] });
      toast.success("File deleted successfully");
      setDeleteUrl(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete file");
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        await uploadMutation.mutateAsync(file);
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };

  const filteredFiles = mediaFiles?.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Media Library</h1>
        <p className="text-muted-foreground">Manage your uploaded images and files</p>
      </div>

      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button disabled={uploading} asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? "Uploading..." : "Upload Files"}
              </span>
            </Button>
          </label>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="aspect-square animate-pulse bg-muted" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFiles?.map((file) => (
            <Card key={file.url} className="overflow-hidden group">
              <div className="aspect-square relative">
                <img
                  src={file.url}
                  alt={file.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => copyToClipboard(file.url)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => setDeleteUrl(file.url)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs truncate font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(0)} KB
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {filteredFiles?.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No files found</p>
        </div>
      )}

      <AlertDialog open={!!deleteUrl} onOpenChange={() => setDeleteUrl(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete File</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this file? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteUrl && deleteMutation.mutate(deleteUrl)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
