import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./connect-db";
import "./initialize-db";
import { authenticationRoute } from "./authenticate";

let port = 7777;

let app = express();
app.listen(port, console.log("listening on port", port));

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

authenticationRoute(app);

export const addToFavorites = async (userID, movie) => {
  let db = await connectDB();
  let collection = db.collection("users");
  await collection.updateOne({ id: userID }, { $push: { favorites: movie } });
};

export const removeFromFavorites = async (userID, movie) => {
  let db = await connectDB();
  let collection = db.collection("users");
  await collection.update({ id: userID }, { $pull: { favorites: { movie } } });
  collection = db.collection("users");
  console.log("collection", collection);
};

app.post("/favorites/add", async (req, res) => {
  let movie = req.body.movie;
  let userID = req.body.userID;
  console.log("Adding to favorites");
  await addToFavorites(userID, movie);
  res.status(200).send();
});

app.post("/favorites/remove", async (req, res) => {
  let movie = req.body.movie;
  let userID = req.body.userID;
  console.log("Removing from favorites");
  await removeFromFavorites(userID, movie);
  res.status(200).send();
});
