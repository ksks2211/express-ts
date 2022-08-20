import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, ".env") });

const { MONGODB_ID, MONGODB_PASSWORD, MONGODB_SERVER, MONGODB_DB_NAME } =
  process.env;

const URL = `mongodb+srv://${MONGODB_ID}:${MONGODB_PASSWORD}@${MONGODB_SERVER}/admin`;
const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true); // developing 일때는 디버그 모드로
  }
  mongoose.connect(
    URL,
    {
      dbName: `${MONGODB_DB_NAME}`,
    },
    (err) => {
      if (err) {
        console.error("MongoDB Connection Failed", err);
      } else {
        console.log("MongoDB Connected");
      }
    }
  );
};

const disconnect = () => {
  mongoose
    .disconnect()
    .then(() => {
      console.log("MongoDB Disconnected");
    })
    .catch((e) => {
      console.error("MongoDB Disconnection Failed");
    });
};

mongoose.connection.on("error", (e) => {
  console.error("MongoDB Connection Error", e);
});

mongoose.connection.on("disconnect", (e) => {
  console.error("MongoDB Disconnected");
  connect();
});

export { connect, disconnect };
