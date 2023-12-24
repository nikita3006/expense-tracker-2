import React, { useContext } from 'react'
import AuthContext from './store/AuthContext'

function Verificationpage() {
   const authCtx = useContext(AuthContext)
   console.log(authCtx.token,'in verification');
   const verifyEmail = ()=>{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCBNqXOohJ5C1pTxxgYtTbpbxZc1ncW9fc',{
        method: "POST",
        body: JSON.stringify({
            requestType : "VERIFY_EMAIL",
            idToken : authCtx.token
        }),
        headers: {
            "Content-Type": "application/json",
          },
    }).then((res) => {

        if (res.ok) {
          console.log("Verification sent succesfullly");
          alert("Verification sent succesfullly")
          console.log(res);
          return res.json();

        } else {
          return res.json().then((data) => {
            console.log(data);
            let errorMessage = "Authrntication filed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
   }
  return (
    <div style={{display:"flex",justifyContent:'center',marginTop:'20px'}}>
        <button style={{color:'red'}} onClick={verifyEmail}>Verify Email</button>
    </div>
  )
}

export default Verificationpage