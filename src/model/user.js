import mongoose from '../lib/db.js'
const {Schema, model} = mongoose;

const User = new Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, unique: true, require: true},
    roles: [{type: String, ref: "Role"}]
})

export default model("User", User);