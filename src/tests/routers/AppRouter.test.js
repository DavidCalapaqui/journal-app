import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import {MemoryRouter} from 'react-router-dom'; //finjir rutas
import { act } from 'react-dom/test-utils';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import Swal from 'sweetalert2'

import {login} from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../actions/auth', ()=>({
   login: jest.fn()
}))

jest.mock('sweetalert2', ()=>({
    //cuando se hace una importacion por defecto, elijo solo el metodo
    fire: jest.fn()
 }))



const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active:{
            id: 'agfasfvavffv',
           
        },
         notes: []
    }
}

//simulacion del store
let store = mockStore(initState);
//reemplazar la funcionalidad del store por una funcion de jest para poder evaluarla
store.dispatch = jest.fn();



describe('Pruebas en AppRouter', ()=>{

    test('Debe de llamar el login si estoy autenticado',async () => {
        
        let user;
        
        await act(async ()=>{
            const auth = getAuth();
            const userCred = await signInWithEmailAndPassword(auth,'test@testing.com', '123456' )
            
            user = userCred.user;
            
            //console.log(userCred.user);
            
            
            const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter >
                    <AppRouter/>
                </MemoryRouter>    
            </Provider>    
            );
        
        })

        expect(login).toHaveBeenCalledWith('LGC7rpI5B7YKX2UZEYRrQCPrQs32', null)
    })




})