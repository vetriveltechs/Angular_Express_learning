const { common_model } = require('../../models/common_model');


// exports.getLov = async (req, res) => {
//   try {
//       const listName = req.params.list_name; // Get the dynamic list_name from the URL
//       const results = await common_model.getLov(listName);
//       res.status(200).json(results); // Return the list of employees as JSON
//   } catch (err) {
//       console.error('Error fetching Lov:', err);
//       return res.status(500).send('Internal Server Error'); // Handle errors
//   }
// };

exports.getLov = async (req, res) => {
    try {
      const listName = req.params.list_name; // Get the dynamic list_name from the URL
      const results = await common_model.getLov(listName);

      let response;

      if (results.length > 0) {
			response = results.map(result => ({
			httpCode: 200,
			list_type_values_id: result.list_type_values_id,
			lov_id: result.lov_id,
			list_code: result.list_code,
			list_value: result.list_value,
			status: 1,
			message: "Common model details"
        }));
      } else {
			response = [{
			httpCode: 200,
			status: 2,
			message: "No data found"
        }];
      }
      res.status(200).json(response);
    } catch (err) {
      console.error('Error fetching Lov:', err);
		res.status(500).json({
			httpCode: 500,
			status: 0,
			message: 'Internal Server Error'
      });
    }
  };


