const router = require('express').Router();

const { readFile, writeFile, createToken, verifyToken } = require('../helpers');

const db = require('../database');

// CRUD
// Create
// Read
// Update
// Delete

// authentication vs authorization

// private route for example
router.get('/private', async (req, res) => {
	try {
		const { token } = req.headers;
		let decoded = await verifyToken(token);
		res.json(decoded);
	} catch (err) {
		console.log('get users err', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

// login
router.post('/login', async (req, res) => {
	try {
		const { password, email } = req.body;
		const user = await db.users.getUserByEmail(email);
		if (!user || user.password !== password) {
			res.status(400).json({
				message: 'email or password not valid',
			});
		}
		const token = await createToken(user);
		res.json({ user, token });
	} catch (err) {
		console.log('get users err', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

// get all users
router.get('/', async (req, res) => {
	try {
		const users = await db.users.getUsers();
		res.json({ users });
	} catch (err) {
		console.log('get users err', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

// update profile
router.post('/update', async (req, res) => {
	try {
		const { id, data } = req.body; // const  user  = req.body.user;
		const newUser = await db.users.updateById(id, data);

		res.json({ user: newUser });
	} catch (err) {
		console.log('register err', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

router.post('/register', async (req, res) => {
	try {
		const { user } = req.body; // const  user  = req.body.user;
		const newUser = await db.users.addUser(user);

		res.json({ user: newUser });
	} catch (err) {
		console.log('register err', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

router.post('/delete', async (req, res) => {
	try {
		const { id } = req.body; // const  user  = req.body.user;
		const deletedCount = await db.users.deleteUser(id);

		res.json({ deleteId: id, message: `total users deleted: ${deletedCount}` });
	} catch (err) {
		console.log('delete err', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

// add new user
router.post('/', async (req, res) => {
	try {
		console.log('users/post: add new user', req.body);

		const { name, email } = req.body;

		// read file in async mode
		const data = await readFile('./users.json');

		const users = data ? JSON.parse(data) : [];

		const existsUser = users.find(user => user.email === email);

		if (existsUser) {
			return res.json({ err: 'user with this email exists' });
		}

		// random id
		const id = (Date.now() + Math.random()).toString().replace('.', '-');

		// create user
		const newUser = {
			name: name,
			email: email,
			id: id,
		};

		// add user to array
		users.push(newUser);

		// update users.json with new users array
		await writeFile('./users.json', JSON.stringify(users));

		console.log('newUser', newUser);
		res.json(newUser);
	} catch (error) {
		res.status(500).json('not ok');
	}
});

module.exports = router;
