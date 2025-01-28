import express from 'express';
import { uploadMemory } from '../../config/multer.js';
import { FormController } from '../../controllers/formController.js';

const router = express.Router();


// Admin routes
router.post('/forms', FormController.createForm);
router.get('/forms/:adminId', FormController.getAdminForms);
router.get('/forms/:formId/submissions', FormController.getFormSubmissions);

// Public routes
router.post('/submit/:formId', uploadMemory.array('images', 5), FormController.submitForm);

export default router;