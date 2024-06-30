const express = require("express");
require("./db/conn");
const userdata = require("./models/userdata");
const app = express();
const path = require("path");
const hbs = require("hbs");


const getuser = require("./middleware/getuser");

// to use patch in form 
const methodOverride = require('method-override');

app.use(methodOverride('_method'));


const port = process.env.PORT || 8000;

const staticpath = path.join(__dirname,"../public");
const templatepath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");

app.use(express.static(staticpath));

app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialpath);


app.use(express.json());
app.use(express.urlencoded({
    extended:false
}))




app.get("/", getuser, (req, res) => {

    // {} it gives the condition if empty means no condition we want everything from the database and then
    // call back function in which documents is array of all the documents
    // userdata.find({}, (err, documents) => {
    //     if (err) {
    //       console.error(err);
    //       return res.status(500).send('Internal server error');
    //     }
        
    //     // console.log(documents[0].name);
    //     res.render('index', { documents });
    //   });

    // userget();

    
  });


app.get("/addmember",(req,res)=>{
    res.render("addmember");
})




app.post("/add",getuser, async(req,res)=>{
    const newperson = new userdata(req.body);
    
    const user = await newperson.save();
})




// app.get("/edit",(req,res)=>{
//     res.render("edit");
// })



// app.get("/edit/:id",async(req,res)=>{

//     console.log(req.params.id);
//     res.render("edit");

// })



app.get("/edit/:id", async (req, res) => {
    try {
      const user = await userdata.findById(req.params.id);
      console.log(user.id);
      res.render("edit", { user });
    } catch (error) {
      res.status(400).send(error);
    }
  });


app.patch("/edit/:id" , async(req,res)=>{
    try {

        // console.log('hi');

        const userid = req.params.id;

        updated_data = req.body;

        console.log(updated_data);

        const user_update = await userdata.findByIdAndUpdate(userid,updated_data);
        await user_update.save();

        res.redirect("/");

    } catch (error) {
        res.status(400).send(error);
    }
  

})


app.delete("/delete/:id",async(req,res)=>{
  try {
    const delid = req.params.id;
    
    await userdata.findByIdAndDelete(delid);
    // res.render("edit");
    // res.send('deleted');
  } catch (error) {
    res.send(error);
  }
  

  
})


app.listen(port,(req,res)=>{
    console.log('listening');
})



