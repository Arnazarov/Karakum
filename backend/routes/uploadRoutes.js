import express from "express";
import path from 'path';
import multer from 'multer';

const router = express.Router();



// Multer storage configuration that uploads files
// to uploaded_images folder in the root
const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
  })


  // Filter file extension to match jpeg/png/jpg
  const filterFileTypes = (req, file, cb) => {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Only images can be uploaded!')
    }
  }


// Multer middleware to include in routes where uploading is needed
const upload = multer({
    storage,
    // filterFileTypes
})

router.post('/', upload.single('image'), (req, res) => {
    try {
      res.send(`${req.file.path}`)
    } catch(err) {
      console.log(err);
    }
})


export default router;