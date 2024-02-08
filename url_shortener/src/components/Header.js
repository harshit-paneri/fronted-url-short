import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserDelModal from "./Modals/userDeletionModal";

// import { redirect } from "react-router-dom";


export const Header = (props) => {
  const [show,setShow] = useState(false)

  
  //user deletion modal code
 
  // const navigate = useNavigate();
  const[loggedIn,setLoggedIn] = useState(false);

  const loadLocalStorage = () =>{
    let userData = localStorage.getItem("userData")
    return userData;
  }

  const logoutFunction = () => {
    localStorage.clear();
    console.log("clearing data");
    // return redirect("/logout");
    window.location.pathname='';

  }
  

  const signupLogin = ( <> <li className="nav-item">
  <Link to="/signup" className="nav-link">Signup</Link>
    
  </li>
  <li className="nav-item">
  <Link to="/login" className="nav-link">login</Link>
  </li></>);

  // const logout = (<><li className="nav-item"><Link to="/signup" className="nav-link">Signup</Link> </>);
  const logout = (
  <>
  <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Options
  </button>
  <ul className="dropdown-menu">
    <li><Link to="/" className="nav-link dropdown-item" onClick={logoutFunction}>Logout</Link></li>
    <li><Link to="/ChangePassword" className="nav-link dropdown-item" >Change Password</Link></li>
    <li><Link className="nav-link dropdown-item" onClick={() => {setShow(true);console.log("show")}}>Delete Account</Link>
      <UserDelModal onClose = {() => setShow(false)} show={show} /></li>
    
  </ul>
</div>
  </>
  );


useEffect(()=>{
  const userData = loadLocalStorage();
  
  if(userData){
    setLoggedIn(true);
    // this.forceUpdate();
  }
  },[loggedIn])
  
  
  return (
    <>
    <div id="headerDiv">
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
          Welcome
          </Link>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/about">About</Link>

                {/* <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a> */}
              </li>
              
              
            </ul>
            
            <ul className="navbar-nav mx-4 pe-5">
              { loggedIn ? 
                logout : signupLogin
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
    </>
  );
};