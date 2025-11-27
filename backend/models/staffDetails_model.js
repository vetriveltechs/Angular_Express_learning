const pool = require('../config/database');

const staffDetails =
{
    createStaffDetails: async (data) =>
    {
        const query = 'INSERT INTO staff_details (staff_roll_number,staff_name,department_id,academic_year,email_id,contact_number,position_name) VALUES (?,?,?,?,?,?,?)';
        const [results] = await pool.query(query, [data.staff_roll_number,data.staff_name,data.department_id,data.academic_year,data.email_id,data.contact_number,data.position_name]);
        return results;
    },

    getAllStaffDetails: async (staff_id,department_id,academic_year, active_flag) =>
    {
        let query = `SELECT staff_details.staff_id,
        staff_details.staff_name,
        departments.department_name,
        ltv1.list_value as academic_year_value,
        ltv2.list_value as position_name_value,
        staff_details.active_flag
        from staff_details
        left join departments on departments.department_id=staff_details.department_id
        left join list_type_values as ltv1 on ltv1.list_code=staff_details.academic_year
        left join list_type_values as ltv2 on ltv2.list_code=staff_details.position_name
        where 1=1`;

        const params = [];

        if (staff_id) {
            query += ` and staff_details.staff_id = COALESCE(?, staff_details.staff_id)`;
            params.push(staff_id);
        }
        if (department_id) {
            query += ` and departments.department_id = COALESCE(?, departments.department_id)`;
            params.push(department_id);
        }

        if (active_flag && active_flag !== 'ALL') {
            query += ` and staff_details.active_flag = ?`;
            params.push(active_flag);
        }

        const [results] = await pool.query(query, params);
        return results;
    },



    staffDetailsAlreadyExists: async (staff_name, email_id) =>
    {
        const query = `select staff_id from staff_details
                    where 1=1
                    and staff_name = ?
                    and email_id = ?`;
        const [results] = await pool.query(query, [staff_name,email_id]);
        return results[0];
    },

    editStaffDetails: async (staff_id) =>
    {
        const query = `SELECT staff_id,staff_roll_number,staff_name,department_id,academic_year,email_id,contact_number,position_name from staff_details
                        where 1=1
                        and staff_id = ?`;
        const [results] = await pool.query(query, [staff_id]);
        return results[0];
    },

    updateStaffDetails: async (staff_id, data) =>
    {
        if (!staff_id)
        {
            throw new Error('Invalid Staff ID');
        }

        const query = `
            update staff_details
            set
            staff_roll_number = COALESCE(?, staff_roll_number),
            staff_name = COALESCE(?, staff_name),
            department_id = COALESCE(?, department_id),
            academic_year = COALESCE(?, academic_year),
            email_id = COALESCE(?, email_id),
            contact_number = COALESCE(?, contact_number),
            position_name = COALESCE(?, position_name)
            where 1=1
            and staff_id = ?
        `;

        const [result] = await pool.query(query, [
            data.staff_roll_number,
            data.staff_name,
            data.department_id,
            data.academic_year,
            data.email_id,
            data.contact_number,
            data.position_name,
            staff_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },

    updateStaffDetailsStatus: async (staff_id, data) =>
    {
        if (!staff_id)
        {
            throw new Error('Invalid Staff ID');
        }

        const query = `
            update staff_details
                set  active_flag = COALESCE(?, active_flag)
            where 1=1
            and staff_id = ?
        `;

        const [result] = await pool.query(query, [
            data.status,
            staff_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },
    getStaffDetailsAll: async () =>
    {
        const query = `SELECT staff_id,staff_name from staff_details
                    where 1=1 and staff_details.active_flag='${setDefaultActiveFlag()}'`;
        const [results] = await pool.query(query);
        return results; // Return the first result or undefined if not found
    },
};

module.exports = { staffDetails };
