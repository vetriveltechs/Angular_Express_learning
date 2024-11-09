// const products_model = require('../../models/Products_model')

// exports.getProductList=async(req,res,next)=>{
//     const products=await products_model.find({})

//     res.json({
//         success:true,
//         message:"Get Products Is Working",
//         products
//     })
// }

// exports.getProductAll=async(req,res,next)=>{
//     const query = req.query.keyword ?
//             { product_name: { $regex: req.query.keyword, $options: 'i' } } :
//             {};


//     const product = await products_model.find(query)
//     res.json({
//         succes:true,
//         message:"Product Router Working",
//         product
// })
// }



const { Employee } = require('../../models/employee_model');

exports.createEmployee = async (req, res) => {
    const {
      employee_type, first_name, middle_name,last_name,mobile_number,alt_mobile_number,email,alt_email,father_name,mother_name, date_of_birth,gender,blood_group,
      department_id,designation_id,date_of_joining,date_of_relieving,previous_experience,rate_per_hour,rate_per_day,pay_frequency,
      aadhar_number,pan_number, driving_licence, passport_number, passport_issue_date, passport_expiry_date,pf_number, esi_number, uan_number,
      address_1,address_2,address_3,postal_code,
      account_number,account_holder_number,bank_name,branch_name,ifsc_code,micr_code,address
        } = req.body;

    try {
        // Check if the employee already exists
        const existingEmployee = await Employee.userAlreadyExists(first_name,mobile_number);
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee with this username already exists.' });
        }

        // Create a new employee
        await Employee.create({
            employee_type, first_name, middle_name,last_name,mobile_number,alt_mobile_number,email,alt_email,father_name,mother_name, date_of_birth,gender,blood_group,
            department_id,designation_id,date_of_joining,date_of_relieving,previous_experience,rate_per_hour,rate_per_day,pay_frequency,
            aadhar_number,pan_number, driving_licence, passport_number, passport_issue_date, passport_expiry_date,pf_number, esi_number, uan_number,
            address_1,address_2,address_3,postal_code,
            account_number,account_holder_number,bank_name,branch_name,ifsc_code,micr_code,address
        });

        res.status(201).json({ message: 'Employee created successfully' });
    } catch (err) {
        console.error('Error creating employee:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const results = await Employee.getAllEmployees();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching employees:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

exports.getEmployees = async (req, res) => {
  try {
      const { employee_id } = req.params;


      const results = await Employee.getEmployees(employee_id);
      res.status(200).json(results);
  } catch (err) {
      console.error('Error fetching employees:', err);
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};
exports.getEmployeeDetails = async (req, res) => {
  try {
      const { employee_id } = req.params;


      const results = await Employee.getEmployeeDetails(employee_id);
      res.status(200).json(results);
  } catch (err) {
      console.error('Error fetching employees:', err);
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

exports.updateEmployeeStatus = async (req, res) => {
  try {
      const { employee_id } = req.params;
      const { status } = req.body;

      if (!status) {
          return res.status(400).json({ message: 'No status provided' });
      }

      const result = await Employee.updateEmployeeStatus(employee_id, { status });

      if (!result) {
          return res.status(404).json({ message: 'Employee Status not found' });
      }

      res.status(200).json({ message: 'Employee status updated successfully' });
  } catch (err) {
      console.error('Error updating Employee status:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};


