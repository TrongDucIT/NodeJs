import express from "express";
import homeController from "../controller/homeController";
import path from 'path';
import multer from 'multer';
var appRoot = require('app-root-path');

let router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
//exports.imageFilter = imageFilter;
let upload = multer({ storage: storage, fileFilter: imageFilter });


const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/detail/user/:id', homeController.getDetailPage);
    router.post('/create-new-user', homeController.createNewUser)
    router.post('/delete-user', homeController.deleteUser);

    router.get('/edit-user/:id', homeController.getEditPage);
    router.post('/update-user', homeController.updateUser);

    router.get('/upload', homeController.getUploadFilePage);
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile)
    router.post('/upload-multiple-images', upload.array('multiple_images', 10), homeController.handleUploadMultipleFile)




    router.get('/duc', (req, res) => {
        res.send('Co cai dell gi dau ma doc!')
    })
    return app.use('/', router)//ki hieu tien to truoc route
}

//module.exports = initWebRoute;
export default initWebRoute;