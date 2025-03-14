const { documentNumbering } = require('../../models/document_numbering_model');

exports.createDocumentNumbering = async (req, res) => {
    const { document_numbering_type}  = req.body;
    const { document_type}            = req.body;
    const { prefix}                   = req.body;
    const { next_number}              = req.body;
    const { suffix}                   = req.body;
    const { from_date}                = req.body;
    const { to_date}                  = req.body;

    console.log(req.body);


    try {
        const existingDocumentNumbering = await documentNumbering.documentNumberingAlreadyExists(document_numbering_type);
        if (existingDocumentNumbering) {
            return res.status(400).json({ message: 'DocumentNumbering already exists.' }); // Send a conflict response
        }

        const result = await documentNumbering.createDocumentNumbering({ document_numbering_type,document_type,prefix,next_number,suffix,from_date,to_date});
        res.status(201).json({ message: 'Document numbering created successfully' ,document_numbering_id: result.document_numbering_id}); // Send a success response
    } catch (err) {
        console.error('Error creating document numbering:', err);
        return res.status(500).send('Internal Server Error'); // Handle errors
    }
};

exports.getAllDocumentNumbering = async (req, res) => {
  try {
      const document_numbering_type   = req.query.document_numbering_type || '';
      const active_flag               = req.query.active_flag || '';

      const results = await documentNumbering.getAllDocumentNumbering(document_numbering_type, active_flag);
      res.status(200).json(results);
  } catch (err) {
      console.error('Error fetching document numbering:', err);
      return res.status(500).send('Internal Server Error');
  }
};


exports.editDocumentNumbering = async (req, res) => {
  try {
      const { document_numbering_id } = req.params;

      const results = await documentNumbering.editDocumentNumbering(document_numbering_id);
      res.status(200).json(results); // Return the list of lov as JSON
  } catch (err) {
      console.error('Error fetching document numbering:', err);
      return res.status(500).send('Internal Server Error'); // Handle errors
  }
}
  exports.updateDocumentNumbering = async (req, res) => {
    try {
        const { document_numbering_id } = req.params;

        const { document_numbering_type}  = req.body;
        const { document_type}            = req.body;
        const { prefix}                   = req.body;
        const { next_number}              = req.body;
        const { suffix}                   = req.body;
        const { from_date}                = req.body;
        const { to_date}                  = req.body;


        if (!document_numbering_type) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        const result = await documentNumbering.updateDocumentNumbering(document_numbering_id, {
          document_numbering_type,
          document_type,
          prefix,
          next_number,
          suffix,
          from_date,
          to_date
        });

        // Check if the record was updated
        if (!result) {
            return res.status(404).json({ message: 'Document numbering not found' }); // Return a 404 if no record is found
        }

        // Return a success message
        res.status(200).json({ message: 'Document numbering updated successfully' });
    } catch (err) {
        console.error('Error updating document numbering:', err);
        return res.status(500).json({ message: 'Internal Server Error' }); // Handle errors appropriately
    }
};


exports.updateDocumentNumberingStatus = async (req, res) => {
  try {
      const { document_numbering_id } = req.params;
      const { status } = req.body;

      if (!status) {
          return res.status(400).json({ message: 'No status provided' });
      }

      const result = await documentNumbering.updateDocumentNumberingStatus(document_numbering_id, { status });

      if (!result) {
          return res.status(404).json({ message: 'Document numbering not found' });
      }

      res.status(200).json({ message: 'document numbering status updated successfully' });
  } catch (err) {
      console.error('Error updating document numbering status:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getDocumentNumberingAll = async (req, res) => {
  try {

      const results = await documentNumbering.getDocumentNumberingAll();

      res.status(200).json(results); // Return the list of lov as JSON
  } catch (err) {
      console.error('Error fetching document numbering:', err);
      return res.status(500).send('Internal Server Error'); // Handle errors
  }
};

