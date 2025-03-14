const { country } = require('../../models/country_model');

exports.createCountry = async (req, res) => {
    const { country_name, country_code, currency_symbol, currency_code } = req.body;

    try {
        const existingCountry = await country.countryAlreadyExists(country_name, country_code);
        if (existingCountry) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Country already exists.'
            });
        }

        const newCountry = await country.createCountry({ country_name, country_code, currency_symbol, currency_code });

        return res.status(201).json({
            status: 201,
            success: true,
            message: 'Country created successfully',
            data: newCountry
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

exports.getAllCountrys = async (req, res) => {
    try {
        const country_id = req.query.country_id || '';
        const active_flag = req.query.active_flag || '';

        const results = await country.getAllCountrys(country_id, active_flag);

        return res.status(200).json({
            status: 200,
            success: true,
            message: results.length ? "Countries fetched successfully" : "No countries found",
            data: results
        });
    } catch (err) {
        console.error('Error fetching countries:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.editCountry = async (req, res) => {
    try {
        const { country_id } = req.params;
        const results = await country.editCountry(country_id);

        if (!results) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Country not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Country details fetched successfully',
            data: results
        });
    } catch (err) {
        console.error('Error fetching country:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.updateCountry = async (req, res) => {
    try {
        const { country_id } = req.params;
        const { country_name, country_code, currency_symbol, currency_code } = req.body;

        if (!country_name) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'No fields to update'
            });
        }

        const result = await country.updateCountry(country_id, {
            country_name,
            country_code,
            currency_symbol,
            currency_code
        });

        if (!result) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Country not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Country updated successfully'
        });
    } catch (err) {
        console.error('Error updating country:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.updateCountryStatus = async (req, res) => {
    try {
        const { country_id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'No status provided'
            });
        }

        const result = await country.updateCountryStatus(country_id, { status });

        if (!result) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Country not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Country status updated successfully'
        });
    } catch (err) {
        console.error('Error updating country status:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.getCountryAll = async (req, res) => {
    try {
        const results = await country.getCountryAll();

        return res.status(200).json({
            status: 200,
            success: true,
            message: results.length ? "Countries fetched successfully" : "No countries found",
            data: results
        });
    } catch (err) {
        console.error('Error fetching countries:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};
