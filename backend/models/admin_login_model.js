const pool = require('../config/database');
const bcrypt = require('bcrypt');

const admin_login = {
  userExists: async (user_name) => {
    try {
      const query = 'SELECT user_id,person_id, user_name,password FROM per_user WHERE user_name = ?';
      const [results] = await pool.query(query, [user_name]);

      if (results.length > 0) {
        return results[0];  // Return the user object
      }
      return null;  // User not found
    } catch (err) {
      console.error('Error executing query:', err);
      throw err;
    }
  },

  getUserRoles: async (user_id) => {
    try {
      const query = `SELECT user_roles.role_id,user_roles.role_name FROM per_user_roles as user_roles
      left join roles on roles.role_id=user_roles.role_id
       WHERE 1=1
       and user_roles.user_id = ?
       and user_roles.active_flag='Y'`;
      const [results] = await pool.query(query, [user_id]);

      return results;  // Return user roles as an array
    } catch (err) {
      console.error('Error fetching user roles:', err);
      throw err;
    }
  }
};

module.exports = { admin_login };
