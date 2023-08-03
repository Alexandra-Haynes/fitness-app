// pages/api/upload-avatar.js
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).single("avatar");

export async function POST(req, res) {
  
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(500).json(err);
        return resolve();
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(500).json(err);
        return resolve();
      }

      // Everything went fine; handle the uploaded file.
      // req.file is the `avatar` file
      // You can save the path to your database here

      res.status(200).send({ message: "Avatar uploaded", path: req.file.path });
      return resolve();
    });
  
}
