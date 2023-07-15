const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema({
    images: [{
        type: String,
        required: true
    }]
})

const banner = mongoose.model("banner",bannerSchema);

module.exports = {
    banner
}