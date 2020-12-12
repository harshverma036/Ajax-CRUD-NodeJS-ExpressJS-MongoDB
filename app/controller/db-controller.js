const mongoose = require('mongoose');
const User = require('../models/db-model');

// home route
module.exports.home = (req, res) => {
    res.render('index');
}
// get all datas
module.exports.getAllUsers = (req, res) => {
    User.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => console.log('error occured while fetching data from database'))
}
// add users
module.exports.insertUser = (req, res) => {
    console.log(req.body);
    const newUser = new User({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        contact: req.body.contact
    });
    newUser.save()
        .then(() => res.send('Successfully Inserted!'))
        .catch((err) => res.send('Error occured, cannot insert data ' + err))
}
// delete users
module.exports.deleteUser = (req, res) => {
    const del = req.body.deleteID;
    User.findByIdAndDelete(del)
        .then(() => res.send(`User successfully Deleted ID: ${del}`))
        .catch((err) => console.log(`Failed to delete user Error: ${err}`))
}
// get update record
module.exports.getUpdateRecords = (req, res) => {
    const uid = req.params.updateID;
    // console.log(uid);
    User.findById(uid)
        .then((data) => res.send(data))
        .catch((err) => console.log(`Error occured: ${err}`))
}
// update record
module.exports.updateUser = (req, res) => {
    const ud = req.body.updid;
    const fn = req.body.fname;
    const ln = req.body.lname;
    const em = req.body.email;
    const ct = req.body.contact;
    User.updateOne({ _id: ud }, { firstName: fn, lastName: ln, email: em, contact: ct })
        .then(() => res.send(`User Sucessfully Updated`))
        .catch((err) => res.send(`Error occured while updating ${err}`))
}