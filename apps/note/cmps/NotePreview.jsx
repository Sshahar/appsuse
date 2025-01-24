import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { NoteTxt } from "./NoteTxt.jsx"

const { useState,useEffect} = React
export function NotePreview({note}){
const [noteType,setTyp] = useState(null)

    useEffect(()=>{
        setTyp(note.type)
    },[])

return (
    <div className="note-preview">
    <DynamicCmp note={note} noteType={noteType} />
    </div>
 
    
)


function DynamicCmp(props) {
    // console.log('props:', props)
    switch (props.noteType) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
            case 'NoteTodos':
                return <NoteTodos {...props} />
    }
}

}