const mongoose = require('mongoose');
let Application = require("../../models/Application");
const express = require('express');
const router = express.Router();

let User = require('../../models/User');

// Create a property
router.post("/renter/application/create/", async (req, res) => {
    console.log("In post router", req.body.user.email)
    try {
    if (req.body) {

    } else {
        console.log("No request body")
    }
    const newApplication = new Application(req.body);
    const saveApplication = await newApplication.save();

    console.log('--new Prop', saveProperty._id);
    const populateUser = await User.update({email: req.body.user.email}, {$push: {application: mongoose.Types.ObjectId(saveApplication._id)}})
    console.log(populateUser)
    res.send({sucess: true});
    } catch(err) {
        console.log(err)
        res.sendStatus(400);
    }
});