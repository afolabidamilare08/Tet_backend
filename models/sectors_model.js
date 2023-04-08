const mongoose = require('mongoose')

const SectorSchema = new mongoose.Schema({
    sector_name: { type: String, required: true, },
    sector_sub: { type: Array, required: true, unique: false },
}, {
    timestamps: true
})


const Sector = mongoose.model("Sector", SectorSchema)

module.exports = Sector