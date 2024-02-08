import { useState } from "react";
import { FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const ChangePassword = () => {

    const loadLocalStorage = () =>{
        let userData = localStorage.getItem("userData")
        return userData;
      }


    const user = JSON.parse(loadLocalStorage());
    if (!user) {
        window.location.pathname="/login"
      }
    
    const [pass1, setpass1] = useState('');
    const [pass2, setpass2] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    

    const PasswordReset = async() =>{


        if(pass1!==pass2){
            setError("Passwords does not match")
        }

        else if(pass1.length<8){
            setError("password Length must be >= 8 characters")
        }
        else{      
            
            document.getElementById("pass1").value = "";
            document.getElementById("pass2").value = "";
            let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/ChangePassword`,
            {
                body : JSON.stringify({
                "userId" : user._id,
                "pass1" : pass1,
                "pass2": pass2,
            }),
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        });

        result = await result.json();
        console.log(result);
        setMessage(result.message)
        sleep(3000).then(() => {  
        
        if(result.status===200){
            window.location.pathname = "";
 
        }
    })
    }
    }

    return (
        <div className="row g-0 auth-wrapper my-5">
            

            <div className="col-12 col-md-7 col-lg-12 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        <h1 style={{color : "red"}} >{error}</h1>
                        <h1 style={{color : "red"}} >{message}</h1>
                        <h1 className="mb-5">Change Password</h1>
                        <div className="auth-form-container text-start">
                            <form >
                                <div className="email mb-3">
                                    <FormLabel>New Password</FormLabel>
                                    <input type="password"
                                        className={`form-control`}
                                        id="pass1"
                                        name="pass1"
                                        
                                        placeholder="New Passowrd"
                                        onChange={(e) => {
                                            setpass1(e.target.value);
                                            setError("");
                                            setMessage("");
                                        }}
                                    />
                                </div>

                                <div className="email mb-3">
                                    <FormLabel>confirm Password</FormLabel>
                                    <input type="password"
                                        className={`form-control`}
                                        id="pass2"
                                        name="pass2"
                                        
                                        placeholder="Confirm Passowrd"
                                        onChange={(e) => {
                                            setpass2(e.target.value);
                                            setError("");
                                            setMessage("");
                                        }}
                                    />
                                </div>
                                
                                <div className="text-center">
                                    <button type="button" id="forgot_btn" className="btn btn-primary w-100 theme-btn mx-auto" onClick={PasswordReset}>Change Password</button>
                                </div>
                            </form>

                            <hr />
                            <div className="auth-option text-center pt-2"><Link className="text-link" to="/login" >Back to Login</Link></div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ChangePassword;