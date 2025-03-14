const pool = require('../config/database');

const organization =
{
    createOrganization: async (data) =>
    {
        const query = 'INSERT INTO organizations (organization_name,organization_description,location_id,start_date,end_date,industry_type,contact_person,mobile_number,email,user_name,password,organization_image ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
        const [results] = await pool.query(query, [data.organization_name,data.organization_description,data.location_id,data.start_date,data.end_date,data.industry_type,data.contact_person,data.mobile_number,data.email,data.user_name,data.password,data.organization_image]);
        return results;
    },

    getAllOrganizations: async (organization_id, active_flag) =>
    {
        let query = `SELECT organizations.organization_id,organizations.organization_name,organizations.active_flag FROM organizations
                    WHERE 1=1`;

        const params = [];

        if (organization_id) {
            query += ` AND organizations.organization_id = COALESCE(?, organizations.organization_id)`;
            params.push(organization_id);
        }

        if (active_flag && active_flag !== 'ALL') {
            query += ` AND organizations.active_flag = ?`;
            params.push(active_flag);
        }

        const [results] = await pool.query(query, params);
        return results;
    },



    organizationAlreadyExists: async (organization_name) =>
    {
        const query = `select organizations.organization_id from organizations
                    where 1=1
                    and organizations.organization_name = ?`;
        const [results] = await pool.query(query, [organization_name]);
        return results[0];
    },

    editOrganization: async (organization_id) =>
    {
        const query = `SELECT organization_id,organization_name,organization_description,location_id,start_date,end_date,industry_type,contact_person,mobile_number,email,user_name,password,organization_image from organizations
                        where 1=1
                        and organization_id = ?`;
        const [results] = await pool.query(query, [organization_id]);
        return results[0];
    },

    updateOrganization: async (organization_id, data) =>
    {
        if (!organization_id)
        {
            throw new Error('Invalid Organization Id');
        }

        const query = `
        UPDATE organizations
        SET
            organization_name = COALESCE(?, organization_name),
            organization_description = COALESCE(?, organization_description),
            location_id = COALESCE(?, location_id),
            start_date = COALESCE(?, start_date),
            end_date = COALESCE(?, end_date),
            industry_type = COALESCE(?, industry_type),
            contact_person = COALESCE(?, contact_person),
            mobile_number = COALESCE(?, mobile_number),
            email = COALESCE(?, email),
            user_name = COALESCE(?, user_name),
            password = COALESCE(?, password),
            organization_image = COALESCE(?, organization_image) -- Base64 Image
        WHERE organization_id = ?;
    `;

        const [result] = await pool.query(query, [
          data.organization_name,
          data.organization_description,
          data.location_id,
          data.start_date,
          data.end_date,
          data.industry_type,
          data.contact_person,
          data.mobile_number,
          data.email,
          data.user_name,
          data.password,
          data.organization_image,
          organization_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },

    updateOrganizationStatus: async (organization_id, data) =>
    {
        if (!organization_id)
        {
            throw new Error('Invalid Organization Id');
        }

        const query = `
            update organizations
                set  active_flag = COALESCE(?, active_flag)
            where 1=1
            and organization_id = ?
        `;

        const [result] = await pool.query(query, [
            data.status,
            organization_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },
    getOrganizationAll: async () =>
    {
        const query = `SELECT organization_id,organization_name from organizations
                    where 1=1 and organizations.active_flag='${setDefaultActiveFlag()}'`;
        const [results] = await pool.query(query);
        return results; // Return the first result or undefined if not found
    },
};

module.exports = { organization };
