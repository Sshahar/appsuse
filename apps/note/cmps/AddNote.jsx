const { useEffect, useState } = React

export function AddNote({ addNote }) {
    const [noteTyp, setTyp] = useState('NoteTxt')
    console.log(noteTyp)
    function onsetType(type) {
        setTyp(type)
    }
    function onAddNote(ev) {
        const type = { type: noteTyp }
        const target = ev.target
        if (!target.value) return
        const feild = target.name
        let value = target.value
        if (noteTyp === 'NoteImg') {
            const reader = new FileReader();
            reader.onload = function (ev) {
                const img = new Image()
                img.onload = () => {
                    value = img.src
                    addNote(type, { [feild]: value })
                }
                img.src = ev.target.result
            }
            reader.readAsDataURL(target.files[0])
        } else if (noteTyp === 'NoteTodos') {
            value = value.split(',')
            value = value.map(val => { return { 'txt': val, doneAt: null } })

            addNote(type, { [feild]: value })

        } else {
            addNote(type, { [feild]: value })
        }
        target.value = ''

    }
    function getplaceholder(){
        if(noteTyp === 'NoteTxt') return 'enter note'
        else if(noteTyp === 'NoteTodos') return 'enter comma seprated list'
        else return 'choose image or change mode'
    }

    const placeholder = getplaceholder()
    
    return (
        <div className="add-note">
            <input name={(noteTyp === 'NoteTxt') ? 'txt' : 'todos'} type="text" onBlur={(event) => { onAddNote(event) }} placeholder={placeholder} />
            <div>
                <svg onClick={() => onsetType('NoteTxt')} className={(noteTyp === 'NoteTxt')&&'active'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l128 0 0 352c0 17.7 14.3 32 32 32s32-14.3 32-32l0-352 128 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 32 32 32z" />
                    </svg>
                
                <label style={{ cursor: "pointer", display: "inline-block" }}>
                    <svg className={(noteTyp === 'NoteImg')&&'active'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                    </svg>
                    <input className="add-image" name="url" type="file" onClick={() => onsetType("NoteImg")} onChange={(event) => { onAddNote(event) }} />
                </label>

                <svg className={(noteTyp === 'NoteTodos')? 'active':''} onClick={() => onsetType('NoteTodos')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z" /></svg>

            </div>
        </div>
    )
}