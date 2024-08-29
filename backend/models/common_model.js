const pool = require('../config/database');
const { getCurrentDate, getCurrentDateTime, setDefaultActiveFlag } = require('../utils/common_function');

// Now you can use these functions wherever you imported them
const currentDate = getCurrentDate();
const currentDateTime = getCurrentDateTime();
const defaultActiveFlag = setDefaultActiveFlag();

const common_model = {
  getLov: async (list_name) => {
  const query =`select list_values.list_type_values_id,
                  lov.lov_id,
                  list_values.list_code,
                  list_values.list_value
                  from list_type_values as list_values
                  left join lov on lov.lov_id=list_values.lov_id
                  where 1=1
                  and lov.list_name = ?
                  and lov.active_flag=?
                  and list_values.active_flag=?`;

  const [results] = await pool.query(query, [list_name,defaultActiveFlag,defaultActiveFlag]);
  return results;
  }
}

module.exports = { common_model };
