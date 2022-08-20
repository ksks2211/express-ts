import { Types } from "mongoose";
import passport from "passport";
import User from "../models/user";
import local from "./localStrategy";

export default () => {
  // 로그인 전략 성공시 실행
  passport.serializeUser<Types.ObjectId>((user, done) => {
    // if (user.accessToken) {
    // }

    user._id;

    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
};
