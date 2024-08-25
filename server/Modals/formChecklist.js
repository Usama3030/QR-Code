const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formChecklistSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  problem: {
    name: { type: String, required: true },
    category: {
      name: { type: String, required: true },
      problem: {
        name: { type: String, required: true },
      },
    },
  },
  location: {
    name: { type: String, required: true },
    area: {
      name: { type: String, required: true },
      section: {
        name: { type: String, required: true },
      },
    },
  },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  Status: { type: String },
});

const formChecklistModel = mongoose.model("formChecklist", formChecklistSchema);

module.exports = formChecklistModel;
