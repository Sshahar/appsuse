import { storageService } from "../../../services/async-storage.service.js";
import { utilService } from "../../../services/util.service.js";

const dbName = "mailDB"
const loggedInUser = { address: 'shaharma@gmail.com', name: 'Me' }

export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    sort,
    isDrafts,
    getMailTypeCounts
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
    // Update mail
    if (mail.id) return storageService.put(dbName, _createMail(mail))

    // POST mail
    if (!mail.sentAt) mail.sentAt = new Date().getTime()
    return storageService.post(dbName, _createMail(mail))

    // TODO: add draft support
}

function getDefaultFilter() {
    return { folder: 'inbox', label: 'primary' }
}

function sort(mails) {
    return mails.toSorted((m1, m2) => {
        if (m1.sentAt && m2.sentAt) return m2.sentAt - m1.sentAt
        return m2.createdAt - m1.createdAt
    })
}

function _filter(mails, filter) {
    const { folder } = filter
    if (folder) {
        mails = mails.filter(mail => _filterByFolder(mail, folder))
    }

    return mails
}

function _filterByFolder(mail, folder) {
    if (folder === 'inbox') return _isInbox(mail)
    return folder === getSpecificFolder(mail)
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
        from: loggedInUser.address,
        fromName: loggedInUser.name,
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
    if (isDrafts(mail)) return 'drafts'

    if (mail.removedAt) return 'bin'
    
    return 'inbox'
}

function _isInbox(mail) {
    // TODO: implement add !snoozed condition
    // inbox - !sent && !snoozed && !drafts
    return (!_isSent(mail) && !isDrafts(mail))
}

function _isSent({ sentAt, from }) {
    return sentAt && from.localeCompare(loggedInUser.address) === 0
}


function isDrafts({ createdAt, sentAt }) {
    return createdAt && !sentAt
}

function _createMails() {
    console.log('Generating new mail db...')
    return fetch('apps/mail/demo-data/mails.json')
        .then(json => json.json())
        .catch(err => console.log('error at loading mails:', err))
}

function getMailTypeCounts() {
    return query()
        .then(mails => {
            const inbox = mails.filter(m => _isInbox(m) && !m.isRead).length
            const drafts = mails.filter(m => isDrafts(m) && mailService.isDrafts(m))
            return { inbox, drafts }
        })
}