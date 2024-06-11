import React, { useState, useEffect } from 'react';
import "../components/Notesarea.css";
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { valueNullforlogin } from './Regilog';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';

export default function NotesArea() {
  const [newnoteofuser, setNewnoteofuser] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const locate = useLocation();
  const navigate = useNavigate();
  function localstorecontent(){ const data = localStorage.getItem('note');
  if(data){
    setNewnoteofuser(JSON.parse(data));
    setFilterdata(JSON.parse(data));
  }
}
  useEffect(() => {
    console.log(newnoteofuser);
  }, [newnoteofuser]);
  useEffect(()=>{
    localstorecontent();
  },[])
  function afterLogout(){
    navigate("/Register",{replace:true});
  }
  function editNotesopen(inx){
    const rjsiefj = newnoteofuser.map((val,r)=>
    r===inx?{...val, openedit:true}:val);
    setNewnoteofuser(rjsiefj);
    setFilterdata(rjsiefj);
  }
  function editNotesclose(inx){
    const rjsiefj = newnoteofuser.map((val,r)=>
    r===inx?{...val, openedit:false}:val);
    setNewnoteofuser(rjsiefj);
    setFilterdata(rjsiefj);
  }
  if(valueNullforlogin===0){
   var pllogin =  <div>
    <p>Please Login </p>
    <Link to="/Register">Login Page</Link>
    </div>
  }
  else{
    function createnewnote(){
      setNewnoteofuser([...newnoteofuser,{}]);
      setFilterdata([...filterdata,{}]);
    }
    function deletenote(inx){
      let qwoe = [...newnoteofuser];
      qwoe.splice(inx,1);
      setNewnoteofuser(qwoe);
      setFilterdata(qwoe);
      let paswd = locate.state.passwrd;
      axios.delete(`http://localhost:4002/${inx}/${paswd}`)
      .then(()=>console.log("data deleted"))
    }
    function titlesubmit(e,inx){
      const dfvf = [...newnoteofuser];
      dfvf[inx].notetitle = e.target.value;
      setNewnoteofuser(dfvf);
      setFilterdata(dfvf);
    }
    function notecontentsubmit(e,inx){
      const dfvf = [...newnoteofuser];
      dfvf[inx].notewrittencontent = e.target.value;
      setNewnoteofuser(dfvf);
      setFilterdata(dfvf);
    }
    function searchfunctionalty(e){
      if(e.target.value===''){
        setNewnoteofuser(filterdata);
      }
      else{
      const newFilter = newnoteofuser.filter(i=>
        Object.values(i).some(
          propValue =>
            typeof propValue === 'string' &&
            propValue.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setNewnoteofuser(newFilter);
        }
    }
    function savenoterelatedcontent(e,inx){
      e.preventDefault();
      const dfvf = [...newnoteofuser];
      const submittednote = JSON.stringify({indexofnote:inx, emailAddr:locate.state.email, hpswd:locate.state.passwrd, titleofnote:dfvf[inx].notetitle, notecontent:dfvf[inx].notewrittencontent})
       axios.post('http://localhost:4002',submittednote,
   {
     headers:{
      'Content-Type':'application/json'
     },
   }
 )
 .then((res)=>{
  console.log(res+"helloooooooooooooooooooo");
  const rjsiefj = newnoteofuser.map((val,r)=>
    r===inx?{...val, openedit:false}:val);
    setNewnoteofuser(rjsiefj);
    setFilterdata(rjsiefj);
    localStorage.setItem('note',JSON.stringify(newnoteofuser));
})
 .catch(err=>console.log(err + "hi"));
    }
   var completedlogin =  <div>
         <div style={{borderBottom:"1px solid",height:"60px",position:"relative"}}>
        <div style={{position:"absolute",paddingLeft:"10px",bottom:"0px"}}>
        <h1>WorldNote<span style={{color:"red"}}>s</span></h1>
        </div>    
        <div style={{display:"flex",float:"right"}}><h6 style={{marginTop:"17.5px",marginRight:"10px"}}>{locate.state.email}</h6>
        <div style={{marginTop:"15px",marginRight:"10px",cursor:'pointer'}} onClick={afterLogout}>Logout</div></div>
    </div> 
      <div class="input-group mb-3" id="searcharea">
  <input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2" id="inpform" onChange={searchfunctionalty}></input>
</div>
    <div className="newnote">
    {newnoteofuser.map((val, inx)=>(
    <div key={inx}>
  <div className="abc">
    <h5 className="headingvisiout">{val.notetitle}</h5>
    <div class="notecontentfrontdisp">{val.notewrittencontent}</div>
  </div>
  <div className="bottomcss">
  <div className="abcleftbottom" onClick={()=>editNotesopen(inx)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></div>
<Modal open={val.openedit} onClose={()=>editNotesclose(inx)}>
  <Box className="notesBoxstyle">
<form onSubmit={(e)=>savenoterelatedcontent(e,inx)}>
  <div>
<input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Title' value={val.notetitle} onChange={(e)=>titlesubmit(e,inx)}></input>
<textarea className="notescontent" value={val.notewrittencontent} onChange={(e)=>notecontentsubmit(e,inx)}></textarea>
<div className="buttonsinmodalbox">
<button class="btn btn-primary" id="savenotesthbox"type="submit">Save</button>
<button class="btn btn-primary" id="closemodalbox" onClick={()=>editNotesclose(inx)}>Close</button>
</div>
</div>
</form>
</Box></Modal>
  <div className="abcrightbottom" onClick={()=>deletenote(inx)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg></div>
  </div>
  </div>
  ))}
</div>
<div className="newnotesadd" onClick={createnewnote}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg>
    </div>
    </div>
  }
  return (
    <div>
      {pllogin}
      {completedlogin}
      {}
      </div>
  )
}
