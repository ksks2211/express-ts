import passport from "passport";
import User from "../models/user";
import local from "./localStrategy";

export interface IUser extends Express.User {
  id: any;
  email: string;
  accessToken?: String;
}

export default () => {
  // 로그인 전략 성공시 실행
  passport.serializeUser((user, done) => {
    const userInfo = user as IUser;

    if (userInfo.accessToken) {
    }
    done(null, userInfo.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
};
