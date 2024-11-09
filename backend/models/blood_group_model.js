const pool = require('../config/database');

const blood_group = {
    createBloodGroup: async (data) => {
        const query = 'INSERT INTO  blood_group (blood_group_name) VALUES (?)';
        const [results] = await pool.query(query, [data.blood_group_name]);
        return results;
    },

    getAllBloodGroups: async (blood_group_name, active_flag) => {
      let query = `
        select blood_group_id,blood_group_name,active_flag from blood_group
        where 1=1`;

      const params = [];

      if (blood_group_name) {
        query += ` and blood_group_name LIKE ?`;
        params.push(`%${blood_group_name}%`);
      }

      if (active_flag && active_flag !== 'ALL') {
        query += ` and active_flag = ?`;
        params.push(active_flag);
      }

      const [results] = await pool.query(query, params);
      return results;
    },


    bloodGroupAlreadyExists: async (blood_group_name) => {
      const query = 'SELECT blood_group_id from blood_group where 1=1 and blood_group_name = ?';
      const [results] = await pool.query(query, [blood_group_name]);
      return results[0]; // Return the first result or undefined if not found
    },
    editBloodGroup: async (blood_group_id) => {
        const query = 'SELECT blood_group_id,blood_group_name from blood_group where 1=1 and blood_group_id = ?';
        const [results] = await pool.query(query, [blood_group_id]);
        return results[0]; // Return the first result or undefined if not found
    },

    updateBloodGroup: async (blood_group_id, data) => {
        if (!blood_group_id) {
            throw new Error('Invalid blood_group_id');
        }

        const query = `
            update blood_group
            set
                blood_group_name = COALESCE(?, blood_group_name)
            where 1=1
            and blood_group_id = ?
        `;

        const [result] = await pool.query(query, [
            data.blood_group_name,
            blood_group_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },

    updateBloodGroupStatus: async (blood_group_id, data) => {
      if (!blood_group_id) {
          throw new Error('Invalid blood_group_id');
      }

      const query = `
          update blood_group
            set  active_flag = COALESCE(?, active_flag)
          where 1=1
          and blood_group_id = ?
      `;

      const [result] = await pool.query(query, [
          data.status,
          blood_group_id
      ]);

      return result.affectedRows > 0; // Return true if the update was successful
  },

  getBloodGroupAll: async () => {
    const query = `SELECT blood_group_id,blood_group_name from blood_group where 1=1 and blood_group.active_flag='${setDefaultActiveFlag()}'`;
    const [results] = await pool.query(query);
    return results; // Return the first result or undefined if not found
},
};

module.exports = { blood_group };
