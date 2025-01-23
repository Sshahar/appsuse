import { noteService } from "../../../services/note.service.js"
import { AddNote } from "../cmps/AddNote.jsx"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

import { NoteList } from "../cmps/NoteList.jsx"
import { NoteEdit } from "../cmps/noteEdit.jsx"
const { useEffect, useState } = React
export function NoteIndex() {
    const [notes,setNotes] = useState(null)
    const [editNote,setEdit] = useState(null)
    useEffect(()=>{
        loadNotes()
    },[])

    function loadNotes(){
        noteService.query()
                            .then(setNotes)
                            .catch(err => console.log('Problems getting notes:', err))
    }
   function onSetEdit(note){
    setEdit(note)
   }
    function addNote(newNote){
        if(newNote.type === 'NoteTodos'){
            newNote.info.todos =  newNote.info.todos.map(val => { return { 'txt': val, doneAt: null } })
        }
        const emptyNote = noteService.getEmptyNote()
        const note = {...emptyNote,...newNote}
        noteService.save(note)
                            .then(note => {
                                setNotes([...notes,note])
                                        showSuccessMsg('note added')})
                            .catch(err => console.log(err))              
    }
    function changeNote(note){
        if(note.type === 'NoteTodos'){
            note.info.todos =  note.info.todos.map(val => { return { 'txt': val, doneAt: null } })
        }
        noteService.save(note)
                            .then(note => {
                                        loadNotes()
                                        showSuccessMsg('note edited')})
                            .catch(err => console.log(err))  

    }
    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(notes => notes.filter(note => note.id !== noteId))
                showSuccessMsg(`note removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing note:', err)
                showErrorMsg(`Problems removing note (${noteId})`)
            })
    }
    function pinState(note){
        console.log('pin')
        note.isPinned = !note.isPinned
        noteService.save(note).then(() =>loadNotes())

    }
    
    if(!notes) return <h1>Loading...</h1>
    return (<div className="note-index">
      <AddNote addNote={addNote}/>
     <NoteList pinState={pinState} onSetEdit={onSetEdit} onRemoveNote={onRemoveNote} notes={notes}/>
     {(editNote&&<NoteEdit note={editNote} changeNote={changeNote} onSetEdit={onSetEdit}/>)}
    </div>)
}
