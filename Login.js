/* eslint-disable */
import React, { useState } from 'react'
import './mix.css'
import { NavLink, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {

  const [passShow, setPassShow] = useState(false);

  //geting inputs of form in state
  const [inpval, setInpval] = useState({

    email: "",
    password: ""
  });
  //console.log(inpval);

  const history = useNavigate();

  const setVal = (e) => {

    //object destructuring
    const { name, value } = e.target;

    //storing values in setInpval
    setInpval(() => {
      return {

        //here we can store initial value aswell input value by spread operator
        ...inpval,
        [name]: value
      }

    })
  };

  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;


    if (email === "") {
      alert("enter your email");
    } else if (!email.includes('@')) {
      alert("enter valid email");
    } else if (password === "") {
      alert("enter your password");
    } else if (password.length < 8) {
      alert("invalid password");
      // else if (!password.includes(new RegExp((/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8 }$/)))) {
      //     alert("invalid password")
    } else {
      console.log("login successfull");

      const data = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"



        },
        body: JSON.stringify({
          email, password

        })
      });

      const res = await data.json();
      //console.log(res);

      //removing input field values after registration
      if (res.status === 201) {
        alert("Login done");
        localStorage.setItem("usersdatatoken", res.result.token);
        history("/dashboard")
        setInpval({ ...inpval, email: "", password: "" });

      }
    }

  }


  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome to ONEMD Log In</h1>
            <p>We are glad you are back, Please Login</p>
          </div>

          <form>



            {/* email input */}
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={setVal} value={inpval.email} placeholder="Enter your email " />
            </div>


            {/* password input */}
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">

                <input type={!passShow ? "password" : "text"} name="password" id="password" onChange={setVal} value={inpval.password} placeholder="Enter your password" />
                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                  {!passShow ? <VisibilityOffIcon fontSize='extra-small' /> : <VisibilityIcon fontSize='extra-small' />}

                </div>
              </div>
            </div>
            <button className='btn' onClick={loginuser}> Login</button>
            <p>Don't have an Account?<NavLink to="./register">Sign Up</NavLink></p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login