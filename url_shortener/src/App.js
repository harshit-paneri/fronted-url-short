// import logo from './logo.svg';

// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import './App.css';
import {Header} from './components/Header';
// import {Footer} from './components/Footer';
import {Login} from './components/Login';
import { About } from './components/About';
import SignUpForm from './components/Signup';
// import { AllUrls } from './components/allUrls';
import {RedirectTo} from './components/Redirect'
// import { AddUrl } from './components/addUrl';
import { UserDashboard } from "./components/UserDashboard";
import Forgot from "./components/password-reset";
import ResetPassword from "./components/Reset";


import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import ChangePassword from "./components/ChangePassword";



function App() {

  const[loggedIn,setLoggedIn] = useState();

  

  const loadLocalStorage = () =>{
    let userData = localStorage.getItem("userData")
    return userData;
  }

  useEffect(()=>{
    const userData = loadLocalStorage();
    
    if(userData){
      setLoggedIn(true);
      // this.forceUpdate();
    }else{
      setLoggedIn(false);
    }
  
    },[loggedIn])



    // console.log(window.location.pathname);


  if(String(window.location.pathname)==="/" || String(window.location.pathname)==="")
  {

 
    if(loggedIn){
      window.location.pathname="/user"
    }
    // else(
    //   window.location.pathname="/login"
    // )
  }


 
    return(
      <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<Forgot />} />
        <Route path="/password-reset/*" element={<ResetPassword />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path = "/*" element={<RedirectTo/>} />
      </Routes>
      
    </Router>
    </>
);
}











// import './App.css';
// import { AllUrls } from './components/allUrls';
// import {Header} from './components/Header';
// import {Redirect} from './components/Redirect'

// import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
// import { AddUrl } from './components/addUrl';

// function App() {


//   if(String(window.location.pathname).match("/[^*]"))
//   {
//     console.log("hi");
//     return(
//       <Router>
//         <Routes>
//           <Route>
//           <Route path = "/*" element={<Redirect/>} />
//           </Route>
//         </Routes>
//       </Router>
//     )
//   }
//   else{
//     return(
//       <>
//       <Router>
//       <Header/>
//       <AddUrl />
//       <div className='container'>
//           < AllUrls />
//       </div>
//         <Routes>
//           <Route path="/"  />
//         </Routes>
//       </Router>
//     </>
// );
// }
// }

export default App;

