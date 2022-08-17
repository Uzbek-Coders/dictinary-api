import mongoose from '../lib/db.js';
const {Schema, model} = mongoose;

const Role = new Schema({
    value: {type: String, unique: true, default: "USER"},
})

export default model("Role", Role)