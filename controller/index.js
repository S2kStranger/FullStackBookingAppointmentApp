// const express = require('express');
// const router = express.Router();
const path = require('path');

const User = require('../models/user');

exports.getMessages =(req,res,next) => {

    User.findAll()
    .then(users => {
        res.status(200).json({allusers: users});
    })
    .catch(err => console.log(err));
};

exports.postData = (req,res,next) => {   
    
    //console.log(req.body);
    if(!req.body.phone_no || !req.body.email)
    {
        throw new Error("Fields cannot be empty");
    }
    const name=req.body.name;
    const email=req.body.email;
    const phone_no=req.body.phone_no;

    
    
       // console.log("entered in postdata");
        User
        .create({
            name : name,
            email : email,
            phone_no : phone_no
        })
        .then(user => {
            res.status(200).json({userdata: user});
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
    
}

exports.updateUser = (req,res,next) =>  {
    if(!req.body.phone_no || !req.body.email)
    {
        throw new Error("Fields cannot be empty");
    }
    const userid=req.params.id;
    console.log(userid);
    console.log(req.body);
    const name=req.body.name;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    
    User.findByPk(userid)
        .then(user => {
            user.name = name;
            user.email = email;
            user.phone_no = phone_no;
            return user.save();
        })
    //  User.update({
    //     name : req.body.name,
    //     email : req.body.email,
    //     phone_no : req.body.phone_no
    // }, {where : {id: userid}})
        .then(result => {
            res.status(200).json({updatedUser : result});
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

exports.getUser = (req,res,next) => {
    const userid = req.params.id;
    // console.log(userid);
    // console.log(req.body);
    User.findByPk(userid)
        .then(result => {
            res.status(201).json({userdata: result});
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

exports.deleteUser = (req,res,next) => {
    const userid = req.params.id;
    //console.log(userid);
    User.findByPk(userid)
        .then(user => {
            return user.destroy();
        })
        .then(result => {
            //console.log("destroyed");
            res.sendStatus(200);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });

}

