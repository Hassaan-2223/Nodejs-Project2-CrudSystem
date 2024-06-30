const express = require("express");
require("../db/conn");
const userdata = require("../models/userdata");
const app = express();



const getuser = (req,res, next)=>{
    userdata.find({}, (err, documents) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal server error');
        }
        
        // console.log(documents[0].name);
        res.render('index', { documents });

        next();
      });
}

// const getuser = (req, res, next) => {
//   userdata.find({}, (err, documents) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Internal server error');
//     }
//     req.documents = documents; // add the documents to the request object
//     next();
//   });
// };


module.exports = getuser;