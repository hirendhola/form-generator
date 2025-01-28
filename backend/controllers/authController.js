import { Admin } from '../models/admin/admin.js';
import bcrypt from 'bcrypt';

export class adminAuthController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      console.log(req.body);
      if (!email || !password, !name) {
        return res.status(400).json({ error: 'Email and password required' });
      }
      const existingAdmin = await Admin.getByEmail(email);
      if (existingAdmin.email) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      const newPassword = bcrypt.hashSync(password, 10);
      const admin = await Admin.create({ email, password: newPassword, name });
      res.status(201).json(admin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }
      const admin = await Admin.getByEmail(email);
      if (admin === Error) {
        return res.status(400).json({ error: 'Invalid Email' });
      }
      if (!bcrypt.compareSync(password, admin[0].password)) {
        return res.status(400).json({ error: 'Invalid password' });
      }
      res.json(admin);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}