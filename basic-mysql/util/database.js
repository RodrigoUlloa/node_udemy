const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const {MONGO_DB} = process.env
let _db;
 
const mongoConnect = (callback) => {
  MongoClient.connect(
    MONGO_DB,
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