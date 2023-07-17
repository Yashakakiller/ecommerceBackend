const express = require("express");

const { getContactRequest } = require("../controllers/ContactController");
const contactRouter = express.Router()






contactRouter.post("/", getContactRequest  )

module.exports = {contactRouter}