const { organization } = require('../../models/organization_model');

  exports.createOrganization = async (req, res) => {
    const { organization_name,organization_description,location_id,start_date,end_date,industry_type,contact_person,mobile_number,email,user_name,password,organization_image } = req.body;

    try {
        const existingOrganization = await organization.organizationAlreadyExists(organization_name);
        if (existingOrganization) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Organization already exists.'
            });
        }

        const newOrganization = await organization.createOrganization({ organization_name,organization_description,location_id,start_date,end_date,industry_type,contact_person,mobile_number,email,user_name,password,organization_image  });

        return res.status(201).json({
            status: 201,
            success: true,
            message: 'Organization created successfully',
            data: newOrganization
        });
    } catch (err) {
        console.error('Error creating organization:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
  };

  exports.getAllOrganizations = async (req, res) => {
    try {

        const organization_id = req.query.organization_id || '';
        const active_flag     = req.query.active_flag || '';

        const results         = await organization.getAllOrganizations(organization_id, active_flag);

        return res.status(200).json({
            status: 200,
            success: true,
            message: results.length ? "Organization fetched successfully" : "No organization found",
            data: results
        });
    } catch (err) {
        console.error('Error fetching organization:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};


exports.editOrganization = async (req, res) => {
    try {
        const { organization_id } = req.params;

        const results             = await organization.editOrganization(organization_id);

        if (!results) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Organization not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Organization details fetched successfully',
            data: results
        });
    } catch (err) {
        console.error('Error fetching organization:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.updateOrganization = async (req, res) => {
    try {
        const { organization_id } = req.params;
        const { organization_name,organization_description,location_id,start_date,end_date,industry_type,contact_person,mobile_number,email,user_name,password,organization_image } = req.body;

        if (!organization_id) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'No fields to update'
            });
        }

        const result = await organization.updateOrganization(organization_id, {
          organization_name,organization_description,location_id,start_date,end_date,industry_type,contact_person,mobile_number,email,user_name,password,organization_image 
        });

        if (!result) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'organization not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Organization updated successfully'
        });
    } catch (err) {
        console.error('Error updating organization:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.updateOrganizationStatus = async (req, res) => {
    try {
        const { organization_id } = req.params;
        const { status }          = req.body;

        if (!status) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'No status provided'
            });
        }

        const result = await organization.updateOrganizationStatus(organization_id, { status });

        if (!result) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Organization not found'
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Organization status updated successfully'
        });
    } catch (err) {
        console.error('Error updating organization status:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.getOrganizationAll = async (req, res) => {
    try {
        const results = await organization.getOrganizationAll();

        return res.status(200).json({
            status: 200,
            success: true,
            message: results.length ? "Organization fetched successfully" : "No organization found",
            data: results
        });
    } catch (err) {
        console.error('Error fetching organization:', err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
    }
};


