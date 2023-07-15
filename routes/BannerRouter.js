const express = require("express");
const bannerRouter = express.Router()
const { getBanner } = require("../controllers/BannerController");



bannerRouter.get("/images",getBanner)

module.exports = bannerRouter