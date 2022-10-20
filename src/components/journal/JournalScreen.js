import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

//import { NothingSelected } from './NothingSelected'
export const JournalScreen = () => {
    

    //jalo el active del state.notes
    const {active} = useSelector(state => state.notes);

    
    //si tengo una nota seleccionada la muestro si no la pantalla de sleccione una
    return (
        <div className='journal__main-content animate__animated animate__fadeIn animate__faster'>
            <Sidebar />
        
            <main>
                {
                    (active)
                    ? <NoteScreen />
                    : <NothingSelected />
                }
                             
            </main>
        </div>
    )
}
