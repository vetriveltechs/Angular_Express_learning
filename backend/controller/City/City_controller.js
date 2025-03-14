const { city } = require('../../models/city_model');

  exports.createCity = async (req, res) => {
    const { country_id, state_id, city_name} = req.body;

    try {
        const existingCity = await city.cityAlreadyExists(country_id,state_id, city_name);
        if (existingCity) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'City already exists.'
            });
        }

        const newCity = await city.createCity({ country_id, state_id, city_name });

        return res.status(201).json({
            status: 201,
            success: true,
            message: 'City created successfully',
            data: newCity
        });
    } catch (err) {
        console.error('Error creating city:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
  };

  exports.getAllCities = async (req, res) => {
    try {

        const country_id    = req.query.country_id || '';
        const state_id      = req.query.state_id || '';
        const city_id       = req.query.city_id || '';
        const active_flag   = req.query.active_flag || '';

        const results = await city.getAllCities(country_id, state_id,city_id, active_flag);

        return res.status(200).json({
            status: 200,
            success: true,
            message: results.length ? "Cities fetched successfully" : "No cities found",
            data: results
        });
    } catch (err) {
        console.error('Error fetching city:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};


exports.editCity = async (req, res) => {
    try {
        const { city_id } = req.params;
        const results = await city.editCity(city_id);

        if (!results) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'City not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'City details fetched successfully',
            data: results
        });
    } catch (err) {
        console.error('Error fetching city:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.updateCity = async (req, res) => {
    try {
        const { city_id } = req.params;
        const { country_id, state_id, city_name} = req.body;

        if (!country_id) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'No fields to update'
            });
        }

        const result = await city.updateCity(city_id, {
            country_id,
            state_id,
            city_name
        });

        if (!result) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'City not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'City updated successfully'
        });
    } catch (err) {
        console.error('Error updating city:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.updateCityStatus = async (req, res) => {
    try {
        const { city_id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'No city provided'
            });
        }

        const result = await city.updateCityStatus(city_id, { status });

        if (!result) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'City not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'City status updated successfully'
        });
    } catch (err) {
        console.error('Error updating city status:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.getCityAll = async (req, res) => {
    try {
        const results = await city.getCityAll();

        return res.status(200).json({
            status: 200,
            success: true,
            message: results.length ? "City fetched successfully" : "No city found",
            data: results
        });
    } catch (err) {
        console.error('Error fetching city:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};


