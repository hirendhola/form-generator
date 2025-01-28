import { Form } from '../models/form/form.js';
import { Submission } from '../models/User/submission.js';
import { FileUploadService } from '../services/fileUpload.js';

export class FormController {
  static async createForm(req, res) {
    try {
      const { name, description, adminId } = req.body;

      if (!name || !adminId) {
        return res.status(400).json({ error: 'Name and adminId are required' });
      }

      const form = await Form.create(adminId, name, description);
      res.status(201).json(form);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async submitForm(req, res) {
    try {
      const { formId } = req.params;
      const { name, socialHandle } = req.body;
      const files = req.files;

      // Upload images
      const imageUrls = await FileUploadService.uploadImages(files, name);

      // Create submission
      const submission = await Submission.create(
        formId,
        name,
        socialHandle,
        imageUrls
      );

      res.status(201).json(submission);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAdminForms(req, res) {
    try {
      const { adminId } = req.params;
      const forms = await Form.getByAdminId(adminId);
      res.json(forms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getFormSubmissions(req, res) {
    try {
      const { formId } = req.params;
      const submissions = await Submission.getByFormId(formId);
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

