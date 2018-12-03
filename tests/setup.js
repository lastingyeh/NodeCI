// prevent timeout
jest.setTimeout(30 * 1000);

require('../models/User');

const mongoose = require('mongoose');

const keys = require('../config/keys');

//? connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(
	keys.mongoURI,
	{ useMongoClient: true },
);
