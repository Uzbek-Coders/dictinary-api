import pkg from 'mongoose';
const {Schema, model} = pkg

const User = new Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, unique: true, require: true},
    roles: [{type: String, ref: "Role"}]
})

export default model("User", User);