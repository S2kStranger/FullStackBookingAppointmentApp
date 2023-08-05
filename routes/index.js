const express = require('express');
const router = express.Router();

const path = require('path');

const indexController=require('../controller/index');

router.get('/',(req,res,next) => {
    res.sendFile(path.join(__dirname,'..','views','index.html'));
});

router.get('/getUsers',indexController.getMessages);

router.post('/postUser',indexController.postData);

router.get('/getUser/:id',indexController.getUser);

router.delete('/deleteUser/:id',indexController.deleteUser);''

router.patch('/updateDetails/:id',indexController.updateUser);

module.exports=router;

