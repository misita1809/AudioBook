// Submitted By:
// Anjali Rakholiya (C0793400) Ayush Kumar Singh (C0799530)
// Dashmeet Kaur (C0800265) Misita Sankhala (C0807324)
// Parampreet Kaur Gill (C0796418) Tarun Dutt (C0784296)

const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id : {
        type : String,
        required: true
        // unique: true
    },
    title : {
        type: String,
        required: true,
        unique: true
    },
    author : {
        type: String,
        required: true,
        unique: true
    },
    likes : {
        type: String,
        required: true,
        // unique: true
    },
    rating : {
        type: String,
        required: true,
        // unique: true
    },
    categories : {
        type: String,
        required: true,
        // unique: true
    },
    content : {
        type: String
    }
})

const Userdb = mongoose.model('books', schema);

module.exports = Userdb;