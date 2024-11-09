const { department } = require('../../models/department_model');

exports.createdepartment = async (req, res) => {
    const { department_name} = req.body; // Get data from the request body
    try {
        const existingDepartment = await department.departmentAlreadyExists(department_name);
        if (existingDepartment) {
            return res.status(400).json({ message: 'Department already exists.' }); // Send a conflict response
        }

        await department.createDepartment({ department_name});
        res.status(201).json({ message: 'Department created successfully' }); // Send a success response
    } catch (err) {
        console.error('Error creating department:', err);
        return res.status(500).send('Internal Server Error'); // Handle errors
    }
};

exports.getAllDepartments = async (req, res) => {
    try {
      const department_name   = req.query.department_name || ''; // Get the user_name from query
      const active_flag       = req.query.active_flag || '';
console.log(department_name);

        const results = await department.getAllDepartments(department_name,active_flag);
        res.status(200).json(results); // Return the list of lov as JSON
    } catch (err) {
        console.error('Error fetching department:', err);
        return res.status(500).send('Internal Server Error'); // Handle errors
    }
};

exports.editDepartment = async (req, res) => {
  try {
      const { department_id } = req.params;
      const results = await department.editDepartment(department_id);
      res.status(200).json(results); // Return the list of lov as JSON
  } catch (err) {
      console.error('Error fetching department:', err);
      return res.status(500).send('Internal Server Error'); // Handle errors
  }
}
  exports.updateDepartment = async (req, res) => {
    try {
        const { department_id } = req.params;

        const { department_name} = req.body;

        if (!department_name) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        const result = await department.updateDepartment(department_id, {
            department_name
        });

        // Check if the record was updated
        if (!result) {
            return res.status(404).json({ message: 'Department not found' }); // Return a 404 if no record is found
        }

        // Return a success message
        res.status(200).json({ message: 'Department updated successfully' });
    } catch (err) {
        console.error('Error updating Department:', err);
        return res.status(500).json({ message: 'Internal Server Error' }); // Handle errors appropriately
    }
};


exports.updateDepartmentStatus = async (req, res) => {
  try {
      const { department_id } = req.params;
      const { status } = req.body;

      if (!status) {
          return res.status(400).json({ message: 'No status provided' });
      }

      const result = await department.updateDepartmentStatus(department_id, { status });

      if (!result) {
          return res.status(404).json({ message: 'Department not found' });
      }

      res.status(200).json({ message: 'Department status updated successfully' });
  } catch (err) {
      console.error('Error updating department status:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getDepartmentAll = async (req, res) => {
  try {

      const results = await department.getDepartmentAll();
      res.status(200).json(results); // Return the list of lov as JSON
  } catch (err) {
      console.error('Error fetching department:', err);
      return res.status(500).send('Internal Server Error'); // Handle errors
  }
};

