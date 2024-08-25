const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  locations: [
    {
      name: { type: String, required: true },
      areas: [
        {
          name: { type: String, required: true },
          sections: [
            {
              name: { type: String, required: true },
            },
          ],
        },
      ],
    },
  ],
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
