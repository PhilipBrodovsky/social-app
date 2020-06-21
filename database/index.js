// get mongo client for connect
const { MongoClient, ObjectID } = require('mongodb');

let conenction = null;
async function getMongoClient() {
	if (!conenction) {
		conenction = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
	}

	return conenction;
}

const users = require('./users')(getMongoClient)

module.exports = {
	users
};
