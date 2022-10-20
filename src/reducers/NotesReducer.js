//como quiero que esté mi state

/*
    {
        notes: [] //listado de las notas
        active: null //nota seleccionada
        active: {
            id: 343kj43kknk,
            title: '',
            body: '',
            imageUrl: '',
            date: 33424324234
        }
    }
*/

import {types} from '../types/types';



const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) =>{
    //retornar nuevos estados
    switch (action.type) {
        case types.notesActive:
            
            return {
                ...state,
                active:{
                    ...action.payload
                }
            }

        case types.notesAddNew:
            return{
                ...state,
                notes:[action.payload, ...state.notes]
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            }
        
        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map(
                    note=>note.id === action.payload.id
                    ? action.payload.note
                    :note
                )
            }

        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload)
            }

        //limpiar las notas despues del logout
        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: [],
                
            }

        default:
            return state;
    }
}


