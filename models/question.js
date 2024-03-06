const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    no: Number,
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    ans: Number,
})

const qa = mongoose.model('Question', questionSchema)
module.exports = qa