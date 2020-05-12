/* eslint-disable no-undef */
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const dbTaskFourInLine = "fourInLineDB";
const playerCollection = "players";

function MongoUtils() {
  const mu = {};
  var url = process.env.MONGODB_URI
    ? process.env.MONGODB_URIs
    : "mongodb://localhost/four-line";
  mu.connect = () => {
    const client = new MongoClient(url, { useUnifiedTopology: true }); // { useUnifiedTopology: true } removes connection warnings;
    return client.connect();
  };

  mu.getUsers = (query) =>
    mu.connect().then((client) => {
      const clientCol = client
        .db(dbTaskFourInLine)
        .collection(playerCollection);
      return clientCol
        .find(query)
        .limit(20)
        .sort({ timestamp: -1 })
        .toArray()
        .finally(() => client.close());
    });

  mu.createUser = (user) =>
    mu.connect().then((client) => {
      const clientCol = client
        .db(dbTaskFourInLine)
        .collection(playerCollection);

      return clientCol.insertOne(user).finally(() => client.close());
    });

  mu.getUser = (googleId2) =>
    mu.connect().then((client) => {
      const userCol = client.db(dbTaskFourInLine).collection(playerCollection);

      return userCol
        .findOne({}, { googleId: googleId2 })
        .finally(() => client.close());
    });

  mu.getUserById = (id) =>
    mu.connect().then((client) => {
      const userCol = client.db(dbTaskFourInLine).collection(playerCollection);

      return userCol
        .findOne({ _id: new ObjectID(id) })
        .finally(() => client.close());
    });

  mu.getUserByName = (username) =>
    mu.connect().then((client) => {
      const userCol = client.db(dbTaskFourInLine).collection(playerCollection);

      return userCol
        .findOne({ username: username })
        .finally(() => client.close());
    });

  mu.deleteUser = (id) =>
    mu.connect().then((client) => {
      const userCol = client.db(dbTaskFourInLine).collection(playerCollection);

      return userCol
        .deleteOne({ _id: new ObjectID(id) })
        .finally(() => client.close());
    });

  mu.updateUser = (id, user) =>
    mu.connect().then((client) => {
      const noteCol = client.db(dbTaskFourInLine).collection(playerCollection);

      return noteCol
        .updateOne(
          { _id: new ObjectID(id) },
          {
            $set: {
              username: user.username,
              victories: user.victories,
              defeats: user.defeats,
              tie: user.tie,
            },
          },
          { upsert: false }
        )
        .finally(() => client.close());
    });

  mu.topTen = (query) =>
    mu.connect().then((client) => {
      const clientCol = client
        .db(dbTaskFourInLine)
        .collection(playerCollection);
      return clientCol
        .find(query)
        .sort({ victories: -1 })
        .limit(10)
        .toArray()
        .finally(() => client.close());
    });

  return mu;
}

module.exports = MongoUtils();
