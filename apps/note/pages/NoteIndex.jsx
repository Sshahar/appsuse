import { noteService } from "../../../services/note.service.js"

import { AddNote } from "../cmps/AddNote.jsx"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteEdit } from "../cmps/noteEdit.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"

const { useEffect, useState } = React

export function NoteIndex() {

    const [notes,setNotes] = useState(null)
    const [editNote,setEdit] = useState(null)
    const [filterBy,setFilterBy] = useState(null)
    useEffect(()=>{
        loadNotes()
    },[filterBy])

    function loadNotes(){
        noteService.query(filterBy)
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
        note.isPinned = !note.isPinned
        noteService.save(note).then(() =>loadNotes())

    }

    function onChangeColor(note,color){
        const updatedNote = {  ...note, style: { ...note.style, backgroundColor: color }}
        noteService.save(updatedNote).then(() =>loadNotes())
    }

    function onduplicate(note){
        const noteCopy = {...note}
        delete noteCopy.id
        console.log(noteCopy)
        noteService.save(noteCopy).then(() =>loadNotes())

    }
    function onSetFilter(filterBy){
        setFilterBy(prevfiler => (filterBy === prevfiler )? null:filterBy)

    }
    
    if(!notes) return <h1>Loading...</h1>
    return (<div className="note-index">
        <NoteFilter filter={filterBy} onSetFilter={onSetFilter}/>
      <AddNote addNote={addNote}/>
     <NoteList onduplicate={onduplicate}  onChangeColor={onChangeColor} pinState={pinState} onSetEdit={onSetEdit} onRemoveNote={onRemoveNote} notes={notes}/>
     {(editNote&&<NoteEdit note={editNote} changeNote={changeNote} onSetEdit={onSetEdit}/>)}
    </div>)
}
