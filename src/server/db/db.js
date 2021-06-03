const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017'
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
const client = new MongoClient(url, config);

module.exports = {
  startDB: async () => {
    try {
      await client.connect();
      console.info(`[MongoDB] Connect to DB server successfully!`);
    } catch (err) {
      console.info(`[Error] ${err}`);
    }
  },
  closeDB: () => {
    client.close();
    console.info(`[MongoDB] DB server closed.`);
  },
  insertDoc: async (doc, opt) => {
    try {
      const collection = client.db('todo').collection('Item');
      const result = await collection.insertOne(doc, opt);

      console.info(`[MongoDB] target document inserted!`);
    } catch (err) {
      console.info(`[Error] ${err}`);
    }
  },
  updateDoc: async (filter, doc, opt) => {
    try {
      const collection = client.db('todo').collection('Item');
      const result = await collection.updateOne(filter, doc, opt);

      console.info(`[MongoDB] target document updated!`);
    } catch (err) {
      console.info(`[Error] ${err}`);
    }
  },
  deleteDoc: async (query) => {
    try {
      const collection = client.db('todo').collection('Item');
      const result = await collection.deleteOne(query);

      if (result.deletedCount === 1) console.info(`[MongoDB] target document deleted!`);
    } catch (err) {
      console.info(`[Error] ${err}`);
    }
  },
  readDoc: async (query, result) => {
    try {
      const collection = client.db('todo').collection('Item');
      const cursor = await collection.find(query);

      await cursor.forEach(doc => result.push(doc));

      console.info(`[MongoDB] get documents!`);
    } catch (err) {
      console.info(`[Error] ${err}`);
    }
  }
}