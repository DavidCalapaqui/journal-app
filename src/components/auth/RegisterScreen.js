import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { setError, removeError } from '../../actions/ui';


import { useForm } from '../../hooks/useForm'


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    
    const {msgError} = useSelector(state => state.ui);
    
    
    //obtener info de los campos del formulario
    const [formValues, handleInputChange] = useForm({
        name:"David", 
        email:'david.calapaqui98@gmail.com', 
        password:'123456', 
        password2:'123456'

    });

    const {name, email, password, password2} = formValues;

    const handleRegister = (e)=>{
        e.preventDefault();

        if(isFormValid()){
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
        
    }

    const isFormValid = () =>{
       if(name.trim().length ===0){
           dispatch(setError('Name is required'));
           return false;
       }else if(!validator.isEmail(email)){
           dispatch(setError('Invalid email'));   
           return false;
       }else if(password !== password2 || password.length <5){
         dispatch(setError('Password should be at least 6 characters and match each other'));  
         return false
       }
       
       dispatch(removeError())
       return true;
    }
    
    return (
        <>
        <h3 className='auth__title'>Register</h3>

        <form onSubmit={handleRegister}
            className="animate__animated animate__fadeIn animate__faster"
        > 
            
            {    
                msgError &&
                (<div className='auth__alert-error'>
                    {msgError}
                </div>
                ) 
            }
            
            <input
                type="text"
                placeholder='Name'
                name="name"
                className='auth__input'
                autoComplete='off'
                value={name}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder='Email'
                name="email"
                className='auth__input'
                autoComplete='off'
                value={email}
                onChange={handleInputChange}
            />
           <br/>
            <input
                type="password"
                placeholder="Password"
                name="password"
                className='auth__input'
                value={password}
                onChange={handleInputChange}
            />
            <input
                type="password"
                placeholder="Confirm password"
                name="password2"
                className='auth__input'
                value={password2}
                onChange={handleInputChange}
            />
            
            <button
                className='btn btn-primary btn-block mb-5' 
                type="submit"
                
                
            >Register</button>

            <hr />

                   

            <Link 
            className='link'
            to="/auth/login">

               Already registered?
            </Link>

        </form>

    </>
    )
}
