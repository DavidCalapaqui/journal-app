import React, {useEffect, useState} from 'react'
import { Routes, Route } from "react-router-dom";
import {getAuth, onAuthStateChanged} from  '@firebase/auth';
import {useDispatch} from 'react-redux';

import {login} from '../actions/auth';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import {  startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();  
    //mientras checking sea true no se mostrará nada de la aplicación
    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user)=>{
          //si no está autenticado
          // si el objeto user tiene algo, evalua si tiene el id
          console.log('CAMBIÓ EL STATE AUTH');
          if(user?.uid){
              console.log('sesion persistida');
            dispatch(login(user.uid, user.displayName));
            setIsLoggedIn(true);

            //cargar las notas del usuario logueado
           dispatch(startLoadingNotes(user.uid));

          }else{
            setIsLoggedIn(false);
          }
          //cuando tenga la respuesta de firebase cambiará el checking a false
          setChecking(false);
        })
        
     
    }, [dispatch, setChecking, setIsLoggedIn]);
    
    if(checking){
      return(
        <h1>Wait...</h1>
      )
    }

    return (
       
            
        <Routes>
           {/* Si no está autenticado mostrará el loginScreen */}

           
          <Route path="/*" element={
            <PublicRoute isAuth={isLoggedIn}>
               <AuthRouter />
            </PublicRoute>      
          } 
          />


          <Route path="/" element={
          
            <PrivateRoute isAuth={isLoggedIn}>
              <JournalScreen /> 
            </PrivateRoute>
          
          
          
          } />
        
        </Routes>
        
    )
}
