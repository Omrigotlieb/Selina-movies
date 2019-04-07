import uuid from "uuid";
import md5 from "md5";
import { connectDB } from "./connect-db";

const authenticationTokens = [];


// Create new user with a state of: usersCollection and session.
// Admin will get admin roll in session and otherUsers dada.
async function createUserState(user) {
  let db = await connectDB();
  let collection = await db.collection("users");
  let otherUsers = await collection
    .find({
      $or: [{ roll: { $not: { "Admin" } } }]
    })
    .toArray();

  console.log("otherUsers", otherUsers);
  let usersCollection = await collection.find({ id: user.id }).toArray();
  let admin = await collection.find({ id: user.id }, { roll: 1 }).toArray();
  // If in admin mode set admin else reset all otherUsers collection from state.
  console.log("hey - the admin is:", admin);
  if (admin) {
    admin = admin[0]["roll"];
  } else {
    otherUsers = [];
  }

  return {
    usersCollection,
    session: {
      authenticated: "AUTHENTICATED",
      id: user.id,
      admin,
      otherUsers
    }
  };
}

// Search in db for the user and checks for matching password.
export const authenticationRoute = app => {
  app.post("/authenticate", async (req, res) => {
    let { username, password } = req.body;
    let db = await connectDB();
    let collection = db.collection("users");

    let user = await collection.findOne({ name: username });
    if (!user) {
      return res.status(500).send("User not found");
    }

    let hash = md5(password);
    let passwordCorrect = hash === user.passwordHash;
    if (!passwordCorrect) {
      return res.status(500).send("Password incorrect");
    }

    let token = uuid();

    authenticationTokens.push({
      token,
      userID: user.id
    });

    let state = await createUserState(user);

    res.send({ token, state });
  });

  // Create new user in db
  app.post("/user/create", async (req, res) => {
    let { username, password } = req.body;
    let db = await connectDB();
    let collection = db.collection("users");
    let user = await collection.findOne({ name: username });
    if (user) {
      res.status(500).send({ message: "Email already exists." });
      return;
    }

    let userID = uuid();
    await collection.insertOne({
      name: username,
      id: userID,
      favorites: [],
      passwordHash: md5(password)
    });

    let state = await createUserState({ id: userID, name: username });

    res.status(200).send({ userID, state });
  });
};
