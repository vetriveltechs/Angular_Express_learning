const pool = require('./database');
// const knex = require('./knex');
const { getCurrentDate, getCurrentDateTime, setDefaultActiveFlag } = require('../utils/common_function');

global.pool = pool;
// global.knex = knex;
global.getCurrentDate = getCurrentDate;
global.getCurrentDateTime = getCurrentDateTime;
global.setDefaultActiveFlag = setDefaultActiveFlag;


