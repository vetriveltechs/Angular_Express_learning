const { blood_group } = require('../../models/blood_group_model');

exports.createBloodGroup = async (req, res) => {
    const { blood_group_name} = req.body; // Get data from the request body
    try {
        const existingBloodGroup = await blood_group.bloodGroupAlreadyExists(blood_group_name);
        if (existingBloodGroup) {
            return res.status(400).json({ message: 'Blood group already exists.' }); // Send a conflict response
        }

        await blood_group.createBloodGroup({ blood_group_name});
        res.status(201).json({ message: 'Blood group created successfully' }); // Send a success response
    } catch (err) {
        console.error('Error creating blood group:', err);
        return res.status(500).send('Internal Server Error'); // Handle errors
    }
};

exports.getAllBloodGroups = async (req, res) => {
    try {
      const blood_group_name  = req.query.blood_group_name || ''; // Get the user_name from query
      const active_flag       = req.query.active_flag || '';

        const results = await blood_group.getAllBloodGroups(blood_group_name,active_flag);
        res.status(200).json(results); // Return the list of lov as JSON
    } catch (err) {
        console.error('Error fetching blood_group:', err);
        return res.status(500).send('Internal Server Error'); // Handle errors
    }
};

exports.editBloodGroup = async (req, res) => {
  try {
      const { blood_group_id } = req.params;
      const results = await blood_group.editBloodGroup(blood_group_id);
      res.status(200).json(results); // Return the list of lov as JSON
  } catch (err) {
      console.error('Error fetching blood group:', err);
      return res.status(500).send('Internal Server Error'); // Handle errors
  }
}
  exports.updateBloodGroup = async (req, res) => {
    try {
        const { blood_group_id } = req.params;

        const { blood_group_name} = req.body;

        if (!blood_group_name) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        const result = await blood_group.updateBloodGroup(blood_group_id, {
          blood_group_name
        });

        // Check if the record was updated
        if (!result) {
            return res.status(404).json({ message: 'blood group not found' }); // Return a 404 if no record is found
        }

        // Return a success message
        res.status(200).json({ message: 'Blood group updated successfully' });
    } catch (err) {
        console.error('Error updating blood group:', err);
        return res.status(500).json({ message: 'Internal Server Error' }); // Handle errors appropriately
    }
};


exports.updateBloodGroupStatus = async (req, res) => {
  try {
      const { blood_group_id } = req.params;
      const { status } = req.body;

      if (!status) {
          return res.status(400).json({ message: 'No status provided' });
      }

      const result = await blood_group.updateBloodGroupStatus(blood_group_id, { status });

      if (!result) {
          return res.status(404).json({ message: 'Blood group not found' });
      }

      res.status(200).json({ message: 'Blood group status updated successfully' });
  } catch (err) {
      console.error('Error updating blood group status:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getBloodGroupAll = async (req, res) => {
  try {

      const results = await blood_group.getBloodGroupAll();
      res.status(200).json(results); // Return the list of lov as JSON
  } catch (err) {
      console.error('Error fetching blood group:', err);
      return res.status(500).send('Internal Server Error'); // Handle errors
  }
};
