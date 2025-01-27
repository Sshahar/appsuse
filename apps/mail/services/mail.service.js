import { storageService } from "../../../services/async-storage.service.js";
import { utilService } from "../../../services/util.service.js";

const dbName = "mailDB"
const loggedInUser = 'Me'

export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
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
    // POST mail
    mail.sentAt = new Date().getTime()
    return storageService.post(dbName, _createMail(mail))

    // TODO: add draft support
}

function getDefaultFilter() {
    return { folder: 'inbox', label: 'primary' }
}

function _filter(mails, filter) {
    // TODO: add filtering

    return mails
}

function _createMail(mail) {
    console.log('mail:', mail)

    return {
        createdAt: new Date().getTime(),
        isRead: false,
        isStarred: false,
        isImportant: false,
        sentAt: undefined,
        removedAt: undefined,
        from: loggedInUser,
        ...mail
    }
}


// check outside of inbox
function getSpecificFolder(mail) {
    // NOTE: DOES NOT RETURN INBOX IF OTHER CONDITIONS ARE MET
    // TO CHECK FOR INBOX, USE _isInbox(mail)

    // starred - isStarred
    if (mail.isStarred) return 'starred'
    // snoozed - TODO: implement

    // important - isImportant
    if (mail.isImportant) return 'important'

    // sent - (from.localeCompare('Me') === 0)
    if (_isSent(mail)) return 'sent'

    // drafts - created but not sent
    if (_isDrafts(mail)) return 'drafts'

    return 'inbox'
}

function _isInbox(mail) {
    // TODO: implement add !snoozed condition
    // inbox - !sent && !snoozed && !drafts
    return (!_isSent(mail) && !_isDraft(mail))
}

function _isSent({ sentAt, from }) {
    return sentAt && from.localeCompare('Me') === 0
}


function _isDraft({ createdAt, sentAt }) {
    return createdAt && !sentAt
}

function _createMails() {
    console.log('Generating new mail db...')
    return fetch('apps/mail/demo-data/mails.json')
        .then(json => json.json())
        .catch(err => console.log('error at loading mails:', err))
}