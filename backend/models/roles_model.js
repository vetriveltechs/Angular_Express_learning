// const pool = require('../config/database');
// const knex = require('../config/knex'); // assuming knex.js is in the same directory

const roles = {
    // create: async (data) => {
    //     const query = 'INSERT INTO roles (role_name, role_description) VALUES (?, ?)';
    //     const [results] = await pool.query(query, [data.role_name, data.role_description]);
    //     return results;
    // },/
    create: async ({ role_name, role_description }) => {
      try {
          await knex('roles').insert({ role_name, role_description });
      } catch (err) {
          console.error('Error inserting role:', err);
          throw err;
      }
  },
    getAllRoles: async () => {
        const query = 'SELECT role_id,role_name, role_description,active_flag FROM roles';
        const [results] = await pool.query(query);
        return results;
    },
    roleAlreadyExists: async (role_name) => {
      const query = 'SELECT role_id FROM roles WHERE role_name = ?';
      const [results] = await pool.query(query, [role_name]);
      return results[0]; // Return the first result or undefined if not found
    },
    editRoles: async (role_id) => {
        const query = 'SELECT role_id,role_name, role_description,active_flag FROM roles WHERE role_id = ?';
        const [results] = await pool.query(query, [role_id]);
        return results.length > 0 ? results[0] : null;
    },

    updateRoles: async (role_id, data) => {
        if (!role_id) {
            throw new Error('Invalid role_id');
        }

        const query = `
            UPDATE roles
            SET
                role_name = COALESCE(?, role_name),
                role_description = COALESCE(?, role_description)
            WHERE role_id = ?
        `;

        const [result] = await pool.query(query, [
            data.role_name,
            data.role_description,
            role_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },

    updateRolesStatus: async (role_id, data) => {
      if (!role_id) {
          throw new Error('Invalid role_id');
      }

      const query = `
          UPDATE roles
          SET active_flag = COALESCE(?, active_flag)
          WHERE role_id = ?
      `;

      const [result] = await pool.query(query, [
          data.status,
          role_id
      ]);

      return result.affectedRows > 0; // Return true if the update was successful
  }
};

module.exports = { roles };
