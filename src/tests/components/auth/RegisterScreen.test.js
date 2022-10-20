import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import {MemoryRouter} from 'react-router-dom'; //finjir rutas
import { RegisterScreen } from '../../../components/auth/RegisterScreen';




const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes:{
        notes:[],
        active: null
    }
}

let store = mockStore(initState);

const wrapper = mount(
    
    <Provider store={store}>
        <MemoryRouter >
            <RegisterScreen/>
        </MemoryRouter>
        
    </Provider>
        
);
describe('Tests en ResgisterScreen', ()=>{
    
    test('Debe mostrarse correctamente', () => { 
        expect(wrapper).toMatchSnapshot();
    })

    //simular cambio de email
    test('Debe de hacer el dispatch de la accion respectiva', () => { 
        
        //tomo el campo del email del formulario de registro
        //tiene un valor por defecto
        const emailField = wrapper.find('input[name="email"]');
        
       //simular cambio en el campo email
       //debería activarse el action error
       emailField.simulate('change', {
           //se modifica con el custom Hook
            target: {
               value: '', 
               name: 'email'
           }
       })

       wrapper.find('form').simulate('submit',{
           preventDefault(){}
       })

       const actions = store.getActions();
       expect(actions[0]).toEqual({
            type: '[UI] Set Error', 
            payload: 'Invalid email'
       })
        
    })

    test('Debe de mostrar la caja de alerta con el error', () => { 

        //otro estado del store con un mensaje de error
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Invalid email'
            },
           
        }
        
        let store = mockStore(initState);
        
        const wrapper = mount(
            
            <Provider store={store}>
                <MemoryRouter >
                    <RegisterScreen/>
                </MemoryRouter>
                
            </Provider>      
        );
        //si existe la caja de error
        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        //si el texto es correcto
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError);

    })
})