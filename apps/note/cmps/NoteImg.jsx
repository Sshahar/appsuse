export function NoteImg({note}){
    console.log(note.info.url)
    return (
            <article  className=" note-img" style={note.style}>
                <img src={`${note.info.url}`}></img>
                
            </article>

    )
}