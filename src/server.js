import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initApiRoute from './route/api';
//import connection from './configs/connectDB';

require('dotenv').config();
var morgan = require('morgan');


const app = express()
const port = process.env.PORT;//link den cong port 8080
app.use(morgan('combined'));
//cau hinh cho du lieu nguoi dung gui len server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//setuo viewEngine
configViewEngine(app);
//initWebRoute
initWebRoute(app);
// initApiRoute
initApiRoute(app);
//middleware 404 not found
app.use((req, res) => {
    return res.render('404.ejs')
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})