export function AddNote({addNote}){

    function onAddNote({target}){
        addNote(target.value)
        target.value= ''
    }
    return (
        <div className="add-note">
        <input name="addNote" type="text" onBlur={onAddNote} placeholder="enter anyhing on your mind"  />
        </div>
    )
}