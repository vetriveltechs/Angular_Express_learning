const pool = require('../config/database');

const state =
{
    createState: async (data) =>
    {
        const query = 'INSERT INTO states (country_id,state_name,state_code,state_number) VALUES (?,?,?,?)';
        const [results] = await pool.query(query, [data.country_id,data.state_name,data.state_code,data.state_number]);
        return results;
    },

    getAllStates: async (country_id, state_id,active_flag) =>
    {
        let query = `SELECT countrys.country_name,states.state_id,states.state_name,states.state_code,states.state_number,states.active_flag FROM states
                    left join countrys on countrys.country_id=states.country_id
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

        if (active_flag && active_flag !== 'ALL') {
            query += ` AND states.active_flag = ?`;
            params.push(active_flag);
        }

        const [results] = await pool.query(query, params);
        return results;
    },



    stateAlreadyExists: async (country_id,state_name) =>
    {
        const query = `select state_id from states
                    where 1=1
                    and country_id = ?
                    and state_name = ?`;
        const [results] = await pool.query(query, [country_id,state_name]);
        return results[0];
    },

    editState: async (state_id) =>
    {
        const query = `SELECT state_id,country_id,state_name,state_number,state_code from states
                        where 1=1
                        and state_id = ?`;
        const [results] = await pool.query(query, [state_id]);
        return results[0];
    },

    updateState: async (state_id, data) =>
    {
        if (!state_id)
        {
            throw new Error('Invalid State Id');
        }

        const query = `
            update states
            set
            country_id = COALESCE(?, country_id),
            state_name = COALESCE(?, state_name),
            state_code = COALESCE(?, state_code),
            state_number = COALESCE(?, state_number)
            where 1=1
            and state_id = ?
        `;

        const [result] = await pool.query(query, [
            data.country_id,
            data.state_name,
            data.state_code,
            data.state_number,
            state_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },

    updateStateStatus: async (state_id, data) =>
    {
        if (!state_id)
        {
            throw new Error('Invalid State Id');
        }

        const query = `
            update states
                set  active_flag = COALESCE(?, active_flag)
            where 1=1
            and state_id = ?
        `;

        const [result] = await pool.query(query, [
            data.status,
            state_id
        ]);

        return result.affectedRows > 0; // Return true if the update was successful
    },
    getStateAll: async () =>
    {
        const query = `SELECT state_id,state_name from states
                    where 1=1 and states.active_flag='${setDefaultActiveFlag()}'`;
        const [results] = await pool.query(query);
        return results; // Return the first result or undefined if not found
    },
};

module.exports = { state };
