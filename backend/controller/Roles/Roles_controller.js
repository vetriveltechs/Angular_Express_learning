const { roles } = require('../../models/roles_model');

exports.createRoles = async (req, res) => {
    const { role_name, role_description } = req.body; // Get data from the request body
    try {
        const existingRole = await roles.roleAlreadyExists(role_name);
        if (existingRole) {
            return res.status(400).json({ message: 'Role already exists.' }); // Send a conflict response
        }

        await roles.create({ role_name, role_description });
        res.status(201).json({ message: 'Role created successfully' }); // Send a success response
    } catch (err) {
        console.error('Error creating role:', err);
        return res.status(500).send('Internal Server Error'); // Handle errors
    }
};

exports.getAllRoles = async (req, res) => {
    try {
        const results = await roles.getAllRoles();
        res.status(200).json(results); // Return the list of lov as JSON
    } catch (err) {
        console.error('Error fetching roles:', err);
        return res.status(500).send('Internal Server Error'); // Handle errors
    }
};

exports.editRoles = async (req, res) => {
  try {
      const { role_id } = req.params;
      const results = await roles.editRoles(role_id);
      if (results) {
          // If a role is found, return it
          res.status(200).json(results);
      } else {
        res.status(404).json({
            http_code: 404,
            message: "No data found"
        });
      }
  } catch (err) {
      console.error('Error fetching role:', err);
      return res.status(500).send('Internal Server Error'); // Handle errors
  }
}
  exports.updateRoles = async (req, res) => {
    try {
        // Extract lov_id from the route parameters
        const { role_id } = req.params;

        // Get updated data from request body
        const { role_name, role_description } = req.body;

        // Check if any fields are provided for update
        if (!role_name && !role_description) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        // Call the updateLov method in the model
        const result = await roles.updateRoles(role_id, {
            role_name,
            role_description
        });

        // Check if the record was updated
        if (!result) {
            return res.status(404).json({ message: 'Role not found' }); // Return a 404 if no record is found
        }

        // Return a success message
        res.status(200).json({ message: 'Role updated successfully' });
    } catch (err) {
        console.error('Error updating Role:', err);
        return res.status(500).json({ message: 'Internal Server Error' }); // Handle errors appropriately
    }
};


exports.updateRolesStatus = async (req, res) => {
  try {
      const { role_id } = req.params;
      const { status } = req.body;

      if (!status) {
          return res.status(400).json({ message: 'No status provided' });
      }

      const result = await roles.updateRolesStatus(role_id, { status });

      if (!result) {
          return res.status(404).json({ message: 'Role not found' });
      }

      res.status(200).json({ message: 'Role status updated successfully' });
  } catch (err) {
      console.error('Error updating role status:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};



