const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var URL = '';
if (process.env.NODE_ENV == 'production'){
	URL = process.env.MONGODB_URL;
} else if (process.env.NODE_ENV == 'development' || !process.env.NODE_ENV) {
	const config = require('../config/config.js');
	URL = global.gConfig.database
}

const db = {};
db.mongoose = mongoose;
db.url = URL;
db.records = require("./record.model.js")(mongoose);

module.exports = db;