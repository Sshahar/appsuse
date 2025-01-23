export function NoteTxt({note}){
    
    return (
            <article className="note-txt" style={note.style}>
                <div className="note-title">{note.info.title}</div>
                <div className="note-txt">{note.info.txt}</div>
            </article>


    )
}