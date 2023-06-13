const express = require("express");
const { allUsers , createUser , deleteUser , updateUser , singleUser , userLogin, loginUserDetail} = require("../controllers/UserController");
const { validation } = require("../controllers/Validation");
const userRouter = express.Router() ;

// route for fetch all users
userRouter.get("/allusers",allUsers)

// route for creating a new user
userRouter.post("/create",validation,createUser)

// route for deleting a user
userRouter.delete("/delete/:id",deleteUser)

// router for updating a user
userRouter.put("/update/:id" ,updateUser)

// route for single user
userRouter.get("/singleuser/:id",singleUser)


// route for user login and authentication
userRouter.post("/auth/login",userLogin)
userRouter.post("/auth/user/details",loginUserDetail)


module.exports = {
    userRouter
}