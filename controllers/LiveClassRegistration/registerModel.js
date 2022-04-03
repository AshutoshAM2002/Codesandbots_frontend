const mongoose = require('mongoose'); 

const liveRegisterSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email : {
        type: String, 
        required: true
    },
    phoneNo :{
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    }
    
}, {
    timestamps: true
});

const LiveRegister = mongoose.model("LiveRegister", liveRegisterSchema);

module.exports = LiveRegister;