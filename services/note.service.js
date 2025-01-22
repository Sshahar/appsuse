import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    
    
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.vendor))
            }
            if (filterBy.minSpeed) {
                notes = notes.filter(note => note.speed >= filterBy.minSpeed)
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => _setNextPrevCarId(note))
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
            _createNote(1112222, 'NoteTxt',true,{  backgroundColor: '#FFFFFF'}, { txt: 'Fullstack Me Baby!' }),
            _createNote(1112223, 'NoteImg',false,{  backgroundColor: '#FFFFFF'},  { url: 'https://picsum.photos/200/300', title: 'Bobi and Me' }),
            _createNote(1112224, 'NoteTodos',false,{  backgroundColor: '#FFFFFF'},  { title: 'Get my stuff together', todos: [ { txt: 'Driving license', doneAt: null }, { txt: 'Coding power', doneAt: 187111111 } ] }),]
            utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(createdAt, type,isPinned,style,info ) {
    const note = getEmptyNote(createdAt, type,isPinned,style,info)
    note.id = utilService.makeId()
    return note
}



function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const minSpeed = searchParams.get('minSpeed') || ''
    return {
        txt,
        minSpeed
    }
}