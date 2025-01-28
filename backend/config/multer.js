import multer from 'multer';
import path from 'path';

const storageDisk = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, '/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const storageMemory = multer.memoryStorage()

export const uploadMemory = multer({
  storage: storageMemory,
  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 5
  }
})

export const uploadDisk = multer({
  storage: storageDisk,
  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 5
  }
})