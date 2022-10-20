import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
//import {MemoryRouter} from 'react-router-dom'; //finjir rutas

import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/auth', ()=>({
    startLogout: jest.fn(),
}))
jest.mock('../../../actions/notes', ()=>({
    startNewNote: jest.fn(),
}))


const initState = {
    auth: {
        uid: 'GcuFhm6rFWeVQm9bfJpFQoqiQ9C2',
        name: 'David'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes:{
        notes: [
            {
                id    :"ENqiu5vFclsHuA5geru3",
                title :"Note title!!!",
                date  :1644273441664,
                body  :"This is anther note!!!",
                url   :"https://res.cloudinary.com/api-node-cloud/image/upload/v1644363562/journal-photos/r4rn9t0sczxtzhrbewfl.png"
            }
        ]
    }
}

//simulacion del store
let store = mockStore(initState);
//reemplazar la funcionalidad del store por una funcion de jest para poder evaluarla
store.dispatch = jest.fn();

const wrapper = mount(
    
    <Provider store={store}>
            <Sidebar/>
    </Provider>
        
);




describe('Pruebas en el Sidebar', ()=>{

    test('Debe de mostrarse correctamente', () => { 
        expect(wrapper).toMatchSnapshot();    
    })

    test('Debe de llamar la acccion startLogout', () => { 
        wrapper.find('.btn').prop('onClick')();
        expect(startLogout).toHaveBeenCalled();

    })

    test('Debe de llamar el startNewNote', () => { 
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect(startNewNote).toHaveBeenCalled();   

    })
})