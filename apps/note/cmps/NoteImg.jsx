export function NoteImg({note}){
    return (
            <article  className=" note-img" style={note.style}>
                <img src={`${note.info.url}`}></img>
                <div>{note.info.title}</div>
            </article>

    )
}