// const pool = require('../config/database');
// const { getCurrentDate, getCurrentDateTime, setDefaultActiveFlag } = require('../utils/common_function');

// // Now you can use these functions wherever you imported them
// const currentDate = getCurrentDate();
// const currentDateTime = getCurrentDateTime();
// const defaultActiveFlag = setDefaultActiveFlag();

const common_model = {
  getLov: async (list_name) => {
    const query = `
      SELECT list_values.list_type_values_id,
             lov.lov_id,
             list_values.list_code,
             list_values.list_value
      FROM list_type_values AS list_values
      LEFT JOIN lov ON lov.lov_id = list_values.lov_id
      WHERE lov.list_name = '${list_name}'
      AND lov.active_flag = '${setDefaultActiveFlag()}'
      AND list_values.active_flag = '${setDefaultActiveFlag()}'
    `;

    const [results] = await pool.query(query);
    return results;
  }
};

module.exports = { common_model };
