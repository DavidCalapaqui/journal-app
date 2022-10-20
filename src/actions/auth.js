
import {getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import Swal from 'sweetalert2';

import { types } from "../types/types";
import { finishLoading, startLoading } from './ui';
import { notesLogout } from './notes';

//accion
export const startLoginEmailPassword = (email, password) =>{
    //retorna un callback 
    return (dispatch)=>{
        //dispatch startLogin
        dispatch(startLoading());

        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
        .then(async ({user})=>{
            dispatch(login(user.uid, user.displayName));
            
            dispatch(finishLoading());
            //dispatch stopLoggin
            //console.log('EMAIL & PASS - USER SIGIN: \n',user.displayName, user.uid);
        }).catch(e=>{
            Swal.fire('Error', e.message, 'error' );
            }
        );
    }

}

export const startRegisterWithEmailPasswordName = (email, password, name) =>{
    return(dispatch)=>{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then(async({user})=>{ 
            //dispatch(login(user.uid, user.displayName));
            await updateProfile(user, {displayName: name});
            dispatch(user.uid, user.displayName);
            console.log(user);
        })
        .catch(e=>{
            Swal.fire('Error', e.message, 'error' );
        })
    }

}

//accion
export const startGoogleLogin = () =>{
    return (dispatch)=>{
       const auth = getAuth();
       signInWithPopup(auth, googleAuthProvider)
       .then(({user})=>{
            console.log('GOOGLE - USER SIGIN: \n', user.displayName, user.uid);
           dispatch(login(user.uid, user.displayName));
       })
    }
}
//accion
export const login = (uid, displayName) =>{
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

//acción asíncrona a firebase
export const startLogout = () =>{
    const auth = getAuth();

    return async (dispatch)=>{
        await auth.signOut();
        dispatch(logout()); 
        //disparar accion para limpiar notas
        dispatch(notesLogout());
    }
}

export const logout = () =>({
    type: types.logout
});