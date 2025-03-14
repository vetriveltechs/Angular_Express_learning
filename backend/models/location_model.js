const pool = require('../config/database');

const location =
{
    createLocation: async (data) =>
    {
        const query = 'INSERT INTO locations (location_name,start_date,end_date,country_id, state_id, city_id, address_1,address_2,address_3,pin_code) VALUES (?,?,?,?,?,?,?,?,?,?)';
        const [results] = await pool.query(query, [data.location_name,data.start_date,data.end_date,data.country_id, data.state_id, data.city_id, data.address_1,data.address_2,data.address_3,data.pin_code]);
        return results;
    },

    getAllLocations: async (location_id, active_flag) =>
    {
        let query = `SELECT locations.location_id,locations.location_name,locations.active_flag FROM locations
                    WHERE 1=1`;

        const params = [];

        if (location_id) {
            query += ` AND locations.location_id = COALESCE(?, locations.location_id)`;
            params.push(location_id);
        }

        if (active_flag && active_flag !== 'ALL') {
            query += ` AND locations.active_flag = ?`;
            params.push(active_flag);
        }

        const [results] = await pool.query(query, params);
        return results;
    },



    locationAlreadyExists: async (location_name,country_id, state_id, city_id) =>
    {
        const query = `select location_id from locations
                    where 1=1
                    and location_name = ?
                    and country_id = ?
                    and state_id = ?
                    and city_id = ?`;
        const [results] = await pool.query(query, [location_name,country_id, state_id, city_id]);
        return results[0];
    },

    editLocation: async (location_id) =>
    {
        const query = `SELECT location_id,location_name,start_date,end_date,country_id, state_id, city_id, address_1,address_2,address_3,pin_code from locations
                        where 1=1
                        and location_id = ?`;
        const [results] = await pool.query(query, [location_id]);
        return results[0];
    },

    updateLocation: async (location_id, data) =>
    {
        if (!location_id)
        {
            throw new Error('Invalid Location Id');
        }

        const query = `
            update locations
            set
            location_name = COALESCE(?, location_name),
            start_date = COALESCE(?, start_date),
            end_date = COALESCE(?, end_date),
            country_id = COALESCE(?, country_id),
            state_id = COALESCE(?, state_id),
            city_id = COALESCE(?, city_id),
            address_1 = COALESCE(?, address_1),
            address_2 = COALESCE(?, address_2),
            address_3 = COALESCE(?, address_3),
            pin_code = COALESCE(?, pin_code)
            where 1=1
            and location_id = ?
        `;

        const [result] = await pool.query(query, [
          data.location_name,
          data.start_date,
          data.end_date,
          data.country_id,
          data.state_id,
          data.city_id,
          data.address_1,
          data.address_2,
          data.address_3,
          data.pin_code,
          location_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },

    updateLocationStatus: async (location_id, data) =>
    {
        if (!location_id)
        {
            throw new Error('Invalid Location Id');
        }

        const query = `
            update locations
                set  active_flag = COALESCE(?, active_flag)
            where 1=1
            and location_id = ?
        `;

        const [result] = await pool.query(query, [
            data.status,
            location_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },
    getLocationAll: async () =>
    {
        const query = `SELECT location_id,location_name from locations
                    where 1=1 and locations.active_flag='${setDefaultActiveFlag()}'`;
        const [results] = await pool.query(query);
        return results; // Return the first result or undefined if not found
    },
};

module.exports = { location };
