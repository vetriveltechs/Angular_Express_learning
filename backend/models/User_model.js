// User_model.js
const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const Users = {

  userExists: async (user_name, password) => {
                try {
                    const query = 'SELECT user_id, password FROM per_user WHERE user_name = ?';
                    const [results] = await pool.query(query, [user_name]);

                    if (results.length > 0) {
                      const user = results[0];

                      const isPasswordValid = await bcrypt.compare(password, user.password);

                      if (isPasswordValid) {
                          return user; // Password is valid
                      }
                  }
                    return null; // User not found or password invalid
                } catch (err) {
                    console.error('Error executing query:', err);
                    throw err;
                }
            },

          create: async (data) => {
            try {
                const password = data.password;
                const queryUser = 'INSERT INTO per_user (user_type,person_id, user_name, password, start_date, end_date) VALUES (?,?, ?, ?, ?, ?)';
                const hashedPassword = bcrypt.hashSync(password, 10);
                const [result] = await pool.query(queryUser, [data.user_type, data.person_id,data.user_name, hashedPassword, data.start_date, data.end_date]);

                // Get the inserted user's ID
                const userId = result.insertId;

                // Insert roles into the per_user_roles table
                const queryRole = 'INSERT INTO per_user_roles (user_id, role_id, role_name, role_status) VALUES ?';
                const roleValues = data.roles.map(role => [userId, role.role_id, role.role_name, role.role_status]);
                await pool.query(queryRole, [roleValues]);

            } catch (err) {
                console.error('Error executing query:', err);
                throw err;
            }
        },

        getAllUsers: async (userName, active_flag) => {
            let query = `
              SELECT user_id, user_type, user_name, password, start_date, end_date, active_flag
              FROM per_user
              WHERE 1=1`;

            const params = [];

            if (userName) {
              query += ` AND user_name LIKE ?`;
              params.push(`%${userName}%`);
            }

            if (active_flag && active_flag !== 'ALL') {
              query += ` AND active_flag = ?`;
              params.push(active_flag);
            }

            const [results] = await pool.query(query, params);
            return results;
          },


          userAlreadyExists: async (user_name) => {
            const query = 'SELECT user_id FROM per_user WHERE user_name = ?';
            const [results] = await pool.query(query, [user_name]);
            return results[0]; // Return the first result or undefined if not found
          },
          // Model: Users.js or similar
          editUsers: async (user_id) => {
            const headerQuery = `
                SELECT
                    user.user_id,
                    user.user_type,
                    user.user_name,
                    user.password,
                    user.start_date,
                    user.end_date
                FROM per_user AS user
                WHERE user.user_id = ?`;

            const [userResults] = await pool.query(headerQuery, [user_id]);

            if (userResults.length === 0) {
                return null; // No user found with the given user_id
            }

            const lineQuery = `
                SELECT
                    roles.role_id,
                    roles.role_name,
                    user_roles.role_status
                FROM per_user_roles AS user_roles
                LEFT JOIN roles ON roles.role_id = user_roles.role_id
                WHERE user_roles.user_id = ?`;

            const [rolesResults] = await pool.query(lineQuery, [user_id]);

            const userData = userResults[0];
            userData.roles = rolesResults; // Add the roles array to the user data

            return userData;
          },

          updateUsers: async (user_id, data) => {
              if (!user_id) {
                  throw new Error('Invalid user_id');
              }

              const query = `
                  UPDATE per_user
                  SET
                      user_name = COALESCE(?, list_name),
                      password = COALESCE(?, password),
                      start_date = COALESCE(?, start_date),
                      end_date = COALESCE(?, end_date)

                  WHERE user_id = ?
              `;

              const [result] = await pool.query(query, [
                  data.list_name,
                  data.password,
                  data.start_date,
                  data.end_date,
                  user_id
              ]);

              return result.affectedRows > 0; // Return true if the update was successful
          },

          updateUsersStatus: async (user_id, data) => {
            if (!user_id) {
                throw new Error('Invalid user_id');
            }

            const query = `
                UPDATE per_user
                SET active_flag = COALESCE(?, active_flag)
                WHERE user_id = ?
            `;

            const [result] = await pool.query(query, [
                data.status,
                user_id
            ]);

            return result.affectedRows > 0; // Return true if the update was successful
        }


};

// Export the User object
module.exports = {Users};
