const  express = require("express");
const  path = require("path");
const  bodyParser = require("body-parser");
const  cors = require("cors");
const poll= require("./routes/poll");
const db = require("./config/database");


const  mongoose = require("mongoose");

mongoose.connect(db.database, {useNewUrlParser: true})
.then(() => console.log("mongodb connected to "+db.database ) )
.catch(err => console.log(err));




const app = express();


app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req,res)=> {
    res.send("invalid endpoint");

});
/*
app.get("*", (req,res)=> {
    res.sendFile(path.join(__dirname,"public/index.html"));

});
*/




app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})) 


app.use("/poll", poll);

const port = 3000;

app.listen(port ,()=>{
    console.log("server running on port "+ port);
});
