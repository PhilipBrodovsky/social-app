const router = require('express').Router();

const { readFile, writeFile } = require('../helpers');

// add new user
router.post('/', (req, res) => {
	try {
		console.log('users/post: add new user', req.body);

		const { name, email } = req.body;

		// read file in async mode
		readFile('./users.json')
			.then(function (data) {
				// if (err) {
				// 	console.log(err.message);
				// 	return res.status(500).json({ err: err.message });
				// }

				const users = data ? JSON.parse(data) : [];

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
				return writeFile('./users.json', JSON.stringify(users));
			})
			.then(err => {
				if (err) {
					return res.status(500).json({ err: err.message });
				}
				// console.log('newUser', newUser);

				res.json('ok');
			})
			.catch(err => {
				res.json({
					err: err.message,
				});
			});
	} catch (error) {
		res.status(500).json('not ok');
	}
});

router.get('/', (req, res) => {
	console.log('metohd', req.method);
	console.log('path', req.path);

	res.json(allPosts);
});

module.exports = router;
