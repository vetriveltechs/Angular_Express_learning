const jwt = require('jsonwebtoken');
const { Users } = require('../models/User_model');

// Middleware to authenticate user and generate token
const authenticateUser = async (req, res, next) => {
    try {

        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Basic ')) {
            return res.status(401).json({
                httpCode: 401,
                status: 0,
                message: 'Missing or invalid Authorization header'
            });
        }

        // Extract and decode the user_name and password from the header
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [user_name, password] = credentials.split(':');
        const user = await Users.userExists(user_name, password);
        
        if (!user) {
            return res.status(401).json({
                httpCode: 401,
                status: 0,
                message: 'Invalid username or password'
            });
        }

        // Generate JWT token for the authenticated user
        const token = jwt.sign({ userId: user.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        // Attach the token and user details to the request
        req.token = token;
        req.user = user;

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({
            httpCode: 500,
            status: 0,
            message: 'Internal Server Error'
        });
    }
};

module.exports = { authenticateUser };






























// const jwt = require('jsonwebtoken');
// const { Users } = require('../models/User_model');

// // Middleware to authenticate user and generate token
// const authenticateUser = async (req, res, next) => {
//     const authHeader = req.headers['authorization'];

//     if (!authHeader || !authHeader.startsWith('Basic ')) {
//         return res.status(401).json({ message: 'Missing or invalid Authorization header' });
//     }

//     // Extract and decode the user_name and password from the header
//     const base64Credentials = authHeader.split(' ')[1];
//     const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
//     const [user_name, password] = credentials.split(':');

//     // Check if the user exists and the password is correct
//     const user = await Users.userExists(user_name, password);
//     if (!user) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     // Generate JWT token for the authenticated user (if needed)
//     const token = jwt.sign({ userId: user.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

//     // Attach the token to the request so the route can access it
//     req.token = token;
//     req.user = user;

//     next();
// };

// module.exports = { authenticateUser };
