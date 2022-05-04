import express from "express";
import path from 'path';
import multer from 'multer';

const router = express.Router();



// Multer storage configuration that uploads files
// to uploaded_images folder in the root
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploaded_images/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })


  // Filter file extension to match jpeg/png/jpg
  function filterFileTypes(file, cb) {
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
    fileFilter: function(req, file, cb) {
        filterFileTypes(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router;