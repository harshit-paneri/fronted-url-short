import React from "react";
import { AllUrls } from './allUrls';
// import {Redirect} from './components/Redirect'
import { AddUrl } from './addUrl';



export const UserDashboard = () => {
    const loadLocalStorage = () =>{
        let userData = localStorage.getItem("userData")
        return userData;
      }


    const user = JSON.parse(loadLocalStorage());
      // console.log(user);
    if (!user) {
        window.location.pathname="/login"
      }

    // console.log(user);
    // console.log(loadLocalStorage());
    return(
        <>
        {/* <h1>hellow</h1> */}
        {/* <Router> */}
        
        {/* <Header /> */}
        {loadLocalStorage() &&
        <>
        <div className='container'>
          <h1>{user.username}</h1>
          <AddUrl />
      
          < AllUrls />
        </div>
        </>
        }
        
        
        {/* </Router> */}
        </>
    )
    
}