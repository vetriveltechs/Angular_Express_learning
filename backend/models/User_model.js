// User_model.js
const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const Users = {
            // Check if user exists and passwords match
            userExists: async (user_name, password) => {
                try {
                    const query = 'SELECT user_id, password FROM users WHERE user_name = ?';
                    const [results] = await pool.query(query, [user_name]);

                    if (results.length > 0) {
                        const user = results[0];
                        const isPasswordValid = bcrypt.compareSync(password, user.password);
                        if (isPasswordValid) {
                            return user;
                        }
                    }
                    return null; // User not found or password invalid
                } catch (err) {
                    console.error('Error executing query:', err);
                    throw err;
                }
            },

          // Add a new user
            create: async (data) => {
              try {
                console.log(data);

                  const hashedPassword = bcrypt.hashSync(data.password, 10);
                  const query = 'INSERT INTO users (user_type,user_name,password, start_date, end_date) VALUES (?, ?, ?, ?, ?)';
                  await pool.query(query, [data.user_type,data.user_name, hashedPassword,data.start_date,data.end_date]);
              } catch (err) {
                  console.error('Error executing query:', err);
                  throw err;
              }
          },

          getAllUsers: async () => {
              const query = 'SELECT user_id,user_type,user_name,password, start_date, end_date,active_flag FROM users';
              const [results] = await pool.query(query);
              return results;
          },
          userAlreadyExists: async (user_name) => {
            const query = 'SELECT user_id FROM users WHERE user_name = ?';
            const [results] = await pool.query(query, [user_name]);
            return results[0]; // Return the first result or undefined if not found
          },
          editUsers: async (user_id) => {
              const query = 'SELECT user_id,user_type,user_name,password, start_date, end_date, FROM users WHERE user_id = ?';
              const [results] = await pool.query(query, [user_id]);
              return results[0]; // Return the first result or undefined if not found
          },

          updateUsers: async (user_id, data) => {
              if (!user_id) {
                  throw new Error('Invalid user_id');
              }

              const query = `
                  UPDATE uses
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
                UPDATE users
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
