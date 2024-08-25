const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  problems: [
    {
      name: { type: String, required: true },
      categories: [
        {
          name: { type: String, required: true },
          problems: [
            {
              name: { type: String, required: true },
            },
          ],
        },
      ],
    },
  ],
});

const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;
