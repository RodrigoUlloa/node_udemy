const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
 
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://rodrigo:ZxLsvzfkWhQCKi3o@cluster0.5hz69.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0",
    { autoSelectFamily: false }
  )
    .then((client) => {
      console.log("Connected to Mongo");
      callback(client);
    })
    .catch((err) => console.log(err));
};
 
module.exports = mongoConnect;