/**

* @jest-environment node

*/
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import { db } from "../../firebase/firebase-config";

import {doc, deleteDoc, getDoc } from "firebase/firestore";

import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { fileUpload } from '../../helpers/fileUpload';
import {readFileSync, writeFileSync} from 'fs';
//jest.setTimeout(100000)

//finjir la funcion flieUpload
jest.mock('../../helpers/fileUpload', ()=>({
    fileUpload: jest.fn()
}))


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    
    auth: {
        uid: 'testing'
    },
    notes:{
        active: {
            id: 'lLawYw8tZKaV0jaROMWI',
            title: 'Hola',
            body: 'mundo'
        }
    }
}

//simulacion del store
let store = mockStore(initState);

describe('Pruebas en notes', ()=>{


    //limpiar store para cada prueba
    beforeEach(()=>{
        store = mockStore(initState);
    })

    test('debe de crear una nueva nota startNewNote', async() => { 

        await store.dispatch(startNewNote());
        const actions = store.getActions();
        //console.log(actions)
        expect(actions[0]).toEqual({
            type:types.notesActive,
            payload:{
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        //borrar nota
        const {id: docId} = actions[0].payload;
        const noteRef = doc(db, `testing/journal/notes/${docId}`);

        try {
            await deleteDoc(noteRef);
            //dispatch(deleteNote(id));
            console.log('Note removed', 'The note has been removed on database', 'success')

        } catch (error) {
            console.error('Error', error.message, 'error')
        }

        
     })

    
     test('startLoadingNotes debe cargar las notas', async() => { 
        
        await store.dispatch(startLoadingNotes('testing'));

        const actions = store.getActions();

        console.log(actions)

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        })
        
        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect(actions[0].payload[0]).toMatchObject(expected)
    })

    test('startSaveNote debe de actualizar la nota', async() => { 
         const note = {
             id: 'lLawYw8tZKaV0jaROMWI',
             title: 'Titulo',
             body: 'body'
         }

         await store.dispatch(startSaveNote(note));
         const actions = store.getActions();
         //console.log(actions);

         expect(actions[0].type).toBe(types.notesUpdated);

         const noteRef = doc(db, `testing/journal/notes/${note.id}`);
         const docRef = await getDoc(noteRef);
         
         //console.log('Doc: ', docRef.data());
         expect(docRef.data().title).toBe(note.title);
    })

    test('startUploading debe de actualizar el url del entry', async() => { 
        
       fileUpload.mockReturnValue('https://hola-mundo.com');
       writeFileSync('foto.jpg', '');

       const file = readFileSync('foto.jpg');
       await store.dispatch(startUploading(file));

       const docRef = doc(db, `/testing/journal/notes/lLawYw8tZKaV0jaROMWI`);
       const docReceived = await getDoc(docRef);

       expect(docReceived.data().url).toBe('https://hola-mundo.com');
        
    })
})