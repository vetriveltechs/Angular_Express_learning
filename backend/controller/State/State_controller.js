const { state } = require('../../models/state_model');

  exports.createState = async (req, res) => {
    const { country_id, state_name, state_code, state_number } = req.body;

    try {
        const existingState = await state.stateAlreadyExists(country_id, state_name);
        if (existingState) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'State already exists.'
            });
        }

        const newState = await state.createState({ country_id, state_name, state_code, state_number });

        return res.status(201).json({
            status: 201,
            success: true,
            message: 'State created successfully',
            data: newState
        });
    } catch (err) {
        console.error('Error creating state:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
  };

  exports.getAllStates = async (req, res) => {
    try {
      
        const country_id = req.query.country_id || '';
        const state_id = req.query.state_id || '';
        const active_flag = req.query.active_flag || '';

        const results = await state.getAllStates(country_id, state_id, active_flag);

        return res.status(200).json({
            status: 200,
            success: true,
            message: results.length ? "States fetched successfully" : "No states found",
            data: results
        });
    } catch (err) {
        console.error('Error fetching states:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};


exports.editState = async (req, res) => {
    try {
        const { state_id } = req.params;
        const results = await state.editState(state_id);

        if (!results) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'State not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'State details fetched successfully',
            data: results
        });
    } catch (err) {
        console.error('Error fetching state:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.updateState = async (req, res) => {
    try {
        const { state_id } = req.params;
        const { country_id, state_name, state_code, state_number } = req.body;

        if (!country_id) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'No fields to update'
            });
        }

        const result = await state.updateState(state_id, {
            country_id,
            state_name,
            state_code,
            state_number
        });

        if (!result) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'State not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'State updated successfully'
        });
    } catch (err) {
        console.error('Error updating state:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.updateStateStatus = async (req, res) => {
    try {
        const { state_id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'No status provided'
            });
        }

        const result = await state.updateStateStatus(state_id, { status });

        if (!result) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'State not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'State status updated successfully'
        });
    } catch (err) {
        console.error('Error updating state status:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.getStateAll = async (req, res) => {
    try {
        const results = await state.getStateAll();

        return res.status(200).json({
            status: 200,
            success: true,
            message: results.length ? "States fetched successfully" : "No states found",
            data: results
        });
    } catch (err) {
        console.error('Error fetching states:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};


