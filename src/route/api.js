import express, { Router } from "express";
import ApiController from '../controller/ApiController';

let router = express.Router();

const initApiRoute = (app) => {
    router.get('/users', ApiController.getAllUsers); // method GET
    router.post('/create-users', ApiController.createNewUser); // method POSt
    router.put('/update-user', ApiController.updateUser);
    router.delete('/delete-user/:id', ApiController.deleteUser);

    return app.use('/api/v1', router)//ki hieu tien to truoc route
}

module.exports = initApiRoute;