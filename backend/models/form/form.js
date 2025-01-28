import { supabase } from '../../config/supabase.js';

export class Form {
  static async create(adminId, name, description) {
    try {

      const { data, error } = await supabase
        .from('form')
        .insert([
          { admin_id: adminId, name, description }
        ])
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      throw new Error(`Error creating form: ${error.message}`);
    }
  }

  static async getByAdminId(adminId) {
    try {
      const { data, error } = await supabase
        .from('form')
        .select('*')
        .eq('admin_id', adminId);

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching forms: ${error.message}`);
    }
  }
}

