const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const uploadController = require("../Controllers/uploadCloudinaryController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const fileInfo = req.file;
  if (!fileInfo) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const cloudinaryUrl = await uploadController.uploadOnCloudinary(
      fileInfo.path
    );
    return res.status(200).json({ url: cloudinaryUrl });
  } catch (error) {
    console.error("Error during file upload route:", error.message);
    return res.status(500).send("Internal Server Error: " + error.message);
  }
});

module.exports = router;
