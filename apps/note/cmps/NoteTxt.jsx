export function NoteTxt({note}){
    
    return (
            <article className="note-txt" style={note.style}>
                <div>{note.info.txt}</div>
            </article>


    )
}