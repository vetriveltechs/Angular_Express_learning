const pool = require('../config/database');

const documentNumbering = {
  // Backend (Node.js)
      createDocumentNumbering: async (data) => {
        const query = 'INSERT INTO doc_document_numbering (document_numbering_type, document_type, prefix, next_number, suffix, from_date, to_date) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await pool.query(query, [
            data.document_numbering_type,
            data.document_type,
            data.prefix,
            data.next_number,
            data.suffix,
            data.from_date,
            data.to_date,
        ]);
        return { document_numbering_id: result.insertId };
      },



    getAllDocumentNumbering: async (document_numbering_type, active_flag) => {
      let query = `
          SELECT document_numbering_id,document_numbering_type,document_type,prefix,next_number,suffix, active_flag FROM doc_document_numbering
          WHERE 1=1`;

      const params = [];

      if (document_numbering_type) {
        query += ` and document_numbering_type LIKE ?`;
        params.push(`%${document_numbering_type}%`);
      }

      if (active_flag && active_flag !== 'ALL') {
          query += ` AND active_flag = ?`;
          params.push(active_flag);
      }

      const [results] = await pool.query(query, params);
      return results;
  },

    documentNumberingAlreadyExists: async (document_numbering_type) => {
      const query = 'SELECT document_numbering_id from doc_document_numbering where 1=1 and document_numbering_type = ?';
      const [results] = await pool.query(query, [document_numbering_type]);
      return results[0]; // Return the first result or undefined if not found
    },
    editDocumentNumbering: async (document_numbering_id) => {
        const query = `SELECT doc_document_numbering.document_numbering_id,doc_document_numbering.document_numbering_type,doc_document_numbering.document_type,doc_document_numbering.prefix,doc_document_numbering.next_number,doc_document_numbering.suffix,doc_document_numbering.from_date,doc_document_numbering.to_date, doc_document_numbering.active_flag, list_values.list_code, list_values.list_value from doc_document_numbering
        left join list_type_values AS list_values on list_values.list_code=doc_document_numbering.document_numbering_type
        where 1=1 and document_numbering_id = ?`;
        const [results] = await pool.query(query, [document_numbering_id]);
        return results[0]; // Return the first result or undefined if not found
    },

    updateDocumentNumbering: async (document_numbering_id, data) => {
        if (!document_numbering_id) {
            throw new Error('Invalid document_numbering_id');
        }

        const query = `
            update doc_document_numbering
            set
                document_numbering_type = COALESCE(?, document_numbering_type),
                document_type = COALESCE(?, document_type),
                prefix        = COALESCE(?, prefix),
                next_number   = COALESCE(?, next_number),
                suffix        = COALESCE(?, suffix),
                from_date = COALESCE(?, from_date),
                to_date = COALESCE(?, to_date)
            where 1=1
            and document_numbering_id = ?
        `;

        const [result] = await pool.query(query, [
            data.document_numbering_type,
            data.document_type,
            data.prefix,
            data.next_number,
            data.suffix,
            data.from_date,
            data.to_date,
            document_numbering_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },

    updateDocumentNumberingStatus: async (document_numbering_id, data) => {
      if (!document_numbering_id) {
          throw new Error('Invalid document_numbering_id');
      }

      const query = `
          update doc_document_numbering
            set  active_flag = COALESCE(?, active_flag)
          where 1=1
          and document_numbering_id = ?
      `;

      const [result] = await pool.query(query, [
          data.status,
          document_numbering_id
      ]);

      return result.affectedRows > 0; // Return true if the update was successful
  },
  getDocumentNumberingAll: async () => {
    const query = `SELECT document_numbering_id,document_numbering_type,list_values.list_code,list_values.list_value from doc_document_numbering
                  left join list_type_values AS list_values on list_values.list_code=doc_document_numbering.document_numbering_type
                  where 1=1 and doc_document_numbering.active_flag='${setDefaultActiveFlag()}'`;
    const [results] = await pool.query(query);
    return results; // Return the first result or undefined if not found
},


};

module.exports = { documentNumbering };
