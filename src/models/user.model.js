const {Schema, model} = require('mongoose')

const User = new Schema({ 
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true
    }

},{timestamps: true})

const user = model('users', User)
module.exports = user 