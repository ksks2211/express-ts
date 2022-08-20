import { Router } from "express";
import router from ".";

router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
  // res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  // res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  // res.locals.followerIdList = req.user
  //   ? req.user.Followings.map((f) => f.id)
  //   : [];
  // next();
});

router.get("/profile", (req, res) => {
  res.render("profile", { title: "My Info" });
});

router.get("/join", (req, res) => {
  res.render("join", { title: "Sign Up" });
});

router.get("/", (req, res) => {
  const twits: string[] = [];
  res.render("main", {
    title: "NodeBird",
    twits,
  });
});

module.exports = router;
