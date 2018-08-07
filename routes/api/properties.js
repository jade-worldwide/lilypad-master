const mongoose = require('mongoose');
let Property = require("../../models/Property");
let Application = require("../../models/Application");
const express = require('express');
const router = express.Router();

let User = require('../../models/User');

// Property Controllers

// View all properties
router.post("/results", (request, response) => {
    const { dbQuery } = request.body

    console.log('body >>', request.body)

    Property
        .find(dbQuery)
        .sort({ date: -1 })
        .then(dbModel => response.json(dbModel))
        .catch(err => {
            console.log('dbError', err)
            response.status(422).json(err)
        });
});

// View one property
router.get("/property/:id", (req, res) => {
    if (req.params.id === "undefined") {
        console.log("No property ID detected")
    } else {
        Property
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
});

// Create a property
router.post("/manager/property/create/", async (req, res) => {
    console.log("In post router", req.body.user.email)
    try {
    if (req.body) {

    } else {
        console.log("No request body")
    }
    const newProperty = new Property(req.body);
    const saveProperty = await newProperty.save();

    console.log('--new Prop', saveProperty._id);
    const populateUser = await User.update({email: req.body.user.email}, {$push: {property: mongoose.Types.ObjectId(saveProperty._id)}})
    console.log(populateUser)
    res.send({sucess: true});
    } catch(err) {
        console.log(err)
        res.sendStatus(400);
    }

});

// Edit a property
router.put("/property/update/:id", (req, res) => {
    Property
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

// Delete a property
router.delete("/property/delete/:id", (req, res) => {
    Property
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

router.put("/renter/application/request", async (req, res) => {
    try {
    const {propertyId, applicationId, userEmail} = req.body;
    console.log('--new Prop', propertyId, userEmail);
    
    const getUserApplication = await Application.findOne({emailAddress: userEmail});
    console.log(getUserApplication, '--current')
    const populateProperty = await Property.update({
        _id: propertyId
    }, 
    {$push: {
            application: mongoose.Types.ObjectId(getUserApplication._id)
        }
    })
    console.log(populateProperty)
    res.send({sucess: true});
    } catch(err) {
        console.log(err)
        res.sendStatus(400);
    }

});


// Start of Applications

// Create a property
router.post("/renter/application/create/", async (req, res) => {
    console.log("In post router", req.body.user.email)
    try {
    if (req.body) {
        console.log(req.body)
    } else {
        console.log("No request body")
    }
    const newApplication = new Application(req.body);
    const saveApplication = await newApplication.save();

    console.log('--new Prop', saveApplication._id);
    const populateRenter = await User.update({email: req.body.user.email}, {$push: {application: mongoose.Types.ObjectId(saveApplication._id)}})
    console.log(populateRenter)
    res.send({sucess: true});
    } catch(err) {
        console.log(err)
        res.sendStatus(400);
    }
});

// Create a property
router.post("/propertyLike", async (req, res) => {
    console.log("In post router", req.body.user.email)
    try {
    if (req.body) {
        console.log(req.body)
    } else {
        console.log("No request body")
    }
    const newProperty = new PropertyLike(req.body);
    const saveProperty = await newProperty.save();

    console.log('--new Prop', saveProperty._id);
    const populateRenter = await User.update({email: req.body.user.email}, {$push: {propertylike: mongoose.Types.ObjectId(saveProperty._id)}})
    console.log(populateRenter)
    res.send({sucess: true});
    } catch(err) {
        console.log(err)
        res.sendStatus(400);
    }

});

// View one property
router.get("/application/:id", (req, res) => {
    if (req.params.id === "undefined") {
        console.log("No property ID detected")
    } else {
        Application
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
});


module.exports = router;
