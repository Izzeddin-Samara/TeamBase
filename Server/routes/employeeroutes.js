const express = require('express');
const EmployeeController = require('../controllers/employeecontroller');
const router = express.Router();

router.post('/', EmployeeController.addEmployee);
router.patch('/:id', EmployeeController.updateEmployee);
router.get('/:id', EmployeeController.getEmployee);
router.get('/', EmployeeController.getAllEmployees);
router.delete('/:id', EmployeeController.deleteEmployee);

module.exports = router;
