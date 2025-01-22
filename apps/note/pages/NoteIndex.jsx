import { noteService } from "../../../services/note.service.js"
import { AddNote } from "../cmps/AddNote.jsx"

import { NoteList } from "../cmps/NoteList.jsx"
const { useEffect, useState } = React
export function NoteIndex() {
    const [notes,setNotes] = useState(null)
    useEffect(()=>{
        loadNotes()
    },[])

    function loadNotes(){
        noteService.query()
                            .then(setNotes)
                            .catch(err => console.log('Problems getting notes:', err))
    }
    function addNote(txt){
        if(txt===null) return
       const emptyNote = noteService.getEmptyNote()
        const   info = {...emptyNote.info,txt:txt}
        const note = {...emptyNote,info}
        noteService.save(note)
                            .then(note => setNotes([...notes,note]))
                            .catch(err => console.log(err))              
    }

    noteService.query()
    if(!notes) return <h1>Loading...</h1>
    return (<div>
      <AddNote addNote={addNote}/>
        <NoteList notes={notes}/>
    </div>)
}
