-- Add RLS policies for storage.objects to secure media uploads
-- Only authenticated users with admin or editor roles can upload/delete images

CREATE POLICY "Authenticated admins can upload media"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'media' 
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'))
);

CREATE POLICY "Authenticated admins can update media"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'media' 
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'))
);

CREATE POLICY "Authenticated admins can delete media"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'media' 
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor'))
);

CREATE POLICY "Public can view media"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'media');