const express = require('express');
const bodypar = require('body-parser');
const cors = require('cors');
require("./database/connectionofdbase");
const regloguser = require("./dbmodels/regiloguser")
const regusernote = require("./dbmodels/regiusersnotes")
const webeesignupsub = express();
webeesignupsub.use(cors());
webeesignupsub.use(bodypar.json());
const interarrsignup = [];
webeesignupsub.post('/',(req,res)=>{
    const u = req.body;
    interarrsignup.push(u);
    const dtaaa = new regloguser({emailId:req.body.emainew,
        password:req.body.passdnew})
        dtaaa.save();
        res.send("hiii");
});
webeesignupsub.get('/',(request,response)=>{
    response.send("hi");
    console.log("bye");
})
webeesignupsub.listen(4000,()=>{
    console.log("Express connection successfull for User Registration");
});
const webeeloginch = express();
webeeloginch.use(cors());
webeeloginch.use(bodypar.json());
let interarrlogin = [];
webeeloginch.post('/',(req,res)=>{
    interarrlogin = [req.body.emaich,req.body.passdch];
    regloguser.find({
        emailId:{$eq:interarrlogin[0]},
        password:{$eq:interarrlogin[1]}
    })
    .then((resp)=>res.send(resp))
    .catch((e)=>console.log(e));
});
webeeloginch.get('/',(req,res)=>{
    console.log("hello");
})
webeeloginch.listen(4001,()=>console.log("Express connection successfull for User Login Process"));

const notesubm = express();
notesubm.use(cors());
notesubm.use(bodypar.json());
let interarrnotesubm = [];
notesubm.post('/',(req,res)=>{
   regusernote.updateOne({notenumber:req.body.indexofnote,pswd:req.body.hpswd},{$set:{notenumber:req.body.indexofnote,emailaddress:req.body.emailAddr,notetitle:req.body.titleofnote,note:req.body.notecontent}},{new:true,upsert:true})
   .then((resp)=>res.send(resp));
});
notesubm.get('/',(req,res)=>{
    res.send("webee");
    console.log("bye");
})
notesubm.delete('/:inx/:paswd',(req,res)=>{
    let notenumber = req.params.inx;
    let pswd = req.params.paswd;
    regusernote.findOneAndDelete({notenumber,pswd})
    .then((resp)=>res.send(resp));
})
notesubm.listen(4002,()=>console.log("Express connection successfull for User note store"));