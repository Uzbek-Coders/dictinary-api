import mongoose from 'mongoose'


const User = new mongoose.Schema({
    username: {
        require: true,
        type: String,
        unique: true
    },
    password: {
        require: true,
        type: String,
        unique: true
    },
    roles: [{
        type: String,
        ref: 'Role'
    }]
})


export default mongoose.model('User', User)
