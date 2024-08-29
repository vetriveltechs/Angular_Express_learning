const { list_type_values } = require('../../models/list_type_values_model');

exports.createListTypeValues = async (req, res) => {
    const { lov_id, list_code, list_value, order_sequence, short_description, start_date, end_date } = req.body;

    try {
        const existingListTypeValues = await list_type_values.listTypeValuesAlreadyExists(list_code);
        if (existingListTypeValues) {
            return res.status(400).json({ message: 'List type value already exists.' });
        }

        await list_type_values.create({ lov_id,list_code, list_value, order_sequence, short_description, start_date, end_date });
        res.status(201).json({ message: 'List type value created successfully' }); // Send a success response
    } catch (err) {
        console.error('Error creating list type value:', err);
        return res.status(500).send('Internal Server Error'); // Handle errors
    }
};

exports.getAllByLovId = async (req, res) => {
  try {
      const { lov_id } = req.params;
      const results = await list_type_values.getAllByLovId(lov_id);
      res.status(200).json(results); // Return the list of lov as JSON
  } catch (err) {
      console.error('Error fetching lov:', err);
      return res.status(500).send('Internal Server Error'); // Handle errors
  }

};

exports.updateListValuesStatus = async (req, res) => {
  try {
      const { list_type_values_id } = req.params;
      const { status } = req.body;

      if (!status) {
          return res.status(400).json({ message: 'No status provided' });
      }

      const result = await list_type_values.updateListValuesStatus(list_type_values_id, { status });

      if (!result) {
          return res.status(404).json({ message: 'List type values not found' });
      }

      res.status(200).json({ message: 'List type values status updated successfully' });
  } catch (err) {
      console.error('Error updating List type values status:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.updateListValues = async (req, res) => {

  try {

      const { list_type_values_id } = req.params;

      console.log('Received request to update list type values for ID:', list_type_values_id);

      // Get updated data from request body
      const { list_code, list_value, order_sequence, short_description, start_date, end_date } = req.body;

      // Check if any fields are provided for update
      if (!list_code && !list_value && !order_sequence && !short_description && !start_date && !end_date) {
          return res.status(400).json({ message: 'No fields to update' });
      }

      // Call the updateLov method in the model
      const result = await list_type_values.updateListTypeValues(list_type_values_id, {
          list_code,
          list_value,
          order_sequence,
          short_description,
          start_date,
          end_date
      });

      // Check if the record was updated
      if (!result) {
          return res.status(404).json({ message: 'List type values not found' }); // Return a 404 if no record is found
      }

      // Return a success message
      res.status(200).json({ message: 'List type values updated successfully' });
  } catch (err) {
      console.error('Error updating List type values:', err);
      return res.status(500).json({ message: 'Internal Server Error' }); // Handle errors appropriately
  }
};

