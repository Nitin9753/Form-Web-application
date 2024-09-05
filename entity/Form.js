const mongoose = require("mongoose")

const inputSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['email', 'text', 'password', 'number', 'date'],
        require: true
    },
    title: {
        type: String,
        require: true
    },
    placeholder: {
        type: String
    },
    section: {
        type: String,
        require: true
    }
});

const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    inputs: [inputSchema]
})

const Form=mongoose.model('Form', formSchema);
module.exports=Form;