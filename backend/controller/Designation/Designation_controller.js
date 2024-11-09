const { designation } = require('../../models/designation_model');

exports.createDesignation = async (req, res) => {
    const { designation_name} = req.body; // Get data from the request body
    const { description} = req.body; // Get data from the request body
    try {
        const existingDesignation = await designation.designationAlreadyExists(designation_name);
        if (existingDesignation) {
            return res.status(400).json({ message: 'Designation already exists.' }); // Send a conflict response
        }

        await designation.createDesignation({ designation_name,description});
        res.status(201).json({ message: 'Designation created successfully' }); // Send a success response
    } catch (err) {
        console.error('Error creating designation:', err);
        return res.status(500).send('Internal Server Error'); // Handle errors
    }
};

exports.getAllDesignations = async (req, res) => {
  try {
      const designation_id  = req.query.designation_id || '';
      const active_flag     = req.query.active_flag || '';

      const results = await designation.getAllDesignations(designation_id, active_flag);
      res.status(200).json(results);
  } catch (err) {
      console.error('Error fetching designations:', err);
      return res.status(500).send('Internal Server Error');
  }
};


exports.editDesignation = async (req, res) => {
  try {
      const { designation_id } = req.params;
      const results = await designation.editDesignation(designation_id);
      res.status(200).json(results); // Return the list of lov as JSON
  } catch (err) {
      console.error('Error fetching designation:', err);
      return res.status(500).send('Internal Server Error'); // Handle errors
  }
}
  exports.updateDesignation = async (req, res) => {
    try {
        const { designation_id } = req.params;

        const { designation_name} = req.body;

        const { description}      = req.body;

        console.log(req.body);

        if (!designation_name) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        const result = await designation.updateDesignation(designation_id, {
            designation_name,
            description,
        });

        // Check if the record was updated
        if (!result) {
            return res.status(404).json({ message: 'Designation not found' }); // Return a 404 if no record is found
        }

        // Return a success message
        res.status(200).json({ message: 'Designation updated successfully' });
    } catch (err) {
        console.error('Error updating Designation:', err);
        return res.status(500).json({ message: 'Internal Server Error' }); // Handle errors appropriately
    }
};


exports.updateDesignationStatus = async (req, res) => {
  try {
      const { designation_id } = req.params;
      const { status } = req.body;

      if (!status) {
          return res.status(400).json({ message: 'No status provided' });
      }

      const result = await designation.updateDesignationStatus(designation_id, { status });

      if (!result) {
          return res.status(404).json({ message: 'Designation not found' });
      }

      res.status(200).json({ message: 'Designation status updated successfully' });
  } catch (err) {
      console.error('Error updating designation status:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getDesignationAll = async (req, res) => {
  try {

      const results = await designation.getDesignationAll();
      res.status(200).json(results); // Return the list of lov as JSON
  } catch (err) {
      console.error('Error fetching designation:', err);
      return res.status(500).send('Internal Server Error'); // Handle errors
  }
};

