const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
  },
});

module.exports = mongoose.model("Forms", formSchema);
