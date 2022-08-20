import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { IUser } from ".";
import User from "../models/user";
// const User = require("../models/user");

export default () => {
  const localStrategy = new LocalStrategy(
    // form 에서 추출할 내용
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          const match = await bcrypt.compare(password, user.password);
          if (match) {
            const userInfo: IUser = {
              id: user.id,
              email: user.email,
            };
            done(null, userInfo);
          } else {
            done(null, false, { message: "Invalid Password" });
          }
        } else {
          done(null, false, { message: "Email Not Registered" });
        }
      } catch (e) {
        console.error(e);
        done(e);
      }
    }
  );

  passport.use(localStrategy);
};
