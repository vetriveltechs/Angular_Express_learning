const express=require('express')

const app=express();

const path=require('path');

const rootdir=require('../utils/path');

const bodyParser=require('body-parser');

const router=express.Router();

// const dbo=require('../db');

const CarrersModel=require('../models/carrers_model')

const FaqModel=require('../models/faq_model')

const BlogModel=require('../models/blog_model')

const HomesModel=require('../models/home_model')

const ApiModel=require('../models/api_model')

const ServiceBookingModel=require('../models/service_booking_model')

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({ extended: true }));

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



router.get('/api', async(req, res, next) => {
    apis_result=await ApiModel.find({})
    res.render('api_page',{
        tittle:'API PAGE',
        apis_result,
        apis_list:true
    })
});
router.get('/api/create', async(req, res, next) => {
    
    apis_result=await ApiModel.find({})
    
    res.render('api_page',{
        tittle:'CREATE API PAGE',
        apis_result,
        apis_create:true
    })
});

app.post('/enroll', function(req, res) {  
    console.log(req.body);  
    res.status(200).send({  
        'messege': 'data recived'  
    })  
})  



router.post('/api/edit', async (req, res) => {
    try {
        const { name, experience, contact_number, mail_id } = req.body;

        // Log the received data to ensure it's correct
        console.log('Received Data:', { name, experience, contact_number, mail_id });

        const createData = await ApiModel.create({
            name: name || '',
            experience: experience || '',
            contact_number: contact_number || '',
            mail_id: mail_id || '',
        });

        console.log('Created Data:', createData);

        res.status(201).json({ success: true, message: 'Data created successfully', data: createData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});



router.post('/api/edit/:id', upload.single('image'), async (req, res, next) => {
    const edit_id = req.params.id; // Corrected parameter name
    
    const create_data = await ApiModel.findByIdAndUpdate(
        { _id: edit_id },
        {
            name: req.body.name ? req.body.name : '',
            experience: req.body.experience ? req.body.experience : '',
            contact_number:req.body.contact_number ? req.body.contact_number : '',
            mail_id:req.body.mail_id ? req.body.mail_id : '',
    
        },
        { new: true }
    );


    res.redirect('/');
    
});


router.get('/api/edit/', async (req, res, next) => {
    
    if(edit_id=req.query.edit_id){ 
        apis_result=await ApiModel.findById(edit_id)
        res.render('api_page',{
            tittle:'EDIT API PAGE',
            apis_result,
            apis_edit:true,
            edit_result:true,
            view_result:false
        })
        
    }
    if(view_id=req.query.view_id){ 
        apis_result=await ApiModel.findById(view_id)
        res.render('api_page',{
            tittle:'VIEW API PAGE',
            apis_result,
            apis_edit:true,
            view_id,
            edit_result:false,
            view_result:true
        })   
    }  
    
    
});


router.get('/api/service_booking', async (req, res) => {
    try {
      const bookings = await ServiceBookingModel.find();
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'An error occurred while fetching bookings' });
    }
  });

module.exports=router;