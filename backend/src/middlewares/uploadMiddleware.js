const multer = require("multer");

// ✅ Store image in memory (RAM instead of disk)
const storage = multer.memoryStorage();

// File filter (only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;