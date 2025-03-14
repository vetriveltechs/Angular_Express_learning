const pool = require('../config/database');

const country =
{
    createCountry: async (data) =>
    {
        const query = 'INSERT INTO countrys (country_name,country_code,currency_symbol,currency_code) VALUES (?,?,?,?)';
        const [results] = await pool.query(query, [data.country_name,data.country_code,data.currency_symbol,data.currency_code]);
        return results;
    },

    getAllCountrys: async (country_id, active_flag) =>
    {
        let query = `SELECT country_id, country_name, country_code, currency_symbol,active_flag FROM countrys WHERE 1=1`;

        const params = [];

        if (country_id) {
            query += ` AND country_id = COALESCE(?, country_id)`;
            params.push(country_id);
        }

        if (active_flag && active_flag !== 'ALL') {
            query += ` AND active_flag = ?`;
            params.push(active_flag);
        }

        const [results] = await pool.query(query, params);
        return results;
    },



    countryAlreadyExists: async (country_name,country_code) =>
    {
        const query = `select country_id from countrys
                    where 1=1
                    and country_name = ?
                    and country_code = ?`;
        const [results] = await pool.query(query, [country_name,country_code]);
        return results[0];
    },

    editCountry: async (country_id) =>
    {
        const query = `SELECT country_id,country_name,country_code,currency_symbol,currency_code from countrys
                        where 1=1
                        and country_id = ?`;
        const [results] = await pool.query(query, [country_id]);
        return results[0];
    },

    updateCountry: async (country_id, data) =>
    {
        if (!country_id)
        {
            throw new Error('Invalid country_id');
        }

        const query = `
            update countrys
            set
            country_name = COALESCE(?, country_name),
            country_code = COALESCE(?, country_code),
            currency_symbol = COALESCE(?, currency_symbol),
            currency_code = COALESCE(?, currency_code)
            where 1=1
            and country_id = ?
        `;

        const [result] = await pool.query(query, [
            data.country_name,
            data.country_code,
            data.currency_symbol,
            data.currency_code,
            country_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },

    updateCountryStatus: async (country_id, data) =>
    {
        if (!country_id)
        {
            throw new Error('Invalid country_id');
        }

        const query = `
            update countrys
                set  active_flag = COALESCE(?, active_flag)
            where 1=1
            and country_id = ?
        `;

        const [result] = await pool.query(query, [
            data.status,
            country_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },
    getCountryAll: async () =>
    {
        const query = `SELECT country_id,country_name from countrys
                    where 1=1 and countrys.active_flag='${setDefaultActiveFlag()}'`;
        const [results] = await pool.query(query);
        return results; // Return the first result or undefined if not found
    },
};

module.exports = { country };
