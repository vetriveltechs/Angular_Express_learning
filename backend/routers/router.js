const express = require('express');

const app=express();

const router = express.Router();
const fs = require('fs');
const path=require('path');

const rootdir                     = require('../utils/path');

const employeeController          = require('../controller/Employee/Employee_controller');

const lovController               = require('../controller/Lov/Lov_controller');

const list_type_values_controller = require('../controller/List_type_values/List_type_values_controller')

const commmon_controller          = require('../controller/Common_controller/Common_controller')

const authenticationController    = require('../controller/Authentication/authController')

const rolesController             = require('../controller/Roles/Roles_controller')

const adminLoginController        = require('../controller/Admin_login/admin_login')

const departmentController        = require('../controller/Department/Department_controller')

const designationController       = require('../controller/Designation/Designation_controller')

const documentNumberingController = require('../controller/Document_numbering/Document_numbering_controller')

const bloodGroupController        = require('../controller/Blood_group/Blood_group')

const countryController           = require('../controller/Country/Country_controller')

const stateController             = require('../controller/State/State_controller')

const cityController              = require('../controller/City/City_controller')

const locationController          = require('../controller/Location/Location_controller')

const organizationController      = require('../controller/Organization/Organization_controller')


// const { authenticateToken } = require('../middleware/authMiddleware');

const { authenticateUser } = require('../middleware/authMiddleware');

const multer = require('multer');

app.use(express.static(path.join(__dirname,'public')));

// app.use(cors());

app.use(express.json());


const crypto = require('crypto');

// Middleware function to generate secret key
const generateSecret = () => {
    return crypto.randomBytes(32).toString('hex');
};

const upload1 = multer({ dest: 'assets/' });

router.post('/employee/createEmployee', authenticateUser,employeeController.createEmployee); // Use POST for creating employee
router.get('/employee/getAllEmployee', authenticateUser,employeeController.getAllEmployees); // GET all employees
router.get('/employee/getEmployees/:employee_id', authenticateUser,employeeController.getEmployees); // GET employee by ID
router.put('/employee/updateEmployee/:employee_id', authenticateUser,employeeController.updateEmployee);
router.put('/employee/updateEmployeeStatus/:employee_id/status', authenticateUser,employeeController.updateEmployeeStatus); // GET employee by ID
router.get('/employee/getEmployeeDetails/:employee_id', authenticateUser,employeeController.getEmployeeDetails);

router.post('/lov/createLov', authenticateUser,lovController.createLov); // Use POST for creating employee
router.get('/lov/getAllLov', authenticateUser,lovController.getAllLov); // GET all employees
router.get('/lov/editLov/:lov_id', authenticateUser,lovController.editLov);
router.put('/lov/updateLov/:lov_id', authenticateUser,lovController.updateLov);
router.put('/lov/updateLovStatus/:lov_id/status', authenticateUser,lovController.updateLovStatus);

router.post('/list_type_values/createListTypeValues', authenticateUser,list_type_values_controller.createListTypeValues);
router.get('/list_type_values/getListTypeValues/:lov_id', authenticateUser,list_type_values_controller.getAllByLovId);
router.put('/listTypeValues/updateListValues/:list_type_values_id', authenticateUser,list_type_values_controller.updateListValues);
router.put('/list_type_values/updateListValuesStatus/:list_type_values_id/status', authenticateUser,list_type_values_controller.updateListValuesStatus);


router.get('/common/getLov/:list_name', authenticateUser,commmon_controller.getLov);


router.post('/roles/createRoles', authenticateUser,rolesController.createRoles); // Use POST for creating employee
router.get('/roles/getAllRoles', authenticateUser,rolesController.getAllRoles); // GET all employees
router.get('/roles/editRoles/:role_id', authenticateUser,rolesController.editRoles);
router.put('/roles/updateRoles/:role_id', authenticateUser,rolesController.updateRoles);
router.put('/roles/updateRolesStatus/:role_id/status', authenticateUser,rolesController.updateRolesStatus);


router.post('/login',authenticateUser,authenticationController.login)
router.post('/users/createUser',authenticateUser,authenticationController.createUser)
router.get('/users/getAllUsers',authenticateUser,authenticationController.getAllUsers)
router.put('/users/updateUsersStatus/:user_id/status',authenticateUser,authenticationController.updateUsersStatus)
router.get('/users/editUsers/:user_id',authenticateUser,authenticationController.editUsers)

router.post('/admin_login',authenticateUser,adminLoginController.login);

router.post('/department/createDepartment',authenticateUser,departmentController.createdepartment)
router.get('/department/getAllDepartments', authenticateUser,departmentController.getAllDepartments);
router.get('/department/editDepartment/:department_id', authenticateUser,departmentController.editDepartment);
router.put('/department/updateDepartment/:department_id', authenticateUser,departmentController.updateDepartment);
router.put('/department/updateDepartmentStatus/:department_id/status', authenticateUser,departmentController.updateDepartmentStatus);
router.get('/department/getDepartmentAll', authenticateUser,departmentController.getDepartmentAll);

