import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config({ path: path.join(__dirname, ".env") });

const UPLOAD_TO = process.env.UPLOAD_TO || path.join(__dirname, "uploads");

const initialize_upload = () => {
  try {
    fs.readdirSync(UPLOAD_TO);
  } catch (error) {
    console.error("uploads folder not found");
    console.log("create uploads folder");
    fs.mkdirSync(UPLOAD_TO);
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      // data-processing
      cb(null, UPLOAD_TO);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);

      // 파일 이름 설정
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export { UPLOAD_TO, initialize_upload };

export default upload;
