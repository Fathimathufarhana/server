import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true })

const Admin = model("Admin", AdminSchema);

export default Admin;