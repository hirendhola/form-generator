import { supabase } from '../config/supabase.js';

export class FileUploadService {
  static async uploadImages(files, userId) {
    try {
      if (!files || files.length === 0) {
        throw new Error('No files provided');
      }

      const imageUrls = [];

      for (const file of files) {
        const fileName = `${userId}_${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage
          .from('user-uploads')
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            cacheControl: '3600'
          });

        if (error) throw error;

        const { data: urlData } = supabase.storage
          .from('user-uploads')
          .getPublicUrl(fileName);

        if (!urlData || !urlData.publicUrl) {
          throw new Error('Failed to generate public URL');
        }

        imageUrls.push(urlData.publicUrl);
      }

      return imageUrls;
    } catch (error) {
      throw new Error(`Error uploading files: ${error.message}`);
    }
  }
}

