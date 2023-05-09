/* eslint-disable */
import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import './mix.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Dashboard = () => {

  const { logindata, setLoginData } = useContext(LoginContext);
  //console.log(logindata);
  //console.log(logindata?.ValidUserOne?.email);
  //const [data, setData] = useState(false);
  //console.log(logindata.ValidUserOne.email);

  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    //console.log(token);

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();
    //console.log(data);

    //when user not valid redirect to error page
    if (data.status === 401 || !data) {
      //console.log("error page redirect");
      history("*");
    } else {
      console.log("user verify");
      setLoginData(data)
      history("/dashboard");
    }

  }

  useEffect(() => {
    DashboardValid();

  }, [])

  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
        Accept: "application/json"
      },
      credentials: "include"
    });

    const data = await res.json();
    //console.log(data);

    if (data.status == 201) {
      console.log("user logout");
      localStorage.removeItem("usersdatatoken");
      setLoginData(false)
      history("/");
    } else {
      console.log("error");
    }
  }

  


  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src="./femaleDoctor.png" style={{ width: "150px", marginTop: 20 }} alt="doctor pic" />
        <h1>User Email: {logindata ? logindata?.ValidUserOne?.email : ""} </h1>
        {/* logindata is valid then only email id other wise empty */}

        <section>
          <form>
            <div className='form_data'>
              <h1>User Email:  {logindata ? logindata?.ValidUserOne?.email : ""}</h1>
              <br></br>
              <h1>User Name: {logindata ? logindata?.ValidUserOne?.fname : ""}</h1>
              <br></br>
              <h1>User Degree1: {logindata ? logindata?.ValidUserOne?.d1name : ""}</h1>
              <br></br>
              <h1>User Degree2: {logindata ? logindata?.ValidUserOne?.d2name : ""}</h1>
              <br></br>
              <h1>User Experience: {logindata ? logindata?.ValidUserOne?.exp : ""}</h1>
              <br></br>
              <button className='btn' onClick={logoutuser}> logout</button>


            </div>
          </form>
        </section>




      </div>


    </>
  )
}

export default Dashboard