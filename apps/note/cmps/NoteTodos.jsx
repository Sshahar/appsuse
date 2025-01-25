
export function NoteTodos({note,checkTodo}){



    function handlachange(todo){
        if(todo.doneAt) todo.doneAt= null
        else todo.doneAt = new Date()
        checkTodo(note)
    }
    return (
        <article  className=" note-todos" >
            <div className="note-title">{note.info.title}</div>
            {note.info.todos.map((todo,index) =>{
                const isChecked = (todo.doneAt) ? true:false 
                return (
                    <div className="todos-container" key={index}>
                        <input onChange={() => handlachange(todo)} type="checkbox" id="todo" name="todo" checked={(isChecked)? true:undefined}  />
                        <label htmlFor="todo" className={`note-todo-txt ${(isChecked)? 'checked':undefined}`} >{todo.txt}</label>
                    </div>
                )
            })}
        </article>
    )

}