import React from 'react'
import { Navigate } from 'react-router-dom';


//children son las rutas que quiero mostrar si no está autenticado
export const PublicRoute = ({isAuth, children}) => {
    
    return isAuth ? <Navigate to="/" /> : children
}
