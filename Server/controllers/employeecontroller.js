const Employee = require('../models/Employee');

// Add employee
module.exports.addEmployee = async (req, res) => {
  try {
    const {
      employeeId,
      fullName,
      email,
      phoneNumber,
      jobTitle,
      department,
      hireDate,
      salary,
      workLocation,
      manager,
      profilePicture,
      notes,
      user,
    } = req.body;

    const employee = await Employee.create({
      employeeId,
      fullName,
      email,
      phoneNumber,
      jobTitle,
      department,
      hireDate,
      salary,
      workLocation,
      manager,
      profilePicture,
      notes,
      user,
    });

    res.status(201).json(employee);
  } catch (error) {
    console.error("Add employee error:", error.message);
    res.status(400).json({ error: "Failed to create employee" });
  }
};

// Update employee
module.exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Update employee error:", error.message);
    res.status(400).json({ error: "Failed to update employee" });
  }
};

// Get single employee
module.exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id });
    res.status(200).json(employee);
  } catch (error) {
    console.error("Get employee failed:", error.message);
    res.status(400).json({ error: "Failed to get employee" });
  }
};

// Get all employees
module.exports.getAllEmployees = async (req, res) => {
  try {
    const allemployees = await Employee.find({});
    res.status(200).json(allemployees);
  } catch (error) {
    console.error("Get all employees failed:", error.message);
    res.status(400).json({ error: "Failed to get all employees" });
  }
};

// Delete employee
module.exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.deleteOne({ _id: req.params.id }); // ✅ Fix: `deleteOne`, not `deleteone`
    res.status(200).json(deletedEmployee);
  } catch (error) {
    console.error("Delete employee failed:", error.message);
    res.status(400).json({ error: "Failed to delete employee" });
  }
};
