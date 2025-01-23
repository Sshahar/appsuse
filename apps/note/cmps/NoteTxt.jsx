export function NoteTxt({note}){
    
    return (
            <article className="note-txt" style={note.style}>
                <div className="txt">{note.info.txt}</div>
            </article>


    )
}