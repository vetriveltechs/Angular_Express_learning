const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { UsersModel } = require('../models/users_model');
require("dotenv").config({ path: ".variables.env" });

// Retrieve and validate JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined');
    throw new Error('JWT_SECRET is not defined in environment variables');
}

exports.login = async (user_name, password) => {
    try {
        // Log the secret for debugging purposes
        console.log('Using JWT_SECRET:', JWT_SECRET);

        const user = await UsersModel.findOne({ user_name: user_name });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, userId: user._id,userName:user.user_name },
            JWT_SECRET
        );

        return token;
    } catch (error) {
        console.error('Error in authService login:', error);
        throw error;
    }
};


exports.ensureAuthenticated = (req, res, next) => {
    // Check for the presence of a token in the request (e.g., in cookies or headers)
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.redirect('/'); // Redirect to login page if not authenticated
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.redirect('/'); // Redirect to login page if token is invalid or expired
        }

        // Attach user information to the request object
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    });
};



// exports.register = async (user_name, password) => {
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const user = new UsersModel({ user_name, password: hashedPassword });
//     await user.save();
//     return user;
// };
