const pool = require('../config/database');

const Employee = {
    create: async (data) => {
        try {
          const query = `INSERT INTO per_people_all
                        (employee_type,
                        first_name,
                        middle_name,
                        last_name,
                        mobile_number,
                        alt_mobile_number,
                        email,
                        alt_email,
                        father_name,
                        mother_name,
                        date_of_birth,
                        gender,
                        blood_group,
                        department,
                        date_of_joining,
                        date_of_relieving,
                        previous_experience,
                        rate_per_hour,
                        rate_per_day,
                        pay_frequency,
                        aadhar_number,
                        pan_number,
                        driving_licence,
                        passport_number,
                        passport_issue_date,
                        passport_expiry_date,
                        pf_number,
                        esi_number,
                        uan_number,
                        address_1,
                        address_2,
                        address_3,
                        postal_code,
                        account_number,
                        account_holder_number,
                        bank_name,
                        branch_name,
                        ifsc_code,
                        micr_code,
                        address)
                    VALUES
                        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
          const [results] = await pool.query(query, [
              data.employee_type, data.first_name, data.middle_name, data.last_name,
              data.mobile_number, data.alt_mobile_number, data.email, data.alt_email,
              data.father_name, data.mother_name, data.date_of_birth, data.gender,
              data.blood_group, data.department, data.date_of_joining, data.date_of_relieving,
              data.previous_experience, data.rate_per_hour, data.rate_per_day, data.pay_frequency,
              data.aadhar_number, data.pan_number, data.driving_licence, data.passport_number,
              data.passport_issue_date, data.passport_expiry_date, data.pf_number, data.esi_number,
              data.uan_number, data.address_1, data.address_2, data.address_3, data.postal_code,
              data.account_number, data.account_holder_number, data.bank_name, data.branch_name,
              data.ifsc_code,data.micr_code,data.address

          ])

            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    },
    getAllEmployees: async () => {
        try {
            const query = `SELECT employee_id, employee_type, first_name, middle_name, last_name, mobile_number, alt_mobile_number, email, alt_email, father_name, mother_name, date_of_birth, gender, blood_group, department, date_of_joining, date_of_relieving, previous_experience, rate_per_hour, rate_per_day, pay_frequency, aadhar_number, pan_number, driving_licence, passport_number, passport_issue_date, passport_expiry_date, pf_number, esi_number, uan_number, address_1, address_2, address_3, postal_code, account_number, account_holder_number, bank_name, branch_name, ifsc_code, micr_code, address,active_flag
                FROM per_people_all`;
            const [results] = await pool.query(query);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    },

    getEmployees: async (employee_id) => {
      const query = `SELECT employee_id, employee_type, first_name, middle_name, last_name, mobile_number, alt_mobile_number, email, alt_email, father_name, mother_name, date_of_birth, gender, blood_group, department, date_of_joining, date_of_relieving, previous_experience, rate_per_hour, rate_per_day, pay_frequency, aadhar_number, pan_number, driving_licence, passport_number, passport_issue_date, passport_expiry_date, pf_number, esi_number, uan_number, address_1, address_2, address_3, postal_code, account_number, account_holder_number, bank_name, branch_name, ifsc_code, micr_code, address,active_flag FROM per_people_all WHERE employee_id = ?`;
      const [results] = await pool.query(query, [employee_id]);
      return results[0]; // Return the first result or undefined if not found
    },

    updateEmployeeStatus: async (employee_id, data) => {
      if (!employee_id) {
          throw new Error('Invalid employee_id');
      }

      if (!data.status) {
          throw new Error('Invalid status value');
      }

      const query = `
          UPDATE per_people_all
          SET active_flag = COALESCE(?, active_flag)
          WHERE employee_id = ?
      `;

      const [result] = await pool.query(query, [
          data.status,
          employee_id
      ]);

      return result.affectedRows > 0; // Return true if the update was successful
  },

    userAlreadyExists: async (first_name,mobile_number) => {
        try {
            const query = 'SELECT employee_id FROM per_people_all WHERE first_name = ? and mobile_number = ?';
            const [results] = await pool.query(query, [first_name,mobile_number]);
            return results[0]; // Return the first result or undefined if not found
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }
};

module.exports = { Employee };
