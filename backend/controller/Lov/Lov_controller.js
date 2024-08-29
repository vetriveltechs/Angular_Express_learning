const { lov } = require('../../models/lov_model');

exports.createLov = async (req, res) => {
    const { list_name, from_date, to_date, list_description } = req.body; // Get data from the request body
    try {
        const existingLov = await lov.lovAlreadyExists(list_name);
        if (existingLov) {
            return res.status(400).json({ message: 'Lov already exists.' }); // Send a conflict response
        }

        await lov.create({ list_name, from_date, to_date, list_description });
        res.status(201).json({ message: 'Lov created successfully' }); // Send a success response
    } catch (err) {
        console.error('Error creating lov:', err);
        return res.status(500).send('Internal Server Error'); // Handle errors
    }
};

exports.getAllLov = async (req, res) => {
    try {
        const results = await lov.getAll();
        res.status(200).json(results); // Return the list of lov as JSON
    } catch (err) {
        console.error('Error fetching lov:', err);
        return res.status(500).send('Internal Server Error'); // Handle errors
    }
};

exports.editLov = async (req, res) => {
  try {
      const { lov_id } = req.params;
      const results = await lov.editLov(lov_id);
      res.status(200).json(results); // Return the list of lov as JSON
  } catch (err) {
      console.error('Error fetching lov:', err);
      return res.status(500).send('Internal Server Error'); // Handle errors
  }
}
  exports.updateLov = async (req, res) => {
    try {
        // Extract lov_id from the route parameters
        const { lov_id } = req.params;

        // Get updated data from request body
        const { list_name, from_date, to_date, list_description } = req.body;

        // Check if any fields are provided for update
        if (!list_name && !from_date && !to_date && !list_description) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        // Call the updateLov method in the model
        const result = await lov.updateLov(lov_id, {
            list_name,
            from_date,
            to_date,
            list_description
        });

        // Check if the record was updated
        if (!result) {
            return res.status(404).json({ message: 'LOV not found' }); // Return a 404 if no record is found
        }

        // Return a success message
        res.status(200).json({ message: 'LOV updated successfully' });
    } catch (err) {
        console.error('Error updating LOV:', err);
        return res.status(500).json({ message: 'Internal Server Error' }); // Handle errors appropriately
    }
};


exports.updateLovStatus = async (req, res) => {
  try {
      const { lov_id } = req.params;
      const { status } = req.body;

      if (!status) {
          return res.status(400).json({ message: 'No status provided' });
      }

      const result = await lov.updateLovStatus(lov_id, { status });

      if (!result) {
          return res.status(404).json({ message: 'LOV not found' });
      }

      res.status(200).json({ message: 'LOV status updated successfully' });
  } catch (err) {
      console.error('Error updating LOV status:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  const { user_name, password } = req.body;

  try {
      const user = await authenticateUser(user_name, password);
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });

      const token = generateToken({ userId: user.user_name });
      res.json({ token });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

