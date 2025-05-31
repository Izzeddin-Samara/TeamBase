const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    jobTitle: { type: String, required: true },
    department: { type: String, required: true },
    hireDate: { type: Date }, 
    salary: { type: Number },
    manager: { type: String },
    notes: { type: String }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
