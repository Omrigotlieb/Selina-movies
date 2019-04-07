import { defaultState } from "./defaultState";
import { connectDB } from "./connect-db";

// Initializes the database with sample user if the default user exist
// the db exist and there is no need to initialize it.
// Will run by the command `npm run initialize`
async function initializeDB() {
  let db = await connectDB();
  let user = await db.collection("users").findOne({ id: "U1" });
  if (!user) {
    for (let collectionName in defaultState) {
      let collection = db.collection(collectionName);
      await collection.insertMany(defaultState[collectionName]);
    }
  }
}

initializeDB();
