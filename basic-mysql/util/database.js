const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
 
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://rodrigo:nPrKktz3NJiLVMLG@cluster0.5hz69.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { autoSelectFamily: false }
  )
    .then((client) => {
      console.log("Connected to Mongo");
      _db = client.db();
      callback(client);
    })
    .catch(err =>{ 
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db){
    return _db;
  }
  throw 'No database found!';
};
 
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;