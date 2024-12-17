const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    phone: {type:Number, required: true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required: true}
});

module.exports = mongoose.model('Userz',userScheme);