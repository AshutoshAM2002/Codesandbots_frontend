//////////////////////////DEPENDENCIES//////////////////////
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const cookies = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require('cors');
require("./config/mongoose");

///////////////////////PORT///////////////////
const PORT = process.env.PORT || 3000;
//////////////////////MONGOOSE CONNECTION///////////////////
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cookies());
app.use(cors());

app.set("view engine", "ejs");

// for admin
const studentDetails = require("./controllers/Admin/studentDetails");
app.use(studentDetails);

// student live class registration
const studentLiveRegistration = require("./controllers/LiveClassRegistration/register");
app.use(studentLiveRegistration);

// ecommerce 
const prodRoute = require("./controllers/Ecom/productRoute");
const addressRoute = require("./controllers/Ecom/addressRoute");
const paymentRoute = require("./controllers/Ecom/paymentRoute");
app.use(prodRoute);
app.use(addressRoute);
app.use(paymentRoute);

// login and signup as a student
const userValidateRoute = require("./controllers/Users/user");
app.use(userValidateRoute);

// login and signup as a tecaher
const teacherValidateRoute = require("./controllers/Users/teacher");
app.use(teacherValidateRoute);

// courses
const coursesRoute = require("./controllers/Users/courseApi");
app.use(coursesRoute);

// buy courses
const buyCourses = require("./controllers/Users/payments");
app.use(buyCourses);

// create and modify the batch for any courses
const batchTasks = require("./controllers/Users/batchApi");
app.use(batchTasks);

// operations for live classes:
const liveClass = require("./controllers/Users/liveclassApi");
app.use(liveClass);

// live class rating and reviews
const liveClassRating = require("./controllers/Users/liveclassReviewApi");
app.use(liveClassRating);


app.get("/", (req, res) => {
       res.send(`<h1>Server is Started</h1>`);
});



app.listen(PORT,function(){
    console.log(`Server Started at PORT ${PORT}`);
});
