import { supabase } from '../../config/supabase.js';

export class Admin {
  static async create(userData) {
    const { data, error } = await supabase
      .from('user')
      .insert([userData])
      .select();

    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  }
  static async getById(id) {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  static async getByEmail(email) {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('email', email)

    if (error) throw new Error(error.message)

    return data
  }

  static async update(id, updates) {
    const { data, error } = await supabase
      .from('user')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) throw error
    return data[0]
  }

  static async delete(id) {
    const { error } = await supabase
      .from('user')
      .delete()
      .eq('id', id)

    if (error) throw error

    return true
  }

}