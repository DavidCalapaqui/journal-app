import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    const dispatch = useDispatch();
    //jalo la nota activa del state
    const {active:note} = useSelector(state=>state.notes);
    //utilizo el hook personalizado mandando la nota que traje del state
    const [formValues, handleInputChange, reset] = useForm(note);
    //desestructuro los valores 
    const {body, title, id} = formValues;

    //id de la nota seleccionada 
    const activeId = useRef(note.id);
    useEffect(() => {
      //comparar la nota activa con la activa en el selector
      if(note.id !== activeId.current){
          reset(note);
          activeId.current = note.id;
      }
    }, [note, reset]);
    
    useEffect(() => {
        dispatch(activeNote(formValues.id, {...formValues}));
    }, [formValues, dispatch]);
    
    const handleDelete = () =>{
        dispatch(startDeleting(id));
        
    }

    return (
        <div className='notes__main-content animate__animated animate__bounceIn'> 
            <NotesAppBar />

            <div className='notes__content'>

                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                    value={title}
                    onChange={handleInputChange}
                    name="title"   
                
                />

                <textarea
                    placeholder='What happened today'
                    className='notes__textarea'
                    value={body}
                    onChange={handleInputChange}   
                    name="body"
                ></textarea>

               { 
                    (note.url) &&
                    <div className='notes__image'>
                         <img 
                             src={note.url}
                             alt="imagen cheems"
                         />
                     </div>
                }
            </div>

            <button 
                className='btn btn-danger'
                onClick={handleDelete}    
            >
                Eliminar

            </button>
        </div>
    )
}
