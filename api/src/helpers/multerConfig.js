const multer = require("multer");

// Define storage location and file name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ".public/images/blogs/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
    // cb(null, new Date().toISOString() + file.originalname);
  },
});

// Define file filter to only allow image files
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG or PNG are allowed."), false);
  }
};

// Export multer configuration object
module.exports = {
  storage: storage,
  fileFilter: fileFilter,
};
