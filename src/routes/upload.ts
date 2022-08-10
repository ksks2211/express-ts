import { Router } from "express";
import upload from "../upload";

const router = Router();

router.get("/", (req, res, next) => {
  res.render("multipart");
});

router.get("/multiple", (req, res, next) => {
  res.render("multipart-multiple");
});

router.post("/", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("ok");
});

router.post("/multiple", upload.array("images"), (req, res) => {
  console.log(req.files);
  res.send("ok");
});

// router.post("/many",upload.array)

export default router;
