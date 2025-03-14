const pool = require('../config/database');

const city =
{
    createCity: async (data) =>
    {
        const query = 'INSERT INTO cities (country_id,state_id,city_name) VALUES (?,?,?)';
        const [results] = await pool.query(query, [data.country_id,data.state_id,data.city_name]);
        return results;
    },

    getAllCities: async (country_id, state_id,city_id,active_flag) =>
    {
        let query = `SELECT cities.city_id,cities.city_name,cities.active_flag,countrys.country_name,states.state_name FROM cities
                    left join countrys on countrys.country_id=cities.country_id
                    left join states on states.state_id=cities.state_id
                    WHERE 1=1`;

        const params = [];

        if (country_id) {
            query += ` AND countrys.country_id = COALESCE(?, countrys.country_id)`;
            params.push(country_id);
        }
        if (state_id) {
            query += ` AND states.state_id = COALESCE(?, states.state_id)`;
            params.push(state_id);
        }
        if (city_id) {
          query += ` AND cities.city_id = COALESCE(?, cities.city_id)`;
          params.push(state_id);
      }

        if (active_flag && active_flag !== 'ALL') {
            query += ` AND cities.active_flag = ?`;
            params.push(active_flag);
        }

        const [results] = await pool.query(query, params);
        return results;
    },



    cityAlreadyExists: async (country_id,state_id,city_name) =>
    {
        const query = `select city_id from cities
                    where 1=1
                    and country_id = ?
                    and state_id = ?
                    and city_name = ?`;
        const [results] = await pool.query(query, [country_id,state_id,city_name]);
        return results[0];
    },

    editCity: async (city_id) =>
    {
        const query = `SELECT country_id,state_id,city_name from cities
                        where 1=1
                        and city_id = ?`;
        const [results] = await pool.query(query, [city_id]);
        return results[0];
    },

    updateCity: async (city_id, data) =>
    {
        if (!city_id)
        {
            throw new Error('Invalid city Id');
        }

        const query = `
            update cities
            set
            country_id = COALESCE(?, country_id),
            state_id = COALESCE(?, state_id),
            city_name = COALESCE(?, city_name)
            where 1=1
            and city_id = ?
        `;

        const [result] = await pool.query(query, [
            data.country_id,
            data.state_id,
            data.city_name,
            city_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },

    updateCityStatus: async (city_id, data) =>
    {
        if (!city_id)
        {
            throw new Error('Invalid city id');
        }

        const query = `
            update cities
                set  active_flag = COALESCE(?, active_flag)
            where 1=1
            and city_id = ?
        `;

        const [result] = await pool.query(query, [
            data.status,
            city_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },
    getCityAll: async () =>
    {
        const query = `SELECT city_id,city_name from cities
                    where 1=1 and cities.active_flag='${setDefaultActiveFlag()}'`;
        const [results] = await pool.query(query);
        return results; // Return the first result or undefined if not found
    },
};

module.exports = { city };
