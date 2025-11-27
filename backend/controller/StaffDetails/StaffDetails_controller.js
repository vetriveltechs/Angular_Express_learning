const { staffDetails } = require('../../models/staffDetails_model');

exports.createStaffDetails = async (req, res) => {
    const { staff_roll_number,staff_name,department_id,academic_year,email_id,contact_number,position_name} = req.body;
  console.log(req.body);

    try {
        const existingStaffDetails = await staffDetails.staffDetailsAlreadyExists(staff_name, email_id);
        if (existingStaffDetails) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Staff detail already exists.'
            });
        }

        const newStaffDetail = await staffDetails.createStaffDetails({ staff_roll_number,staff_name,department_id,academic_year,email_id,contact_number,position_name });

        return res.status(201).json({
            status: 201,
            success: true,
            message: 'Staff detail created successfully',
            data: newStaffDetail
        });
    } catch (err) {
        console.error('Error creating country:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.getAllStaffDetails = async (req, res) => {
    try {
        const staff_id   = req.query.staff_id || '';
        const department_id     = req.query.department_id || '';
        const academic_year              = req.query.academic_year || '';
        const active_flag       = req.query.active_flag || '';

        const results = await staffDetails.getAllStaffDetails(staff_id,department_id,academic_year, active_flag);

        return res.status(200).json({
            status: 200,
            success: true,
            message: results.length ? "Staff details fetched successfully" : "No staff details found",
            data: results
        });
    } catch (err) {
        console.error('Error fetching staff details:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.editStaffDetails = async (req, res) => {
    try {
        const { staff_id } = req.params;
        const results = await staffDetails.editStaffDetails(staff_id);

        if (!results) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Staff detail not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Staff detail fetched successfully',
            data: results
        });
    } catch (err) {
        console.error('Error fetching staff detail:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.updateStaffDetails = async (req, res) => {
    try {
        const { staff_id } = req.params;
        const { staff_roll_number,staff_name,department_id,academic_year,email_id,contact_number,position_name } = req.body;

        if (!staff_id) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'No fields to update'
            });
        }

        const result = await staffDetails.updateStaffDetails(staff_id, {
            staff_roll_number,
            staff_name,
            department_id,
            academic_year,
            email_id,
            contact_number,
            position_name
        });

        if (!result) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Staff detail not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Staff detail updated successfully'
        });
    } catch (err) {
        console.error('Error updating staff detail:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.updateStaffDetailsStatus = async (req, res) => {
    try {
        const { staff_id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'No status provided'
            });
        }

        const result = await staffDetails.updateStaffDetailsStatus(staff_id, { status });

        if (!result) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Staff detail not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Staff detail updated successfully'
        });
    } catch (err) {
        console.error('Error updating staff detail:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.getStaffDetailsAll = async (req, res) => {
    try {
        const results = await staffDetails.getStaffDetailsAll();

        return res.status(200).json({
            status: 200,
            success: true,
            message: results.length ? "Staff detail fetched successfully" : "No staff detail found",
            data: results
        });
    } catch (err) {
        console.error('Error fetching staff detail:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};
