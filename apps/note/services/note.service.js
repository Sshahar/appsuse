import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    
    
    
}

function query(filterBy = null) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if(filterBy){
                notes = notes.filter( note => note.type === filterBy)
            }
            notes = notes.sort((a, b) => (b.isPinned - a.isPinned))
            
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        
}

function remove(noteId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(createdAt = new Date,type='NoteTxt',isPinned=false,style ={  backgroundColor: '#FFFFFF'},info={} ) {
    return { createdAt, type, isPinned,style,info}
}

function getDefaultFilter() {
    return {
        txt: '',
        minSpeed: '',
    }
}

function _createNotes() {
    console.log('hi')
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            _createNote(1112223, 'NoteImg',false,{  backgroundColor: '#FFFFFF'},  { url: 'https://picsum.photos/200/300', title: 'Bobi and Me' }),
            _createNote(1112224, 'NoteTodos',false,{  backgroundColor: '#FFFFFF'},  { title: 'Get my stuff together', todos: [ { txt: 'Driving license', doneAt: null }, { txt: 'Coding power', doneAt: 187111111 } ] }),
            _createNote(1112225, 'NoteTxt', true, { backgroundColor: '#FFD700' }, { title: 'Daily Motivation', txt: 'You are doing amazing!' }),
            _createNote(1112226, 'NoteImg', false, { backgroundColor: '#FFA07A' }, { url: 'https://picsum.photos/300/200', title: 'Sunset Vibes' }),
            _createNote(1112227, 'NoteTodos', true, { backgroundColor: '#ADD8E6' }, { title: 'Weekend Plans', todos: [ { txt: 'Go hiking', doneAt: null }, { txt: 'Finish reading a book', doneAt: null } ] }),
            _createNote(1112228, 'NoteTxt', false, { backgroundColor: '#90EE90' }, { title: 'Shopping List', txt: 'Milk, Bread, Eggs, Coffee' }),
            _createNote(1112229, 'NoteImg', true, { backgroundColor: '#D3D3D3' }, { url: 'https://picsum.photos/250/350', title: 'Mountain Adventure' }),
            _createNote(1112230, 'NoteTodos', false, { backgroundColor: '#FFC0CB' }, { title: 'Work Tasks', todos: [ { txt: 'Reply to emails', doneAt: null }, { txt: 'Prepare for meeting', doneAt: 187112222 } ] }),
            _createNote(1112231, 'NoteTxt', true, { backgroundColor: '#FFFACD' }, { title: 'Ideas', txt: 'Start a blog about coding' }),
            _createNote(1112232, 'NoteImg', false, { backgroundColor: '#E6E6FA' }, { url: 'https://picsum.photos/400/400', title: 'City Lights' }),
            _createNote(1112233, 'NoteTodos', true, { backgroundColor: '#F0E68C' }, { title: 'Fitness Goals', todos: [ { txt: 'Run 5k', doneAt: null }, { txt: 'Join a yoga class', doneAt: null } ] }),
            _createNote(1112234, 'NoteTxt', false, { backgroundColor: '#FFE4B5' }, { title: 'Project Notes', txt: 'Finalize the app UI design' })
        ]
            utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(createdAt, type,isPinned,style,info ) {
    const note = getEmptyNote(createdAt, type,isPinned,style,info)
    note.id = utilService.makeId()
    return note
}



function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('title') || ''
    const minSpeed = searchParams.get('minSpeed') || ''
    return {
        title,
        txt
    }
}