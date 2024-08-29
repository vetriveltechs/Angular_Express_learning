const express=require('express')

const app=express();

const fileUpload = require('express-fileupload');

app.use(fileUpload());

app.use(express.static('public'));

const fs = require('fs');

const path=require('path');

const rootdir=require('../utils/path');

const bodyParser=require('body-parser');

const router=express.Router();

const dbo=require('../db');

const CarrersModel=require('../models/carrers_model')

const FaqModel=require('../models/faq_model')

const BlogModel=require('../models/blog_model')

const ServiceBookingModel=require('../models/service_booking_model')

const csv = require('csv-parser');

const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/settings');
    },
    filename: function (req, file, cb) {
        // Use a placeholder for the primary key value
        const primaryKey = 'placeholder'; // This will be replaced with the actual primary key value later
        cb(null, primaryKey + '-' + file.originalname);
    }
});


const upload = multer({
    storage:storage,
    dest: 'public/uploads/settings',
    limits: { fileSize: 10 * 1024 * 1024 } // Adjust as needed (10MB in this example)
});


router.get('/edit_profile', async(req, res, next) => {
    edit_result=await CarrersModel.find({})
    res.render('edit_profile',{
        tittle:'EDIT PROFILE PAGE',
        edit_result,
        edit_list:true,
        header_show:true
    })
});

module.exports=router;
