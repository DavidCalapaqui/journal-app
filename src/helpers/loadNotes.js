import { db } from "../firebase/firebase-config"
import { collection, addDoc, getDocs, query } from "firebase/firestore";

export const loadNotes = async (uid)=>{
    const notesSnap = await getDocs(query(collection(db,`${uid}/journal/notes`))) 
    const notes = [];


    notesSnap.forEach(snapHijo =>{
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })

    //console.log(notes);

    return notes;
}