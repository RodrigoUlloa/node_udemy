const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const {MONGODB_URI} = process.env;
let _db;
 
const mongoConnect = (callback) => {
  MongoClient.connect(
    MONGODB_URI,
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