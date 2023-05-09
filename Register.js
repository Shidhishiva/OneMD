/* eslint-disable */
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { NavLink } from 'react-router-dom';

const Register = () => {



  // password state
  const [passShow, setPassShow] = useState(false);

  //confirm password state
  const [cpassShow, setCPassShow] = useState(false);

  //geting inputs of form in state
  const [inpval, setInpval] = useState({

    tel: "",
    fname: "",
    email: "",
    password: "",
    cpassword: "",
    date: "",
    exp: "",
    d1name: "",
    d2name: ""
  });
  //console.log(inpval);

  //creating function setVal
  const setVal = (e) => {
    //console.log(e.target.value);


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

  const addUserdata = async (e) => {
    //stopped the default behaviour of loading
    e.preventDefault();

    const { tel, fname, email, password, cpassword, date, exp, d1name, d2name } = inpval;

    // validation input fields
    if (tel === "") {
      alert("please enter your number");
    } else if (fname === "") {
      alert("enter your name");
    } else if (email === "") {
      alert("please enter your email");
    } else if (!email.includes("@")) {
      alert("please enter valid email");
    } else if (password === " ") {
      alert("please enter your password");
    } else if (password.length < 8) {
      alert("invalid password");
    } else if (cpassword !== password) {
      alert("password doesn't match");
    } else if (date === "") {
      alert("please input date of graduation");
    } else if (exp === "") {
      alert("please enter experience")
    } else if (d1name === "") {
      alert("please input degree");
    } else if (d2name === "") {
      alert("please input degree");
    } else {
      //console.log("user registration done");

      //register api
      const data = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"

        },
        body: JSON.stringify({
          tel, fname, email, password, cpassword, date, exp, d1name, d2name

        })
      });

      const res = await data.json();
      //console.log(res);

      //removing input field values after registration
      if (res.status === 201) {
        alert("User Registration Done");
        setInpval({ ...inpval, tel: "", fname: "", email: "", password: "", cpassword: "", date: "", exp: "", d1name: "", d2name: "" })
      }


    }

  }


  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Register</h1>
            <p>Digital Care Platform for Doctors & Patients</p>
          </div>

          <form>

            {/* mobile number input */}
            <div className="form_input">
              <label htmlFor="tel">Phone Number</label>
              <input type="tel" name="tel" id="tel" onChange={setVal} value={inpval.tel} placeholder="Contact number" />
            </div>

            {/* email input */}
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={setVal} value={inpval.email} placeholder="Enter your email " />
            </div>

            {/* Full name  input */}
            <div className="form_input">
              <label htmlFor="fname">FullName</label>
              <input type="fname" name="fname" id="fname" onChange={setVal} value={inpval.fname} placeholder="Enter your FullName " />
            </div>


            {/*password input */}
            <div className="form_input">
              <label htmlFor="password">Set Password</label>
              <div className="two">

                <input type={!passShow ? "password" : "text"} name="password" id="password" onChange={setVal} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={inpval.password} placeholder="Enter your password" />


                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                  {!passShow ? <VisibilityOffIcon fontSize='extra-small' /> : <VisibilityIcon fontSize='extra-small' />}

                </div>
              </div>
            </div>

            {/* confirm password */}
            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">

                <input type={!cpassShow ? "password" : "text"} name="cpassword" id="cpassword" onChange={setVal} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={inpval.cpassword} placeholder="Confirm your password" />

                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                  {!passShow ? <VisibilityOffIcon fontSize='extra-small' /> : <VisibilityIcon fontSize='extra-small' />}

                </div>
              </div>
            </div>

            {/* date of graduation input */}
            <div className="form_input">
              <label htmlFor="date">Date of Graduation</label>
              <input type="date" id="date" name="date" onChange={setVal} value={inpval.date} placeholder='dd-mm-yyyy'></input>
            </div>


            {/* experience */}
            <div className='form_input'>
              <label htmlFor='exp'>Experience</label>
              <input type="exp" id="exp" name="exp" onChange={setVal} value={inpval.exp}  ></input>

            </div>



            {/* degree1 input */}
            <div className="form_input">
              <label htmlFor="d1name">Degree 1</label>
              <input type="text" id="d1name" name="d1name" onChange={setVal} value={inpval.d1name} placeholder='MBBS'></input>
            </div>

            {/* degree2 input */}
            <div className="form_input">
              <label htmlFor="d2name">Degree 2</label>
              <input type="text" id="d2name" name="d2name" onChange={setVal} value={inpval.d2name} placeholder='MD'></input>
            </div>


            <button className='btn' onClick={addUserdata}>Submit </button>

            <p>Already have an account? <NavLink to="/">Log In</NavLink></p>
          </form>
        </div>
      </section>
    </>


  )
}

export default Register