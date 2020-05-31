const db = require("../models");
const Record = db.records;

exports.findAll = async (req, res) => {
  // getting required parameters from client
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;
  var minCount = req.body.minCount;
  var maxCount = req.body.maxCount;


  // cheking existing status of the parameters
  if(!startDate || !endDate || !minCount || !maxCount) {
      res.status(400).send(
          {
            "code":400,
            "msg":"The required parameters are not found in request!",
            "records":[]
          }
      );
  } else {

    // converting string to date object
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    minCount = parseInt(minCount);
    maxCount = parseInt(maxCount);

    // getting record from mongodb by aggregation.
    const records = await Record.aggregate([
        {
          $match: {
            createdAt: {
              // createdAt >=  startDate, createdAt <= endDate
              $gte: startDate,
              $lte: endDate
            }
          }
        },
        {
          $project: {
            _id: false,
            key: true,
            createdAt: true,
            //getting total counts array
            totalCount: {
              $sum: '$counts'
            }
          }
        },
        {
          $match: {
            // totalCount >=  minCount, totalCount <= maxCount
            totalCount:{
              $gte: minCount,
              $lte: maxCount
            }
          }
        }
      ]).catch(function (error) {
        //here the error can be sent into log server. I didn't want to show it to client.
        res.status(500).send(
            {
              "code":500,
              "msg":"The error occured while gathering the record!",
              "records":[]
            }
        );
      });

    res.status(200).send(
        {
          "code":0,
          "msg":"success!",
          "records":records
        }
    );
  }
};
