
export function NoteTodos({note}){
    return (
        <article  className=" note-todos" >
            {note.info.todos.map((todo,index) =>{
                return (
                    <div key={index}>
                    <input type="checkbox" id="todo" name="todo" value={todo.doneAt}/>
                    <label htmlFor="todo">{todo.txt}</label>
                    </div>
                )
            })}
        </article>
    )

}