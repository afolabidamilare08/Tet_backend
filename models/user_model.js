const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: { type: String, required: true, },
    sectors: { type: Array, required: true, unique: false },
    agree_to_terms: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})


const User = mongoose.model("User", UserSchema)

module.exports = User