const { UsersModel } = require('../models/user_model');

exports.getAllUsers = async () => {
    return await UsersModel.find();
};

exports.getUserById = async (id) => {
    return await UsersModel.findById(id);
};
