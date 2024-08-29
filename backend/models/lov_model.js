const pool = require('../config/database');

const lov = {
    create: async (data) => {
        const query = 'INSERT INTO lov (list_name, from_date, to_date, list_description) VALUES (?, ?, ?, ?)';
        const [results] = await pool.query(query, [data.list_name, data.from_date, data.to_date, data.list_description]);
        return results;
    },
    getAll: async () => {
        const query = 'SELECT lov_id,list_name, from_date, to_date, list_description,active_flag FROM lov';
        const [results] = await pool.query(query);
        return results;
    },
    lovAlreadyExists: async (list_name) => {
      const query = 'SELECT lov_id FROM lov WHERE list_name = ?';
      const [results] = await pool.query(query, [list_name]);
      return results[0]; // Return the first result or undefined if not found
    },
    editLov: async (lov_id) => {
        const query = 'SELECT lov_id,list_name, from_date, to_date, list_description FROM lov WHERE lov_id = ?';
        const [results] = await pool.query(query, [lov_id]);
        return results[0]; // Return the first result or undefined if not found
    },

    updateLov: async (lov_id, data) => {
        if (!lov_id) {
            throw new Error('Invalid lov_id');
        }

        const query = `
            UPDATE lov
            SET
                list_name = COALESCE(?, list_name),
                from_date = COALESCE(?, from_date),
                to_date = COALESCE(?, to_date),
                list_description = COALESCE(?, list_description)
            WHERE lov_id = ?
        `;

        const [result] = await pool.query(query, [
            data.list_name,
            data.from_date,
            data.to_date,
            data.list_description,
            lov_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },

    updateLovStatus: async (lov_id, data) => {
      if (!lov_id) {
          throw new Error('Invalid lov_id');
      }

      const query = `
          UPDATE lov
          SET active_flag = COALESCE(?, active_flag)
          WHERE lov_id = ?
      `;

      const [result] = await pool.query(query, [
          data.status,
          lov_id
      ]);

      return result.affectedRows > 0; // Return true if the update was successful
  }
};

module.exports = { lov };
