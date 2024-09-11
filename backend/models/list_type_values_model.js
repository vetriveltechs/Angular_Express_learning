const { Console } = require('console');
const pool = require('../config/database');

const list_type_values = {
    create: async (data) => {
        const query = 'INSERT INTO list_type_values (lov_id,list_code, list_value, order_sequence, short_description, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?,?)';
        const [results] = await pool.query(query, [data.lov_id,data.list_code, data.list_value, data.order_sequence, data.short_description,data.start_date,data.end_date]);
        return results;
    },

    getAllByLovId: async (lovId) => {
      const query =`SELECT list_type_values_id, lov_id, list_code, list_value, order_sequence, active_flag
                      FROM list_type_values
                      WHERE 1=1 AND lov_id = ?
                      ORDER BY order_sequence`;

      const [results] = await pool.query(query, [lovId]);
      return results;
    },

    updateListTypeValues: async (list_type_values_id, data) => {
        if (!list_type_values_id) {
            throw new Error('Invalid list_type_values_id');
        }

        const query = `
            UPDATE list_type_values
            SET
                list_code         = COALESCE(?, list_code),
                list_value        = COALESCE(?, list_value),
                order_sequence    = COALESCE(?, order_sequence),
                short_description = COALESCE(?, short_description),
                start_date        = COALESCE(?, start_date),
                end_date          = COALESCE(?, end_date)
            WHERE list_type_values_id = ?
        `;

        const [result] = await pool.query(query, [
            data.list_code,
            data.list_value,
            data.order_sequence,
            data.short_description,
            data.start_date,
            data.end_date,
            list_type_values_id
        ]);
        return result.affectedRows > 0; // Return true if the update was successful
    },


    updateListValuesStatus: async (list_type_values_id, data) => {
        if (!list_type_values_id) {
            throw new Error('Invalid list_type_values_id');
        }

        if (!data.status) {
            throw new Error('Invalid status value');
        }

        const query = `
            UPDATE list_type_values
            SET active_flag = COALESCE(?, active_flag)
            WHERE list_type_values_id = ?
        `;

        const [result] = await pool.query(query, [
            data.status,
            list_type_values_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },

    listTypeValuesAlreadyExists: async (list_code) => {
      const query = 'SELECT list_type_values_id FROM list_type_values WHERE list_code = ?';
      const [results] = await pool.query(query, [list_code]);
      return results[0]; // Return the first result or undefined if not found
    }
};

module.exports = { list_type_values };

