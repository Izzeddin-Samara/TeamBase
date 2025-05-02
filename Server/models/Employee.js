const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  jobTitle: { type: String, required: true },
  department: { type: String, required: true },
  hireDate: { type: Date, required: true },
  salary: { type: Number, required: true },
  workLocation: { type: String, required: true },
  manager: { type: String, required: true },
  profilePicture: { type: String, required: true },
  notes: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User",required: true},
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
