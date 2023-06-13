const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const { Connection } = require("./database/db");
const { userRouter } = require("./routes/UserRoutes");
const { categoryRouter } = require("./routes/CategoryRoutes");
const { productRouter } = require("./routes/ProductRoutes");
const Product = require("./database/models/ProductModel");



dotenv.config();
Connection();
const app = express();



app.use(bodyparser.json({extended:true}))
app.use(bodyparser.urlencoded({extended:true}))
app.use(cors())

// const p = Product.create({
//     category: "Sarees",
//       img:"https://image.lexica.art/full_jpg/2e9ec1d6-adbd-46ed-a0d3-dc8e8d81b60c",
//     name: "silk saree",
//     price: 1000,
// })



app.use("/accounts/user",userRouter)
app.use("/categories",categoryRouter)
app.use("/products",productRouter)

app.listen(process.env.PORT , ()=>{
    console.log("server started")
})