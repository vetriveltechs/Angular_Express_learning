
const getCurrentDate = () => {
    return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD" format
};

const getCurrentDateTime = () => {
    return new Date().toISOString().slice(0, 19).replace('T', ' '); // "YYYY-MM-DD HH:MM:SS" format
};

const setDefaultActiveFlag = () => {
    return 'Y';
};

module.exports = {
    getCurrentDate,
    getCurrentDateTime,
    setDefaultActiveFlag
};

// middleware.js
exports.isAuthenticated = async(req, res, next) => {
    if (req.session.authenticated) {

        next();
    } else {

        res.redirect('/');
    }
};
