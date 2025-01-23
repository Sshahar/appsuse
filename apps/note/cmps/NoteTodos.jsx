
export function NoteTodos({note}){
    return (
        <article  className=" note-todos" >
            <div className="note-title">{note.info.title}</div>
            {note.info.todos.map((todo,index) =>{
                return (
                    <div key={index}>
                        <input type="checkbox" id="todo" name="todo" />
                        <label htmlFor="todo" className="note-todo-txt" >{todo.txt}</label>
                    </div>
                )
            })}
        </article>
    )

}