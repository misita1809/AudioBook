// Submitted By:
// Anjali Rakholiya (C0793400) Ayush Kumar Singh (C0799530)
// Dashmeet Kaur (C0800265) Misita Sankhala (C0807324)
// Parampreet Kaur Gill (C0796418) Tarun Dutt (C0784296)

const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
//     gender : String,
//     status : String
})

const Userdb = mongoose.model('user', schema);

module.exports = Userdb;