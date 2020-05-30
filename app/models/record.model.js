module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      createdAt: Date,
      counts: Array,
      key: String
    }
  );

  const Record = mongoose.model("Record", schema, "records");
  return Record;
};
