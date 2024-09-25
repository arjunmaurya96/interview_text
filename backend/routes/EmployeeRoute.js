const { EmployeeData, EmployeeGetData, deleteEmployee, updateEmployee, findbyidemployee } = require("../controllers/EmployeeController");
// const ensureAuthenticated = require("../middleware/Auth");

const Emprouter = require("express").Router();


Emprouter.post("/employee", EmployeeData)
Emprouter.get("/empget", EmployeeGetData)
Emprouter.delete("/empdelete/:_id" , deleteEmployee)
Emprouter.put("/updateemp/:_id", updateEmployee)
Emprouter.get("/findbyidemp/:_id", findbyidemployee)

module.exports = Emprouter;