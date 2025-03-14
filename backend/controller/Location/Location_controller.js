const { location } = require('../../models/location_model');

  exports.createLocation = async (req, res) => {
    const { location_name,start_date,end_date,country_id, state_id, city_id, address_1,address_2,address_3,pin_code} = req.body;

    try {
        const existingLocation = await location.locationAlreadyExists(location_name,country_id, state_id, city_id);
        if (existingLocation) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Location already exists.'
            });
        }

        const newLocation = await location.createLocation({ location_name,start_date,end_date,country_id, state_id, city_id, address_1,address_2,address_3,pin_code });

        return res.status(201).json({
            status: 201,
            success: true,
            message: 'Location created successfully',
            data: newLocation
        });
    } catch (err) {
        console.error('Error creating location:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
  };

  exports.getAllLocations = async (req, res) => {
    try {

        const location_id = req.query.location_id || '';
        const active_flag = req.query.active_flag || '';

        const results = await location.getAllLocations(location_id, active_flag);

        return res.status(200).json({
            status: 200,
            success: true,
            message: results.length ? "Locations fetched successfully" : "No locations found",
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


exports.editLocation = async (req, res) => {
    try {
        const { location_id } = req.params;
        const results = await location.editLocation(location_id);

        if (!results) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Location not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Location details fetched successfully',
            data: results
        });
    } catch (err) {
        console.error('Error fetching location:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.updateLocation = async (req, res) => {
    try {
        const { location_id } = req.params;
        const { location_name,start_date,end_date,country_id, state_id, city_id, address_1,address_2,address_3,pin_code } = req.body;
        
        if (!location_id) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'No fields to update'
            });
        }

        const result = await location.updateLocation(location_id, {
            location_name,
            start_date,
            end_date,
            country_id,
            state_id,
            city_id,
            address_1,
            address_2,
            address_3,
            pin_code
        });

        if (!result) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'locations not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'locations updated successfully'
        });
    } catch (err) {
        console.error('Error updating locations:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.updateLocationStatus = async (req, res) => {
    try {
        const { location_id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'No status provided'
            });
        }

        const result = await location.updateLocationStatus(location_id, { status });

        if (!result) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Location not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Location status updated successfully'
        });
    } catch (err) {
        console.error('Error updating location status:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.getLocationAll = async (req, res) => {
    try {
        const results = await location.getLocationAll();

        return res.status(200).json({
            status: 200,
            success: true,
            message: results.length ? "Locations fetched successfully" : "No locations found",
            data: results
        });
    } catch (err) {
        console.error('Error fetching locations:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};


