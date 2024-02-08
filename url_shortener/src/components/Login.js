import React , {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
// import {useNavigate} from 'react-router-dom';



export const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [error,setError] = useState("");
    

    const [emailError,setEmailError] = useState(false);
    const [passwordError,setPasswordError] = useState(false);

    useEffect(()=>{

      const loadLocalStorage = () =>{
        let userData = localStorage.getItem("userData")
        return userData;
      }


    const user = JSON.parse(loadLocalStorage());
      // console.log(user);
    if (user) {
        window.location.pathname="/user"
      }
      document.getElementById("LoginBtn").disabled = false;
      document.getElementById("LoginBtn").innerHTML = "Login";
            if(error){
              setError(error)
            }
    },[error])

    // const navigate = useNavigate();

    const LoginUser = async () =>{

      document.getElementById("LoginBtn").disabled = true;
      document.getElementById("LoginBtn").innerHTML = "Loading";

      if(!email || email === ""){
        setEmailError(true)
      }
      if(!password || password === ""){
        setPasswordError(true)
      }
      
      if(emailError || passwordError ){
        return false;
      }
        console.log("login user hit in react");

        const userObj = {

            "email" : email,
            "password" : password, 
        }
        
        // console.log(process.env.REACT_APP_BACKEND_URL);
        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login/`,
        {
            body : JSON.stringify(userObj),
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        });
        result= await result.json()
        // console.log(result);

        if(result.status!==200){
          setError(result.message); 
        }

        else if(result.status===200 && result.extra.token){
          localStorage.setItem("userData",JSON.stringify(result.data));
          localStorage.setItem("token","Bearer "+result.extra.token);
          setEmail("");
          setPassword("");
          window.location.pathname='/user';
        }



    }
    return (
        <div className='container mt-4' >

      <form>
        <h2 style={{color:"red"}}>{error}</h2>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label style={emailError ? {color:"red"} : {color:"black"}}>
            { emailError ? "Please Enter Email" : "Email address "}
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(val)=>{setEmail(val.target.value);setEmailError(false);setError('')}}
          />
        </div>
        <div className="mb-3">
          <label style={passwordError ? {color:"red"} : {color:"black"}}>{ passwordError ? "Please Enter Password" : "Password"}</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(val)=>{setPassword(val.target.value);setPasswordError(false);setError('')}}
          />
        </div>
        
        <div className="d-grid">
          <button type="button" id='LoginBtn' className="btn btn-primary" onClick={()=> {LoginUser()}}>
            Login
          </button >
        </div>
        <Link to="/password-reset">
          <p className="forgot-password text-right">
            Forgot password?
          </p>
        </Link>
      </form>
    </div>
    )
  }