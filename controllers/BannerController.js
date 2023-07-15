const Banner = require("../database/models/BannerModel")

const getBanner = async(req,res)=>{
    try {
        const bannerImages = await Banner.find({});
        res.json({success:true, bannerImages})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

module.exports = {
    getBanner
}