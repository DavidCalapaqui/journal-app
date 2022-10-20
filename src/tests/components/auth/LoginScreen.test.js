import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import {MemoryRouter} from 'react-router-dom'; //finjir rutas

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/auth', ()=>({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn(),
}))



const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
}

//simulacion del store
let store = mockStore(initState);
//reemplazar la funcionalidad del store por una funcion de jest para poder evaluarla
store.dispatch = jest.fn();

const wrapper = mount(
    
    <Provider store={store}>
        <MemoryRouter >
            <LoginScreen/>
        </MemoryRouter>
        
    </Provider>
        
);



describe('Pruebas en el login Screen', ()=>{

    beforeEach(()=>{
        store = mockStore(initState);
        //limpiar mocks
        jest.clearAllMocks();
    })

    test('Debe de mostrarse correctamente', () => { 
        
        expect(wrapper).toMatchSnapshot();
        
    })

    test('Debe disparar la accion de startGoogleLogin', () => { 

        wrapper.find('.google-btn').prop('onClick')(); //simulacion de click
        expect(startGoogleLogin).toHaveBeenCalled();
     })

    test('Debe disparar el startLogin con los respectivos argumentos', () => { 
        wrapper.find('form').prop('onSubmit')(
            {
                preventDefault(){}
            }); //simulacion de submit del formulario. POSTEO
        
        expect(startLoginEmailPassword).toHaveBeenCalledWith('david.98@gmail.com', '123456');
        //expect(startLoginEmailPassword).toHaveBeenCalledWith('', ''); //prueba real con strings vacios
        
    })

})