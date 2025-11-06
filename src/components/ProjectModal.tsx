import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag } from 'lucide-react';
import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  category: string | null;
  short_desc: string | null;
  full_description: string | null;
  cover_image_url: string | null;
  media_gallery: any;
  published_at: string | null;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!project) return null;

  const allImages = [
    project.cover_image_url,
    ...(Array.isArray(project.media_gallery) ? project.media_gallery : [])
  ].filter(Boolean);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative">
          {/* Main Image - Full View */}
          <div className="relative w-full overflow-hidden bg-muted">
            <img
              src={selectedImage || project.cover_image_url || '/placeholder.svg'}
              alt={project.title}
              className="w-full object-contain max-h-[70vh]"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Content - Below Image */}
          <div className="p-8 bg-background">
            <div className="flex items-center gap-4 mb-4">
              {project.category && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                  <Tag className="w-4 h-4" />
                  {project.category}
                </span>
              )}
              {project.published_at && (
                <span className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4" />
                  {new Date(project.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </span>
              )}
            </div>

            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              {project.title}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              {project.short_desc}
            </p>

            {project.full_description && (
              <div className="prose prose-lg max-w-none mb-8 text-foreground">
                <p>{project.full_description}</p>
              </div>
            )}

            {/* Image Gallery */}
            {allImages.length > 1 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Project Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {allImages.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImage(image as string)}
                      className="relative aspect-square overflow-hidden rounded-lg border-2 transition-all hover:border-accent"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={image as string}
                        alt={`${project.title} - ${index + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
