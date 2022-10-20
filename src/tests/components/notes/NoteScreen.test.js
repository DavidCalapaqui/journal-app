import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';
//import {MemoryRouter} from 'react-router-dom'; //finjir rutas



const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/notes', ()=>({
    activeNote: jest.fn(),
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
        ],
        active: {
            id    :"ENqiu5vFclsHuA5geru3",
            title :"Note title!!!",
            date  :1644273441664,
            body  :"This is anther note!!!",
            url   :"https://res.cloudinary.com/api-node-cloud/image/upload/v1644363562/journal-photos/r4rn9t0sczxtzhrbewfl.png"
        }
    }
}

//simulacion del store
let store = mockStore(initState);
//reemplazar la funcionalidad del store por una funcion de jest para poder evaluarla
store.dispatch = jest.fn();

const wrapper = mount(
    
    <Provider store={store}>
            <NoteScreen/>
    </Provider>
        
);



describe('Pruebas en NoteScreen', ()=>{

    test('Debe de mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();

    })

    //modificar caja de texto para activar nota

    test('Debe disparar el activeNote', () => { 
        wrapper.find('input[name="title"]').simulate('change',{
            terget: {
                name: 'title',
                value: 'hola otra vez'
            }
        })    

        expect(activeNote).toHaveBeenLastCalledWith(
            "ENqiu5vFclsHuA5geru3",
            {
                id    :"ENqiu5vFclsHuA5geru3",
                title :"Note title!!!",
                date  :1644273441664,
                body  :"This is anther note!!!",
                url   :"https://res.cloudinary.com/api-node-cloud/image/upload/v1644363562/journal-photos/r4rn9t0sczxtzhrbewfl.png"
            }
        );
    })


})