router.post('/designation/createDesignation',authenticateUser,designationController.createDesignation)
router.get('/designation/getAllDesignations', authenticateUser,designationController.getAllDesignations);
router.get('/designation/editDesignation/:designation_id', authenticateUser,designationController.editDesignation);
router.put('/designation/updateDesignation/:designation_id', authenticateUser,designationController.updateDesignation);
router.put('/designation/updateDesignationStatus/:designation_id/status', authenticateUser,designationController.updateDesignationStatus);
router.get('/designation/getDesignationAll', authenticateUser,designationController.getDesignationAll);

router.post('/document-numbering/createDocumentNumbering',authenticateUser,documentNumberingController.createDocumentNumbering)
router.get('/document-numbering/getAllDocumentNumbering', authenticateUser,documentNumberingController.getAllDocumentNumbering);
router.get('/document-numbering/editDocumentNumbering/:document_numbering_id', authenticateUser,documentNumberingController.editDocumentNumbering);
router.put('/document-numbering/updateDocumentNumbering/:document_numbering_id', authenticateUser,documentNumberingController.updateDocumentNumbering);
router.put('/document-numbering/updateDocumentNumberingStatus/:document_numbering_id/status', authenticateUser,documentNumberingController.updateDocumentNumberingStatus);
router.get('/document-numbering/getDocumentNumberingAll', authenticateUser,documentNumberingController.getDocumentNumberingAll);


router.post('/blood_group/createBloodGroup',authenticateUser,bloodGroupController.createBloodGroup)
router.get('/blood_group/getAllBloodGroups', authenticateUser,bloodGroupController.getAllBloodGroups);
router.get('/blood_group/editBloodGroup/:blood_group_id', authenticateUser,bloodGroupController.editBloodGroup);
router.put('/blood_group/updateBloodGroup/:blood_group_id', authenticateUser,bloodGroupController.updateBloodGroup);
router.put('/blood_group/updateBloodGroupStatus/:blood_group_id/status', authenticateUser,bloodGroupController.updateBloodGroupStatus);
router.get('/blood_group/getBloodGroupAll', authenticateUser,bloodGroupController.getBloodGroupAll);

router.post('/country/createCountry',authenticateUser,countryController.createCountry)
router.get('/country/getAllCountrys', authenticateUser,countryController.getAllCountrys);
router.get('/country/editCountry/:country_id', authenticateUser,countryController.editCountry);
router.put('/country/updateCountry/:country_id', authenticateUser,countryController.updateCountry);
router.put('/country/updateCountryStatus/:country_id/status', authenticateUser,countryController.updateCountryStatus);
router.get('/country/getCountryAll', authenticateUser,countryController.getCountryAll);

router.post('/state/createState',authenticateUser,stateController.createState)
router.get('/state/getAllStates', authenticateUser,stateController.getAllStates);
router.get('/state/editState/:state_id', authenticateUser,stateController.editState);
router.put('/state/updateState/:state_id', authenticateUser,stateController.updateState);
router.put('/state/updateStateStatus/:state_id/status', authenticateUser,stateController.updateStateStatus);
router.get('/state/getStateAll', authenticateUser,stateController.getStateAll);

router.post('/city/createCity',authenticateUser,cityController.createCity)
router.get('/city/getAllCities', authenticateUser,cityController.getAllCities);
router.get('/city/editCity/:city_id', authenticateUser,cityController.editCity);
router.put('/city/updateCity/:city_id', authenticateUser,cityController.updateCity);
router.put('/city/updateCityStatus/:city_id/status', authenticateUser,cityController.updateCityStatus);
router.get('/city/getCityAll', authenticateUser,cityController.getCityAll);

router.post('/location/createLocation',authenticateUser,locationController.createLocation)
router.get('/location/getAllLocations', authenticateUser,locationController.getAllLocations);
router.get('/location/editLocation/:location_id', authenticateUser,locationController.editLocation);
router.put('/location/updateLocation/:location_id', authenticateUser,locationController.updateLocation);
router.put('/location/updateLocationStatus/:location_id/status', authenticateUser,locationController.updateLocationStatus);
router.get('/location/getLocationAll', authenticateUser,locationController.getLocationAll);

router.post('/organization/createOrganization',authenticateUser,organizationController.createOrganization)
router.get('/organization/getAllOrganizations', authenticateUser,organizationController.getAllOrganizations);
router.get('/organization/editOrganization/:organization_id', authenticateUser,organizationController.editOrganization);
router.put('/organization/updateOrganization/:organization_id', authenticateUser,organizationController.updateOrganization);
router.put('/organization/updateOrganizationStatus/:organization_id/status', authenticateUser,organizationController.updateOrganizationStatus);
router.get('/organization/getOrganizationAll', authenticateUser,organizationController.getOrganizationAll);


module.exports = router;
