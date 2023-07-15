const { Banner } = require("../database/models/BannerModel")


const getBannerImages = async (req, res) => {
    try {
      const bannerImages = await Banner.find({}).lean();
      res.json({ success: true, bannerImages });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  

const addBannerImage = async (req, res) => {
    try {
      const {bannerImage} = await req.body
      const bannerNewImage = await Banner.create({bannerImage});
      res.json({ success: true, bannerNewImage });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }



module.exports= {
    getBannerImages,
    addBannerImage
}