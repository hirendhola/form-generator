import { supabase } from "../../config/supabase.js";

export class Submission {
  static async create(formId, name, socialHandle, imageUrls) {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .insert([
          {
            form_id: formId,
            name,
            social_handle: socialHandle,
            image_urls: imageUrls
          }
        ])
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      throw new Error(`Error creating submission: ${error.message}`);
    }
  }

  static async getByFormId(formId) {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('form_id', formId);

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching submissions: ${error.message}`);
    }
  }
}
