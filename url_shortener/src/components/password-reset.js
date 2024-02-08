import { useState } from "react";
import { Link } from "react-router-dom";


const Forgot = () => {


    

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const forgotPassword = async() =>{
        console.log(email);
        document.getElementById("email").value = "";
        document.getElementById("forgot_btn").disabled = true;

        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/password-reset/`,
        {
            body : JSON.stringify({
                "email" : email
            }),
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        });
        setEmail("");
        document.getElementById("forgot_btn").disabled = false;
        result= await result.json();
        console.log(result);

        if(result.status===400){
            setError(result.error);
        }

        else setMessage("Password Reset Link Sent Successfully !");


    }
    
    return (
        <div className="row g-0 auth-wrapper my-5">
            {/* <div className="col-6 col-md-5 col-lg-3 h-100 auth-background-col">
                
            </div> */}

            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        <h1 style={{color : "red"}} >{error}</h1>
                        <h1 style={{color : "red"}} >{message}</h1>
                        <h1 className="mb-5">Forgot Password</h1>
                        <div className="auth-form-container text-start">
                            <form >
                                <div className="email mb-3">
                                    <input type="email"
                                        className={`form-control`}
                                        id="email"
                                        name="email"
                                        
                                        placeholder="Email"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setError("");
                                            setMessage("");
                                        }}
                                    />

                                </div>
                                
                                <div className="text-center">
                                    <button type="button" id="forgot_btn" className="btn btn-primary w-100 theme-btn mx-auto" onClick={forgotPassword}>Forgot Password</button>
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

export default Forgot;