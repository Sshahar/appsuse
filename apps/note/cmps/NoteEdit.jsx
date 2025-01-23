
const { useRef , useState,useEffect } = React


export function NoteEdit({note,onSetEdit,changeNote}){

    const [editNote,setEdit] = useState({...note.info})
    

    useEffect(()=>{
        if(note.type === 'NoteTodos'){
            const todoTxt = editNote.todos.map(todo => todo.txt)
           setEdit(prevNote => ({...prevNote,'todos':todoTxt}))
         }
        console.log(editNote)
    },[])

    function onsubmit(ev){
        ev.preventDefault()
        const info = {...editNote}
        changeNote({...note,info})
        onSetEdit(null)
    }
    function onhadleChange({target}){
        
        const feild = target.name
        let value = target.value
        if (note.type === 'NoteTodos') {
        value = value.split(',')
        const info = {...editNote, [feild]:value}
        setEdit(prevNote => {return {...prevNote,...info}})
        } else{
            const info = {...editNote, [feild]:value}
            setEdit(prevNote => {return {...prevNote,...info}})
        }
    }

    
    console.log(editNote.txt)
    return(
        <div className="modal">
            <div className="modal-content">
            <form className="form-content" action="" onSubmit={onsubmit}>
                <div className="form-title">
                <label htmlFor="title">enter title</label>
                <input type="text" name="title" onChange={onhadleChange} value={editNote.title}/>
                </div>
                <div className="txt-area">
                <label htmlFor={(note.type === 'NoteTodos')? 'todos':'txt'}>enter your note or a enter comma seprated list</label>
                <textarea type="text" name={(note.type === 'NoteTodos')? 'todos':'txt'} onChange={onhadleChange} value={(note.type === 'NoteTodos')? editNote.todos:editNote.txt} />
                </div>
                <div className="form-btn">
                <button onClick={() =>onSetEdit(null)}>close</button>
                <button type="submit">save</button>
                </div>
                
            </form>
            </div>
        </div>
    )
}