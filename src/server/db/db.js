const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:8080'
const dbName = 'todo';
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
const client = new MongoClient(url, config);

async function insert(target, docs, opt) {
  try {
    await client.connect();
    console.info(`[MongoDB] Connect to DB server successfully!`);

    const collection = client.db(dbName).collection(target);
    const result = await collection.insertMany(docs, opt);

    console.info(`[MongoDB] ${result.insertedCount} documents were inserted!`);
  } catch (err) {
    console.info(`[Error] ${err}`);
  } finally {
    await client.close();
    console.log(`[MongoDB] Disconnect!`);
  }
}

module.exports = {
  insertDoc: insert
}