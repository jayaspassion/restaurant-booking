require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");


// Express
var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`server started on port : ${PORT}`) });


// MongoDB
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
var db = mongoose.connection;


// Routes
app.use("/availability", require("./api/routes/availabilityRoute"));
app.use("/reserve", require("./api/routes/reservationRoute"));



// app.use(cors());

// for parsing application/json
app.use(express.json());

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", _ => {
  console.log("Connected to DB");
});


if(process.env.NODE_ENV === "production")
{
    app.use(express.static('client/build'));
}



module.exports = app;
