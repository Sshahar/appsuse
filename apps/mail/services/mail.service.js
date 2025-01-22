import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const MAIL_KEY = 'mailDB'
_createMails()

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const mailService = {
    loggedinUser,
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getNextMailId,
    getDefaultFilter,
}

function query(filterBy = {}) {
    // const filterBy = {
    //     status: 'inbox/sent/trash/draft',
    //     txt: 'puki', // no need to support complex text search
    //     isRead: true,
    //     // (optional property, if missing: show all)
    //     isStared: true, // (optional property, if missing: show all)
    //     lables: ['important', 'romantic'] // has any of the labels
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
            if (filterBy.isStared) {
                mails = mails.filter(mail => mail.isRead === filterBy.isStared)
            }
            // if (!!filterBy.lables) {
            //     mails = mails.filter(mail => mail.labels.some(label => filterBy.labels.includes(label)))
            // }

            return mails
        })
}

function get(mailId) {
    const mail = {
        id: 'e101',
        createdAt: 1551133930500,
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStared: false,
        sentAt: 1551133930594,
        removedAt: null,
        labels: [],
        from: 'momo@momo.com',
        to: 'user@appsus.com',
    }
    return mail
    // return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(createdAt, subject = '', body = '', isRead = '', isStared = '', sentAt = '', removedAt = '', labels = '', from = '', to = '') {
    return {
        createdAt,
        subject,
        body,
        isRead,
        isStared,
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
        isStared: undefined,
        lables: []
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

function _createMail(createdAt, subject, body, isRead, isStared, sentAt, removedAt, labels, from, to) {
    const mail = getEmptyMail(createdAt, subject, body, isRead, isStared, sentAt, removedAt, labels, from, to)
    if (!mail.id) mail.id = utilService.makeId()
    return mail
}