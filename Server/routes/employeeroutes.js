const express = require('express');
const EmployeeController = require('../controllers/employeecontroller');
const router = express.Router();
const auth = require("../middleware/auth");


router.post('/', auth, EmployeeController.addEmployee);
router.patch('/:id', auth, EmployeeController.updateEmployee);
router.get('/:id', auth, EmployeeController.getEmployee);
router.get('/', auth, EmployeeController.getAllEmployees);
router.delete('/:id', auth, EmployeeController.deleteEmployee);

module.exports = router;
