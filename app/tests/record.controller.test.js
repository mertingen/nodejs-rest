const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = "mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study";
db.records = require("../models/record.model.js")(mongoose);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const Record = db.records;


jest.setTimeout(10000)
test('Response length has to be bigger than 0! ', async () => {
  expect.assertions(1)
  try {
    let response = await Record.aggregate([
      {
        $match: {
          createdAt: {
            $gt: new Date('2016-06-14'),
            $lt: new Date('2016-07-24')
          }
        }
      },
      {
        $project: {
          key: 1,
          _id: 0,
          createdAt: 1,
          totalCount: {
            $sum: '$counts'
          }
        }
      }, {
        $match: {
          totalCount: {
            $gt: 1500,
            $lt: 3500
          }
        }
      }
    ]);
    expect(response.length).not.toBe(0)
    mongoose.connection.close()
  } catch (e) {
    console.log(e)
  }
});