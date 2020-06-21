// get mongo client for connect
const { ObjectID } = require('mongodb');

module.exports = getMongoClient => {
	return {
		getUsers: async function getUsers() {
			try {
				// get mongo client
				const client = await getMongoClient();
				// select collection
				const collection = client.db('aviad').collection('Users');
				// run query
				const users = await collection.find().toArray();
				return users;
			} catch (err) {
				console.log(`getUsers err: ${err.message}`);
				return [];
			}
		},
		getUserByEmail: async function (email) {
			try {
				// get mongo client
				const client = await getMongoClient();
				// select collection
				const collection = client.db('aviad').collection('Users');
				// run query
				const user = await collection.findOne({ email: email });
				return user;
			} catch (err) {
				console.log(`getUsers err: ${err.message}`);
				return null;
			}
		},

		deleteUser: async function (id) {
			try {
				// get mongo client
				const client = await getMongoClient();
				// select collection
				const collection = client.db('aviad').collection('Users');
				// run query
				const res = await collection.deleteOne({ _id: ObjectID(id) });
				return res.result.n;
			} catch (err) {
				console.log(`getUsers err: ${err.message}`);
				return null;
			}
		},

		updateById: async function (id, data) {
			try {
				// get mongo client
				const client = await getMongoClient();
				// select collection
				const collection = client.db('aviad').collection('Users');

				const filter = { _id: ObjectID(id) };
				const update = {
					$set: data,
				};
				const options = {
					returnOriginal: false,
				};
				// run query
				const res = await collection.findOneAndUpdate(filter, update, options);
				return res.value;
			} catch (err) {
				console.log(`getUsers err: ${err.message}`);
				return null;
			}
		},

		addUser: async function (user) {
			try {
				// get mongo client
				const client = await getMongoClient();
				// select collection
				const collection = client.db('aviad').collection('Users');
				// run query
				const res = await collection.insertOne(user);
				return res.ops[0];
			} catch (err) {
				console.log(`getUsers err: ${err.message}`);
				return null;
			}
		},
	};
};
