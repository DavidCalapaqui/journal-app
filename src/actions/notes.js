import { db } from "../firebase/firebase-config";
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import {types} from '../types/types';

import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";



export const startNewNote = () =>{
    
    
    return async (dispatch, getState) =>{
        const {uid} = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        try {
            const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote);
            //console.log('DOC REF: ', doc);

            dispatch(activeNote(doc.id, newNote));
            dispatch(addNewNote(doc.id, newNote));
        } catch (error){
            console.error('ERROR AL INTENTAR GRABAR UNA COLECCION: ',error);
        } 
       
    }
}

export const startLoadingNotes = (uid) =>{
    return async(dispatch)=>{
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const activeNote = (id, note) =>({
    type: types.notesActive,
    payload:{
        id, 
        ...note
    }
})

export const addNewNote = (id, note)=>({
    type: types.notesAddNew,
    payload:{
        id,
        ...note
    }
})

export const setNotes = (notes) =>({
    type: types.notesLoad,
    payload: notes
})


export const startSaveNote = (note) =>{
    return async (dispatch, getState)=>{
        const {uid} = getState().auth;

        if(!note.url){
            delete note.url;
        }

        const noteToFirestore = {...note};
        delete noteToFirestore.id;
        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);
        try {
             await updateDoc(noteRef, noteToFirestore);
        } catch (error) {
            console.error('ERROR AL ACTUALIZAR NOTA: ',error);
        }

        dispatch(refreshNote(note.id, note));
        Swal.fire('Saved', note.title, 'success')
    }
}

export const refreshNote = (id, note) =>({
    type: types.notesUpdated,
    payload:{
        id, 
        note:{
            id,
            ...note
        }
    }
})


export const startUploading = (file) =>{

    return async (dispatch,getState ) =>{
        const {active:activeNote} = getState().notes;
        Swal.fire({
            title: 'Uploading',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: ()=>{ 
                Swal.showLoading();
            }
        });
        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;
        dispatch(startSaveNote(activeNote))
        Swal.close();
    }
}


export const startDeleting = (id) =>{
    return async (dispatch, getState)=>{
        const uid = getState().auth.uid;

        const noteRef = doc(db, `${uid}/journal/notes/${id}`);

        try {
            await deleteDoc(noteRef);
            dispatch(deleteNote(id));
            Swal.fire('Note removed', 'The note has been removed on database', 'success')

        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        }

    }
}

export const deleteNote = (id) =>({
    type: types.notesDelete,
    payload: id
})

//limpiar las notas del usuario en sesión cuando cierre sesión
export const notesLogout =()=>({
    
    type: types.notesLogoutCleaning
})