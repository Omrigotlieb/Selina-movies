import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./connect-db";
import "./initialize-db";
import { authenticationRoute } from "./authenticate";
import path from "path";
let port = proccess.env.PORT || 7777;

let app = express();
app.listen(port, console.log("listening on port", port));

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

// app.post for /authenticate post request
authenticationRoute(app);

// If production change path to dist
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.resolve(__dirname, "../../dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"));
  });
}

// Add movie to favorites array in db
export const addToFavorites = async (userID, movie) => {
  let db = await connectDB();
  let collection = db.collection("users");
  await collection.updateOne({ id: userID }, { $push: { favorites: movie } });
};

// Remove movie from favorites array in db
export const removeFromFavorites = async (userID, movie) => {
  let db = await connectDB();
  let collection = db.collection("users");
  await collection.updateOne({ id: userID }, { $pull: { favorites: movie } });
};

// handle add to favorites post request
app.post("/favorites/add", async (req, res) => {
  let movie = req.body.movie;
  let userID = req.body.userID;
  await addToFavorites(userID, movie);
  res.status(200).send();
});

// handle remove from favorites post request
app.post("/favorites/remove", async (req, res) => {
  let movie = req.body.movie;
  let userID = req.body.userID;
  await removeFromFavorites(userID, movie);
  res.status(200).send();
});
