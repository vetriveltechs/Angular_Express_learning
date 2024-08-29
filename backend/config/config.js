// module.exports = {
//     PORT: process.env.PORT || 5000,
//     JWT_SECRET: process.env.JWT_SECRET || 'default_jwt_secret',
//     SESSION_SECRET: process.env.SESSION_SECRET || 'default_session_secret',
//     DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/your_database'
// };


module.exports = {
    port: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    mongodbUri: process.env.DB_URI || 'mongodb://localhost:27017/peps_tech',
    sessionSecret: process.env.SESSION_SECRET || 'c%T2Zf*9WmKLp@6dRQ^y7!v3Yb$Xe@4g',
};

