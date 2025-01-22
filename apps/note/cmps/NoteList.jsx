import { NotePreview } from "./NotePreview.jsx"


export function NoteList({notes}) {


    console.log(notes)
    return (

        <div className="note-list">
            {notes.map(note =>{
                return(
                <article className="note" style={note.style} key={note.id}>
              <NotePreview note={note}/>
              {/* <button onClick={}>delete</button> */}
              </article>
            )
            })}
        </div>
    )
}
