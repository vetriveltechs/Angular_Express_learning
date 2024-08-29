const express=require('express')

const app=express();

const fs = require('fs');


const path=require('path');

const rootdir=require('../utils/path');

const bodyParser=require('body-parser');

const router=express.Router();

// const dbo=require('../db');

const CarrersModel=require('../models/carrers_model');

const FaqModel=require('../models/faq_model');

const BlogModel=require('../models/blog_model');

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({ extended: true }));

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/blog');
    },
    filename: function (req, file, cb) {
        // Use a placeholder for the primary key value
        const primaryKey = 'placeholder'; // This will be replaced with the actual primary key value later
        cb(null, primaryKey + '-' + file.originalname);
    }
});


const upload = multer({
    storage:storage,
    dest: 'public/uploads/blog',
    limits: { fileSize: 10 * 1024 * 1024 } // Adjust as needed (10MB in this example)
});


router.get('/blog', async(req, res, next) => {
    blog_result=await BlogModel.find({})
    res.render('blog_page',{
        tittle:'BLOG Page',
        blog_result,
        blog_list:true
    })
});

router.get('/blog/create', async(req, res, next) => {

    blog_result=await BlogModel.find({})

    res.render('blog_page',{
        tittle:'BLOG CARRER PAGE',
        blog_result,
        blog_create:true
    })
});

router.get('/blog/edit/', async (req, res, next) => {

    if(edit_id=req.query.edit_id){
        blog_result=await BlogModel.findById(edit_id)
        res.render('blog_page',{
            tittle:'BLOG EDIT PAGE',
            blog_result,
            blog_edit:true,
            edit_id,
            edit_result:true,
            view_result:false
        })
    }
    if(view_id=req.query.view_id){
        blog_result=await BlogModel.findById(view_id)
        res.render('blog_page',{
            tittle:'BLOG VIEW PAGE',
            blog_result,
            blog_edit:true,
            view_id,
            edit_result:false,
            view_result:true
        })
    }
});

router.post('/blog/edit',upload.single('image'), async (req, res, next) => {


    try {
        const create_data = await BlogModel.create({
            tittle: req.body.tittle ? req.body.tittle : '',
            description: req.body.description ? req.body.description : ''
        });

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const primaryKey = create_data.blog_id.toString();
        const filename = primaryKey+'.jpg';
        fs.renameSync(req.file.path, path.join(req.file.destination, filename));
        res.redirect(`/blog/edit?edit_id=${primaryKey}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/blog/edit/:id', upload.single('image'),async (req, res) => {
    try {
        const edit_id = req.params.id;


        if (req.file) {

            const filename = edit_id + '.jpg';
            const newFilePath = path.join(req.file.destination, filename);

            console.log(newFilePath);

            if (fs.existsSync(newFilePath)) {

                fs.unlinkSync(newFilePath);
            }
            fs.renameSync(req.file.path, newFilePath);
        } else {

            console.log('No image data uploaded.');
        }

        const updatedFields = {
            tittle: req.body.tittle || '',

            description: req.body.description || ''
        };

        updatedFields.image = '/uploads/blog/' + edit_id + '.jpg';

        const updatedBooking = await BlogModel.findByIdAndUpdate(edit_id, updatedFields, { new: true });

        if (!updatedBooking) {
            return res.status(404).send('Booking not found.');
        }


        res.redirect(`/blog/edit?edit_id=${edit_id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports=router;
