import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const MAIL_KEY = 'mailDB'
_createMails()

const loggedinUser = {
    email: 'john-doe@appsus.com',
    fullname: 'Johnny Doe'
}

export const mailService = {
    getLoggedinUser,
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getNextMailId,
    getDefaultFilter,
    getFilterFromSearchParams,
}

function getLoggedinUser() {
    return loggedinUser
}

function query(filterBy = {}) {
    // const filterBy = {
    //     status: 'inbox/sent/trash/draft',
    //     txt: 'puki', // no need to support complex text search
    //     isRead: true,
    //     // (optional property, if missing: show all)
    //     isStarred: true, // (optional property, if missing: show all)
    //     labels: ['important', 'romantic'] // has any of the labels
    // }
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.vendor))
            }
            if (filterBy.status) {
                mails = mails.filter(mail => getMailStatus(mail) === filterBy.status)
            }
            if (filterBy.isRead !== undefined) {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }
            if (filterBy.isStarred) {
                mails = mails.filter(mail => mail.isStarred)
            }
            if (filterBy.labels && filterBy.labels.length) {
                mails = mails.filter(mail => mail.labels.some(l => filterBy.labels.includes(l)))
            }

            // Is addressed to us?
            // this is server side logic, running as a client requrest, hence removed.
            // if (true) {
                   // create a scope
            //     const regex = new RegExp(loggedinUser.email, 'i')
            //     mails = mails.filter(mail => regex.test(mail.to))
            // }

            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return get(mailId).then(mail => {
        // Delete forever?
        if (mail.removedAt) return storageService.remove(MAIL_KEY, mailId)
        // Move to trash
        mail.removedAt = new Date()
        mail.labels.push('trash')
        return save(mail)
    })

}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        mail.createdAt = new Date()
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(createdAt, subject = '', body = '', isRead = undefined, isStarred = false, sentAt = undefined, removedAt = undefined, labels = [], from = '', to = '') {
    return {
        createdAt,
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt,
        labels,
        from,
        to,
    }
}

function getDefaultFilter() {
    return {
        status: '',
        txt: '',
        isRead: undefined,
        isStarred: undefined,
        labels: ['inbox', 'sent', 'trash', 'draft']
    }
}


function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            var idx = mails.findIndex(mail => mail.id === mailId)
            if (idx === mails.length - 1) idx = -1
            return mails[idx + 1].id
        })
}

function getMailStatus(mail) {
    return 'inbox/sent/trash/draft'
}

function getFilterFromSearchParams(searchParams) {
    return {
        status: searchParams.get('status') || '',
        txt: searchParams.get('txt') || '',
        isRead: searchParams.get('isRead') || undefined,
        isStarred: searchParams.get('isStarred') || undefined,
        labels: searchParams.get('labels') || ['inbox']
    }
}


function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    // Should load demo data?
    if (!mails || !mails.length) {
        return fetch('apps/mail/demo-data/mails.json')
            .then(data => data.json())
            .then(mails => {
                utilService.saveToStorage(MAIL_KEY, mails)
                return mails
            })
            .catch(err => console.log('Cannot read demo mails', err))
    }

    return Promise.resolve(mails)
}

function _createMail(createdAt, subject, body, isRead, isStarred, sentAt, removedAt, labels, from, to) {
    const mail = getEmptyMail(createdAt, subject, body, isRead, isStarred, sentAt, removedAt, labels, from, to)
    if (!mail.id) mail.id = utilService.makeId()
    return mail
}