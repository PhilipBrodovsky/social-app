const fs = require('fs');
const jwt = require('jsonwebtoken');

module.exports = {
	readFile: path => {
		return new Promise(function (resolve, reject) {
			fs.readFile(path, 'utf8', function (err, data) {
				if (err) return reject(err);
				return resolve(data);
			});
		});
	},
	writeFile: (path, data) => {
		return new Promise(function (resolve, reject) {
			fs.writeFile(path, data, 'utf8', function (err, data) {
				if (err) return reject(err);
				return resolve(data);
			});
		});
	},
	createToken: data => {
		return new Promise((resolve, reject) => {
			jwt.sign(data, 'privateKey', function (err, token) {
				if (err) return reject(err);
				resolve(token);
			});
		});
	},
	verifyToken: token => {
		return new Promise((resolve, reject) => {
			jwt.verify(token, 'privateKey', function (err, decoded) {
				if (err) return reject(err);
				resolve(decoded);
			});
		});
	},
};
