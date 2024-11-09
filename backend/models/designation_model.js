const pool = require('../config/database');

const designation = {
    createDesignation: async (data) => {
        const query = 'INSERT INTO designations (designation_name,description) VALUES (?,?)';
        const [results] = await pool.query(query, [data.designation_name,data.description]);
        return results;
    },


    getAllDesignations: async (designation_id, active_flag) => {
      let query = `
          SELECT designation_id, designation_name, active_flag FROM designations
          WHERE 1=1`;

      const params = [];

      if (designation_id) {
          query += ` AND designation_id = ?`;
          params.push(designation_id);
      }

      if (active_flag && active_flag !== 'ALL') {
          query += ` AND active_flag = ?`;
          params.push(active_flag);
      }

      const [results] = await pool.query(query, params);
      return results;
  },

    designationAlreadyExists: async (designation_name) => {
      const query = 'SELECT designation_id from designations where 1=1 and designation_name = ?';
      const [results] = await pool.query(query, [designation_name]);
      return results[0]; // Return the first result or undefined if not found
    },
    editDesignation: async (designation_id) => {
        const query = 'SELECT designation_id,designation_name,description from designations where 1=1 and designation_id = ?';
        const [results] = await pool.query(query, [designation_id]);
        return results[0]; // Return the first result or undefined if not found
    },

    updateDesignation: async (designation_id, data) => {
        if (!designation_id) {
            throw new Error('Invalid designation_id');
        }

        const query = `
            update designations
            set
                designation_name = COALESCE(?, designation_name),
                description = COALESCE(?, description)
            where 1=1
            and designation_id = ?
        `;

        const [result] = await pool.query(query, [
            data.designation_name,
            data.description,
            designation_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },

    updateDesignationStatus: async (designation_id, data) => {
      if (!designation_id) {
          throw new Error('Invalid designation_id');
      }

      const query = `
          update designations
            set  active_flag = COALESCE(?, active_flag)
          where 1=1
          and designation_id = ?
      `;

      const [result] = await pool.query(query, [
          data.status,
          designation_id
      ]);

      return result.affectedRows > 0; // Return true if the update was successful
  },
  getDesignationAll: async () => {
    const query = `SELECT designation_id,designation_name from designations
                  where 1=1 and designations.active_flag='${setDefaultActiveFlag()}'`;
    const [results] = await pool.query(query);
    return results; // Return the first result or undefined if not found
},
};

module.exports = { designation };
