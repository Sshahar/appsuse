import { storageService } from "../../../services/async-storage.service.js";
import { utilService } from "../../../services/util.service.js";

const dbName = "mailDB"

export const mailService = {
    query,
    get,
    remove,
    save,
}

function query(filter = {}) {
    return storageService.query(dbName)
        .then(mails => {
            // no emails? generate demo data
            if (!mails.length) {
                return _createMails()
                    .then(mails => {
                        utilService.saveToStorage(dbName, mails)
                        return _filter(mails, filter)
                    })
            }
            // TODO: filter mails
            return _filter(mails, filter)
        })
        .catch(err => {
            console.log('wat is de pbleom?')
        })
}

function get(mailId) {
    return query()
        .then(mails => mails.find(mail => mail.id === mailId))
}

function remove(mailId) {
    return storageService.remove(dbName, mailId)
}

function save(mail) {
    // TODO: test this function
    if (mail.id) return storageService.put(dbName, mail)

    return storageService.post(dbName, mail)
}

function _filter(mails, filter) {
    // TODO: add filtering

    return mails
}

function _createMails() {
    console.log('Generating new mail db...')
    return fetch('apps/mail/demo-data/mails.json')
        .then(json => json.json())
        .catch(err => console.log('error at loading mails:', err ))
}