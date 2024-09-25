const employee = require("../models/EmployeeModel")


const EmployeeData = async (req, res) => {

    const { name, email, number, designation, gender, course, imgUpload } = req.body;
    try {
        if (name == "" || email == "" || number == "" || gender == "" || course == "")
            return res.status(404).json({ message: "All field required.......?" })

        let Employee = await employee.findOne({ email })
        if (Employee) return res.json({ message: "User allready Exists...!" })

        Employee = await employee.create({ name, email, number, designation, gender, course, imgUpload })
        return res.json({ message: "User Register Successfully...!", employee })

    } catch (error) {
        console.log(error);
    }

}


const EmployeeGetData = async (req, res) => {
    try {
        let Employee = await employee.find();

        res.send({
            status: 200,
            result: "success",
            message: "Record get success",
            Employee: Employee
        })

    } catch (error) {
        console.log(error);
    }
}


const deleteEmployee = async (req, res) => {
    try {
        let Employee = await employee.deleteOne({ _id: req.params._id })
        res.send({
            status: 200,
            result: "success",
            message: "Record deleted",
            Employee: Employee
        })

    } catch (error) {
        console.error("Error deleting employee:", error);
        return res.status(500).send({
            status: 500,
            result: "error",
            message: "Internal server error",
            error: error.message
        });
    }
}

const updateEmployee = async (req, res) => {
    try {

        let data = await employee.findOne({ _id: req.params._id });
        if (data) {
            console.log("found data", data);
            data.name = req.body.name;
            data.email = req.body.email;
            data.number = req.body.number;
            data.designation = req.body.designation;
            data.gender = req.body.gender;
            data.course = req.body.course;
            data.imgUpload = req.body.imgUpload;

            await data.save();
            res.send({
                status: 200,
                result: "success",
                message: "Record updated Successfully",
                data: data
            })
        } else {
            res.status(404).send({
                status: 404,
                result: "error",
                message: "Record not found"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            result: "error",
            message: "Internal Server Error",
            error: error.message

        })

    }
}

const findbyidemployee= async(req,res)=>{
    try {
let data = await employee.findById(req.params._id);

if(data){
    res.status(200).send({
        result:"success",
        message:"Record found",
        data:data 
    })
}else{
    res.status(404).send({
        status:404,
        result:"error",
        message:"Record not found"
    });
}

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            result: "error",
            message: "Internal Server Error",
            error: error.message
          });
        
    }
}




module.exports = {
    EmployeeData: EmployeeData,
    EmployeeGetData: EmployeeGetData,
    deleteEmployee: deleteEmployee,
    updateEmployee: updateEmployee,
    findbyidemployee:findbyidemployee
}