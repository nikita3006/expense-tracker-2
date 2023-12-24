import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function AfterLogin() {
    const history = useHistory();
    const [isLogin,setIsLogin]=useState(false);
    
    const SwitchMode = (prev)=>{
        setIsLogin((prev)=> !prev);
    }

  return (
    <>
        <div>
            <h1>Welcome to Expense Tracker</h1>
        </div>
        <Button onClick={SwitchMode}>Login With other Account
            {isLogin ? history.replace('/LoginPage'): ""}
        </Button>

    </>
  )
}

export default AfterLogin