import { Button } from "react-bootstrap";
import React ,{useState} from "react"
import Modal from 'react-bootstrap/Modal';


const UserDelModal = (props) => {
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const loadLocalStorage = () =>{
        let userData = localStorage.getItem("userData")
        return userData;
      }
    
      const user = JSON.parse(loadLocalStorage());

    const delUserAccount = async () =>{
        const userObj = {
            email : user.email,
            pass : password
        }

        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/delUser/`,
        {
            body : JSON.stringify(userObj),
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        });

        result = await result.json();
        console.log(result);
        if(result.error){
            setError(result.error)
            console.log(result.error);
        }
        else{
            localStorage.clear();
            console.log("clearing data");
            // return redirect("/logout");
            window.location.pathname='login';
        }


    }

    if(!props.show){
        return null
    }
    
  return (
    <>
      <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton >
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body><h4 style={{ color: 'red' }}>{error}</h4>Are you sure that you want to delete your account ? this is an irreversible action. Once the data is lost , you will not be able to recover it. Proceed with caution!!
        <hr></hr>
        <h4>Enter your password to continue</h4>
        <div className="row">
                <div className="mb-3">
                    <label>Password : </label>
                    <input type="password" name="pwd" id="pwd" className="input-field" onChange={(val)=>{
                        setPassword(val.target.value);
                        console.log(val.target.value);
                        setError("");
                    }} />
                </div>
                
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={delUserAccount}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
    
  );
}

export default UserDelModal;