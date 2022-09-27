const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://tiya:post24@cluster0.qh8z9se.mongodb.net/libraryDB?retryWrites=true&w=majority');

const UserSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    age:Number,
    gender:String,
    role:String,
    email:String,
    password:String,
    confirmpassword:String
});

var UserData = mongoose.model('userset',UserSchema);
module.exports = UserData;