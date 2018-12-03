const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const keys = require('../config/keys')

const client = redis.createClient(keys.redisUrl);

// client.get = util.promisify(client.get);
client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
	this.useCache = true;
	this.hashKey = JSON.stringify(options.key || '');

	return this;
};

mongoose.Query.prototype.exec = async function() {
	if (!this.useCache) {
		return exec.apply(this, arguments);
	}

	console.log('cache enable');

	try {
		const key = JSON.stringify(
			Object.assign({}, this.getQuery(), {
				collection: this.mongooseCollection.name,
			}),
		);

		// const cacheValue = await client.get(key);
		const cacheValue = await client.hget(this.hashKey, key);

		// if cache existed
		if (cacheValue) {
			// console.log('cacheValue exist', cacheValue);
			// convert to model instance
			const doc = JSON.parse(cacheValue);

			// check doc type for array or object
			return Array.isArray(doc)
				? doc.map(d => new this.model(d))
				: new this.model(doc);
		}
		// if no cache, query from db and set key
		const result = await exec.apply(this, arguments);
		// expired at 10 secs
		client.hset(this.hashKey, key, JSON.stringify(result));

		return result;
	} catch (error) {
		console.log('error', error.message);
		return null;
	}
};

module.exports = {
	clearHash(hashKey) {
		client.del(JSON.stringify(hashKey));
	},
};
