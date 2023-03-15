const mongoose = require("mongoose");
const confiSchema = mongoose.Schema({
  percentage: {
    type: Number,
  },
});

module.exports = mongoose.model("configrations", confiSchema);
