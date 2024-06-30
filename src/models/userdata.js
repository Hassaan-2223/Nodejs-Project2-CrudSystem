const moongose = require("mongoose");
// const validate = require("validator");



const userschema = new moongose.Schema({
    name:{
        type:String,
        required: true,
        minlength:3
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    phone:{
        type:Number,
        required: true
    }
})


const userdata = new moongose.model("userdata",userschema);

module.exports = userdata;