const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/NotesWorld",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("dbconsuccessfull"))
.catch((e)=>console.log(e))
