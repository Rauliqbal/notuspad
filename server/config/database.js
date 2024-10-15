import mongoose from "mongoose";

export const Database = (db_url) => {
  mongoose
    .connect(db_url)
    .then(() => console.log("⦗INFO⚡⦘ MongoDB connected successfully"))
    .catch((error) =>
      console.log(`⦗ERROR🚫⦘ MongoDB not connected : ${error}`)
    );
};