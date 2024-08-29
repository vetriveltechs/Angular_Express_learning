const { authenticateUser } = require('../../middleware/authMiddleware');
const { Users } = require('../../models/User_model');

// Login route
exports.login = async (req, res) => {
    res.json({ token: req.token });
};

exports.createUser = async (req, res) => {
  const { user_type,user_name, password,start_date,end_date } = req.body; // Get data from the request body
  try {
      const existingUsers = await Users.userAlreadyExists(user_name);
      if (existingUsers) {
          return res.status(400).json({ message: 'User already exists.' }); // Send a conflict response
      }

      await Users.create({ user_type,user_name, password,start_date,end_date });
      res.status(201).json({ message: 'User created successfully' }); // Send a success response
  } catch (err) {
      console.error('Error creating user:', err);
      return res.status(500).send('Internal Server Error'); // Handle errors
  }
};

exports.getAllUsers = async (req, res) => {
  try {
      const results = await Users.getAllUsers();
      res.status(200).json(results); // Return the list of lov as JSON
  } catch (err) {
      console.error('Error fetching user:', err);
      return res.status(500).send('Internal Server Error'); // Handle errors
  }
};

exports.editUsers = async (req, res) => {
try {
    const { user_id } = req.params;
    const results = await Users.editUsers(user_id);
    res.status(200).json(results); // Return the list of lov as JSON
} catch (err) {
    console.error('Error fetching user:', err);
    return res.status(500).send('Internal Server Error'); // Handle errors
}
}
exports.updateUsers = async (req, res) => {
  try {
      // Extract lov_id from the route parameters
      const { user_id } = req.params;

      // Get updated data from request body
      const { user_type,user_name, password,start_date,end_date } = req.body;

      // Check if any fields are provided for update
      if (!user_type && !user_name && !password && !start_date && !end_date) {
          return res.status(400).json({ message: 'No fields to update' });
      }

      // Call the updateLov method in the model
      const result = await lov.updateLov(user_id, {
        user_type,user_name, password,start_date,end_date
      });

      // Check if the record was updated
      if (!result) {
          return res.status(404).json({ message: 'User not found' }); // Return a 404 if no record is found
      }

      // Return a success message
      res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ message: 'Internal Server Error' }); // Handle errors appropriately
  }
};


exports.updateUsersStatus = async (req, res) => {
try {
    const { user_id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'No status provided' });
    }

    const result = await lov.updateUsersStatus(lov_id, { status });

    if (!result) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User status updated successfully' });
} catch (err) {
    console.error('Error updating user status:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
}
};


