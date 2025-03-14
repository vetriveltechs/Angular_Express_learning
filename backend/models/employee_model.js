const pool = require('../config/database');
const { getNextDocumentNumber,incrementNextDocumentNumber } = require('../utils/common_function');

  const Employee = {
    create: async (data) => {
      try {
        // Step 1: Insert employee data
        const employeeQuery = `
          INSERT INTO per_people_all (
            employee_type, first_name, middle_name, last_name, mobile_number,
            alt_mobile_number, email, alt_email, father_name, mother_name,
            date_of_birth, gender, blood_group, department_id, designation_id,
            date_of_joining, date_of_relieving, previous_experience, rate_per_hour,
            rate_per_day, pay_frequency, aadhar_number, pan_number, driving_licence,
            passport_number, passport_issue_date, passport_expiry_date, pf_number,
            esi_number, uan_number, address_1, address_2, address_3, postal_code,
            account_number, account_holder_number, bank_name, branch_name, ifsc_code,
            micr_code, address
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
        `;

        const [employeeResult] = await pool.query(employeeQuery, [
          data.employee_type, data.first_name, data.middle_name, data.last_name,
          data.mobile_number, data.alt_mobile_number, data.email, data.alt_email,
          data.father_name, data.mother_name, data.date_of_birth, data.gender,
          data.blood_group, data.department_id, data.designation_id, data.date_of_joining,
          data.date_of_relieving, data.previous_experience, data.rate_per_hour,
          data.rate_per_day, data.pay_frequency, data.aadhar_number, data.pan_number,
          data.driving_licence, data.passport_number, data.passport_issue_date,
          data.passport_expiry_date, data.pf_number, data.esi_number, data.uan_number,
          data.address_1, data.address_2, data.address_3, data.postal_code,
          data.account_number, data.account_holder_number, data.bank_name,
          data.branch_name, data.ifsc_code, data.micr_code, data.address,
        ]);

        const employeeId = employeeResult.insertId;

        const listName = 'EMP';

        const { nextNumber, prefix, suffix } = await getNextDocumentNumber(listName);

        const documentNumber = `${prefix || ''}${nextNumber}${suffix || ''}`;

        // Step 3: Update the employee number in `per_people_all`
        const documentUpdateQuery = `
          UPDATE per_people_all
          SET employee_number = ?
          WHERE employee_id = ?
        `;
        await pool.query(documentUpdateQuery, [documentNumber, employeeId]);

        // // Step 4: Increment the `next_number` in `doc_document_numbering`
        // const incrementNextNumberQuery = `
        //   UPDATE doc_document_numbering AS document_numbering
        //   SET next_number = ?
        //   WHERE document_numbering_type = ?
        //   AND active_flag = ?
        // `;

        const nextNumberValue = Number(nextNumber);

        await incrementNextDocumentNumber('EMP', nextNumberValue);

        return employeeResult;

      } catch (err) {
        console.error('Error during employee creation:', err);
        throw err;
      }
    },

    getAllEmployees: async () => {
        try {
            const query = `SELECT employee_id, employee_type, first_name, middle_name, last_name, mobile_number, alt_mobile_number, email, alt_email, father_name, mother_name, date_of_birth, gender, blood_group, department_id,designation_id, date_of_joining, date_of_relieving, previous_experience, rate_per_hour, rate_per_day, pay_frequency, aadhar_number, pan_number, driving_licence, passport_number, passport_issue_date, passport_expiry_date, pf_number, esi_number, uan_number, address_1, address_2, address_3, postal_code, account_number, account_holder_number, bank_name, branch_name, ifsc_code, micr_code, address,active_flag
                FROM per_people_all`;
            const [results] = await pool.query(query);
            return results;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    },

    getEmployees: async (employee_id) => {
      const query = `SELECT employee_id, employee_type, first_name, middle_name, last_name, mobile_number, alt_mobile_number, email, alt_email, father_name, mother_name, date_of_birth, gender, blood_group, department_id,designation_id, date_of_joining, date_of_relieving, previous_experience, rate_per_hour, rate_per_day, pay_frequency, aadhar_number, pan_number, driving_licence, passport_number, passport_issue_date, passport_expiry_date, pf_number, esi_number, uan_number, address_1, address_2, address_3, postal_code, account_number, account_holder_number, bank_name, branch_name, ifsc_code, micr_code, address,active_flag FROM per_people_all WHERE employee_id = ?`;
      const [results] = await pool.query(query, [employee_id]);
      return results[0]; // Return the first result or undefined if not found
    },

    getEmployeeDetails: async (employee_id) => {
      const query = `SELECT employee_id,
      per_people_all.employee_type,
      per_people_all.employee_number,
      per_people_all.first_name,
      per_people_all.middle_name,
      per_people_all.last_name,
      per_people_all.active_flag,
      departments.department_name,
      designations.designation_name from per_people_all
      left join departments on departments.department_id=per_people_all.department_id
      left join designations on designations.designation_id=per_people_all.designation_id
      WHERE 1=1
      and employee_id = ?`;
      const [results] = await pool.query(query, [employee_id]);
      return results[0]; // Return the first result or undefined if not found
    },

    updateEmployee: async (employee_id, data) => {
      if (!employee_id) {
          throw new Error('Invalid lov_id');
      }

      const query = `
        UPDATE per_people_all
        SET
          employee_type = COALESCE(?, employee_type),
          first_name = COALESCE(?, first_name),
          middle_name = COALESCE(?, middle_name),
          last_name = COALESCE(?, last_name),
          mobile_number = COALESCE(?, mobile_number),
          alt_mobile_number = COALESCE(?, alt_mobile_number),
          email = COALESCE(?, email),
          alt_email = COALESCE(?, alt_email),
          father_name = COALESCE(?, father_name),
          mother_name = COALESCE(?, mother_name),
          date_of_birth = COALESCE(?, date_of_birth),
          gender = COALESCE(?, gender),
          blood_group = COALESCE(?, blood_group),
          department_id = COALESCE(?, department_id),
          designation_id = COALESCE(?, designation_id),
          date_of_joining = COALESCE(?, date_of_joining),
          date_of_relieving = COALESCE(?, date_of_relieving),
          previous_experience = COALESCE(?, previous_experience),
          rate_per_hour = COALESCE(?, rate_per_hour),
          rate_per_day = COALESCE(?, rate_per_day),
          pay_frequency = COALESCE(?, pay_frequency),
          aadhar_number = COALESCE(?, aadhar_number),
          pan_number = COALESCE(?, pan_number),
          driving_licence = COALESCE(?, driving_licence),
          passport_number = COALESCE(?, passport_number),
          passport_issue_date = COALESCE(?, passport_issue_date),
          passport_expiry_date = COALESCE(?, passport_expiry_date),
          pf_number = COALESCE(?, pf_number),
          esi_number = COALESCE(?, esi_number),
          uan_number = COALESCE(?, uan_number),
          address_1 = COALESCE(?, address_1),
          address_2 = COALESCE(?, address_2),
          address_3 = COALESCE(?, address_3),
          postal_code = COALESCE(?, postal_code),
          account_number = COALESCE(?, account_number),
          account_holder_number = COALESCE(?, account_holder_number),
          bank_name = COALESCE(?, bank_name),
          branch_name = COALESCE(?, branch_name),
          ifsc_code = COALESCE(?, ifsc_code),
          micr_code = COALESCE(?, micr_code),
          address = COALESCE(?, address)
        WHERE employee_id = ?
      `;

      const [result] = await pool.query(query, [
        data.employee_type,
        data.first_name,
        data.middle_name,
        data.last_name,
        data.mobile_number,
        data.alt_mobile_number,
        data.email,
        data.alt_email,
        data.father_name,
        data.mother_name,
        data.date_of_birth,
        data.gender,
        data.blood_group,
        data.department_id,
        data.designation_id,
        data.date_of_joining,
        data.date_of_relieving,
        data.previous_experience,
        data.rate_per_hour,
        data.rate_per_day,
        data.pay_frequency,
        data.aadhar_number,
        data.pan_number,
        data.driving_licence,
        data.passport_number,
        data.passport_issue_date,
        data.passport_expiry_date,
        data.pf_number,
        data.esi_number,
        data.uan_number,
        data.address_1,
        data.address_2,
        data.address_3,
        data.postal_code,
        data.account_number,
        data.account_holder_number,
        data.bank_name,
        data.branch_name,
        data.ifsc_code,
        data.micr_code,
        data.address,
        employee_id
      ]);

      return result.affectedRows > 0; // Return true if the update was successful
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
