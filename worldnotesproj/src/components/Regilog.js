import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import "../components/Regilogstyle.css";
import axios from 'axios';

export var valueNullforlogin = 0;
export default function Regilog() {
  const [signupupt, setSignupupt] = useState(false);
  const [loginupt, setLoginupt] = useState(false);
  //const ert ={emainew:"",passnew:""};
  const [signemailidinput,setSignemailidinput] = useState("");
  const [signpassdinput,setSignpassdinput] = useState("");
  const [loginemailidinput,setLoginemailidinput] = useState("");
  const [loginpassdinput,setLoginpassdinput] = useState("");
  const navigate = useNavigate();
  function signupclick(){
     setLoginupt(false); 
     setSignupupt(true);
  }
  function loginclick(){
    setSignupupt(false);
    setLoginupt(true);
 }
 function signemailinp(e){
  setSignemailidinput(e.target.value);
 }
 function signpassdinp(e){
  setSignpassdinput(e.target.value);
 }
 function loginemailinp(e){
  setLoginemailidinput(e.target.value);
 }
 function loginpassdinp(e){
  setLoginpassdinput(e.target.value);
 }
function logincheckos(e){
  e.preventDefault();
  if(loginemailidinput===null){
    valueNullforlogin = 0;
    navigate("/");
  }
  else{
    valueNullforlogin = 1;
  const loginUsersData = JSON.stringify({emaich:loginemailidinput,
    passdch:loginpassdinput});
   axios.post('http://localhost:4001',loginUsersData,
   {
     headers:{
      'Content-Type':'application/json'
     },
   }
 )
.then((resp)=>{
  console.log(resp,"verygood");
  navigate("/",{state:{email:resp.data[0].emailId,passwrd:resp.data[0].password}});
})
  .catch((e)=>{
      console.log(e);
  }
    );
}
}
function sigformsub(e){
  e.preventDefault();
  const signupUsersData = JSON.stringify({emainew:signemailidinput,
    passdnew:signpassdinput});
  axios.post('http://localhost:4000',signupUsersData,
   {
     headers:{
      'Content-Type':'application/json'
     },
   }
 )
 .then((res)=>{
  console.log(res+"please accept");
})
 .catch(err=>console.log(err));
}

 
 if(loginupt===true){
  var logintruecase = <form onSubmit={logincheckos}>
  <div className="signlogindis" style={{height:"300px"}}>  
 <div className="mb-3">
<label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
<input type="email" className="form-control"id="exampleFormControlInput1" value={loginemailidinput} onChange={loginemailinp} ></input>
</div>
<div className="Paswdopt">
<label htmlFor="inputPassword5" className="form-label">Password</label>
<input type="password" id="inputPassword5" className="form-control" aria-labelledby="passwordHelpBlock" value={loginpassdinput} onChange={loginpassdinp}></input>
</div>
<button type="submit" id="subforregilog" className="btn btn-outline-danger">Done</button>
    </div></form>
 } 
 else{ 
  var signupcase = <form onSubmit={sigformsub}>
       <div className="signlogindis">  
      <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleFormControlInput1" value={signemailidinput} onChange={signemailinp}></input>
</div>
<div className="Paswdopt">
<label htmlFor="inputPassword5" className="form-label">Password</label>
<input type="password" id="inputPassword5" className="form-control" aria-labelledby="passwordHelpBlock" value={signpassdinput} onChange={signpassdinp}></input>
<div id="passwordHelpBlock" className="form-text" style={{fontWeight:"400",fontSize:"12px"}}>
  Your password must be 8-20 characters long.
</div> 
</div>
<button type="submit" id="subforregilog" className="btn btn-outline-danger">Done</button>
         </div></form>
}    
  return (
    <div>
    <h1 className="logoregilog">WorldNote<span style={{color:"red"}}>s</span></h1>
    <div className="regimostouter">
      <div className="optswitch">
      <div className="SignUpswitch" onClick={signupclick} style={signupupt === true || (signupupt===false && loginupt===false)? {border:"3px solid red"}:{}}><h4>SignUp</h4></div>
      <div className="Loginswitch" onClick={loginclick} style={loginupt === true? {border:"3px solid red"}:{}}><h4>LogIn</h4></div>
      </div>
      {logintruecase}
      {signupcase}</div></div>
  )
}
