const pool = require('../config/database');

const department = {
    createDepartment: async (data) => {
        const query = 'INSERT INTO departments (department_name) VALUES (?)';
        const [results] = await pool.query(query, [data.department_name]);
        return results;
    },


    getAllDepartments: async (department_name, active_flag) => {
      let query = `
        select department_id,department_name,active_flag from departments
        where 1=1`;

      const params = [];

      if (department_name) {
        query += ` and department_name LIKE ?`;
        params.push(`%${department_name}%`);
      }

      if (active_flag && active_flag !== 'ALL') {
        query += ` and active_flag = ?`;
        params.push(active_flag);
      }

      const [results] = await pool.query(query, params);
      return results;
    },


    departmentAlreadyExists: async (department_name) => {
      const query = 'SELECT department_id from departments where 1=1 and department_name = ?';
      const [results] = await pool.query(query, [department_name]);
      return results[0]; // Return the first result or undefined if not found
    },
    editDepartment: async (department_id) => {
        const query = 'SELECT department_id,department_name from departments where 1=1 and department_id = ?';
        const [results] = await pool.query(query, [department_id]);
        return results[0]; // Return the first result or undefined if not found
    },

    updateDepartment: async (department_id, data) => {
        if (!department_id) {
            throw new Error('Invalid department_id');
        }

        const query = `
            update departments
            set
                department_name = COALESCE(?, department_name)
            where 1=1
            and department_id = ?
        `;

        const [result] = await pool.query(query, [
            data.department_name,
            department_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },

    updateDepartmentStatus: async (department_id, data) => {
      if (!department_id) {
          throw new Error('Invalid department_id');
      }

      const query = `
          update departments
            set  active_flag = COALESCE(?, active_flag)
          where 1=1
          and department_id = ?
      `;

      const [result] = await pool.query(query, [
          data.status,
          department_id
      ]);

      return result.affectedRows > 0; // Return true if the update was successful
  },
  getDepartmentAll: async () => {
    const query = `SELECT department_id,department_name from departments
                  where 1=1 and departments.active_flag='${setDefaultActiveFlag()}'`;
    const [results] = await pool.query(query);
    return results; // Return the first result or undefined if not found
},
};

module.exports = { department };
