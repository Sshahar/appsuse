import { noteService } from "../../../services/note.service.js"
import { AddNote } from "../cmps/AddNote.jsx"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

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
    function addNote(type,newNote){
        
       const emptyNote = noteService.getEmptyNote()
        const info = {...emptyNote.info,...newNote}
        const note = {...emptyNote,info,...type}
        noteService.save(note)
                            .then(note => {
                                setNotes([...notes,note])
                                        showSuccessMsg('note added')})
                            .catch(err => console.log(err))              
    }

    noteService.query()
    if(!notes) return <h1>Loading...</h1>
    return (<div className="note-index">
      <AddNote addNote={addNote}/>
        <NoteList notes={notes}/>
    </div>)
}
