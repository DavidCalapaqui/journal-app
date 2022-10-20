import React from 'react'
import { Routes, Route, BrowserRouter  } from "react-router-dom";


import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
    return (

        <div className='auth__main'>
            <div className='auth__box-container'>
                 {/* Switch en roucter v5 */}
                <Routes>
                    <Route path="/login" element={<LoginScreen/>}/>
                    <Route path="/register" element={<RegisterScreen/>}/>

                    <Route path="/*" element={<LoginScreen/>}/>


                </Routes>


            </div>
        </div>

        
    )
}
