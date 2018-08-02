const  express = require("express");
const router = express.Router();
const Pusher = require('pusher');

const  path = require("path");
const  bodyParser = require("body-parser");
const  cors = require("cors");

const  mongoose = require("mongoose");
const config = require("../config/database");
const vote = require("../models/vote");

var pusher = new Pusher({
    appId: '569934',
    key: '1262a08e292cdf5748e2',
    secret: 'a2f5954bbc31f48ab1b0',
    cluster: 'ap2',
    encrypted: true
  });

router.get("/", (req, res)=> {
    vote.find().then(votes => {
        res.json({success:true, votes: votes});
    });

});

router.post("/", (req, res)=>{

    const newVote = {
        os:req.body.os,
        points:1
    }

    new vote(newVote).save().then(v => {
        
        pusher.trigger('os-poll', 'vote', {
        points: parseInt(v.points),
        os: req.body.os
      });

    return res.json({success:true , msg: "Thank you for voting"})


    })
    
});

module.exports = router;