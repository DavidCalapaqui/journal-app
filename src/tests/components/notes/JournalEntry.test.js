import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import { activeNote } from '../../../actions/notes';

import { JournalEntry } from '../../../components/journal/JournalEntry';




const middlewares = [thunk];
const mockStore = configureStore(middlewares);

//jest.mock('../../../actions/notes', ()=>({
//    activeNote: jest.fn(),
//}))

const initState = {}

//simulacion del store
let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 0,
    title: 'Hola',
    body: 'mundo',
    url: 'https://somewhere.com/photos/delfo.jpg'
}

const wrapper = mount(
    
    <Provider store={store}>
            <JournalEntry {...note}/>
    </Provider>
        
);

describe('Pruebas en JournalEntry', ()=>{

    test('Debe de mostrarse correctamente', () => { 
        expect(wrapper).toMatchSnapshot();
        
    })

    test('Debe de actiar la nota', () => { 
        wrapper.find('.journal__entry').prop('onClick')();
        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(note.id, {...note})
        );

     })


})