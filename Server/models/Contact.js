const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(val),
      message: "Please enter a valid email",
    },
  },
  message: {
    type: String,
    required: true,
  }
},
{timestamps: true}
);

module.exports = mongoose.model("Contact", contactSchema)


