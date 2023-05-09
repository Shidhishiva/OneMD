/* eslint-disable */
import React, { useContext } from 'react'
import './header.css'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context';


const Header = () => {

    const { logindata, setLoginData } = useContext(LoginContext);
    //console.log(logindata)

   
    return (
        <>
            <header>
                <nav>
                    <h1 style={{ color: 'white' }} alt="logo">OneMD</h1>
                    <div className='avtar'>
                        {
                            logindata?.ValidUserOne ? <Avatar style={{ background: "grey" }}>{logindata?.ValidUserOne?.fname[0]?.toUpperCase()}</Avatar> :
                                <Avatar style={{ background: 'grey', fontWeight: 'bold' }} />
                        }
                    </div>

                    


                </nav>
            </header>
        </>
    )
}

export default Header
