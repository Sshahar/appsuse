const fs = require('fs');

// Helper function to generate random timestamps within a date range
function randomTimestamp(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getTime();
}

// Helper function to generate realistic email addresses with common providers and valid names
function randomNameEmail() {
    const firstNames = ["Mark123", "John47", "Dany89", "Rachel22", "Sarah56", "David123", "Eitan7", "Michael98", "Shira56", "Yael22", "Yossi34", "Noa99"];
    const lastNames = ["Levi", "Goldman", "Katz", "Cohen", "Rosen", "Smith", "Johnson", "Kaplan"];
    const domains = ["gmail.com", "hotmail.com", "yahoo.com", "appsus.com"];
    const email = `${firstNames[Math.floor(Math.random() * firstNames.length)].toLowerCase()}.${lastNames[Math.floor(Math.random() * lastNames.length)].toLowerCase()}${Math.floor(Math.random() * 999)}@${domains[Math.floor(Math.random() * domains.length)]}`;
    
    const fromName = email.split("@")[0].replace(/\d/g, '').replace(".", " ").replace(/\b\w/g, char => char.toUpperCase());
    return { email, fromName };
}

// Email subjects diversification
function randomSubject() {
    const subjects = [
        "Meeting tomorrow", "Miss you!", "Vacation plans", "New job offer", "Project deadline", 
        "Weekly update", "Invitation to event", "Follow-up on conversation", "Birthday party", 
        "Out of office", "Reminder: upcoming meeting", "Quick question", "Check this out", "Lunch next week?"
    ];
    return subjects[Math.floor(Math.random() * subjects.length)];
}

// Helper function to generate random email bodies
function randomBody() {
    const bodies = [
        "Let's catch up soon!", 
        "Looking forward to seeing you next week.", 
        "Will you join me on this trip?", 
        "We need to reschedule the meeting.", 
        "Here's the document you requested.", 
        "Can we discuss the new job opportunity?", 
        "Happy to help with the project details.", 
        "Don't forget about our call later today!", 
        "I'm going on vacation, see you soon!"
    ];
    return bodies[Math.floor(Math.random() * bodies.length)];
}

// Updated label handling: 95% "inbox", no "sent" + "inbox", allow "starred" with other labels
function randomLabels() {
    const inboxChance = 0.95;
    if (Math.random() < inboxChance) {
        return Math.random() > 0.05 ? ["inbox"] : ["inbox", "starred"];
    } else {
        const labelCombos = [["sent"], ["trash"], ["draft"], ["starred", "sent"], ["starred", "draft"], ["starred", "trash"]];
        return labelCombos[Math.floor(Math.random() * labelCombos.length)];
    }
}

// Specific timestamps for sentAt: today, last week, next week, next month, next year
const today = new Date();
const lastWeek = new Date(today);
lastWeek.setDate(today.getDate() - 7);
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
const nextMonth = new Date(today);
nextMonth.setMonth(today.getMonth() + 1);
const nextYear = new Date(today);
nextYear.setFullYear(today.getFullYear() + 1);

// Only 5% of emails should be starred (adjust for larger counts)
const totalEmails = 25;
const starLimit = Math.floor(totalEmails * 0.05);
let starredEmailsCount = 0;

// Email generation for 5 emails
const emails = [];

for (let i = 0; i < totalEmails; i++) {
    let labels = randomLabels();
    if (labels.includes('starred') && starredEmailsCount >= starLimit) {
        labels = labels.filter(label => label !== 'starred');
    }
    if (labels.includes('starred')) {
        starredEmailsCount++;
    }

    const { email: fromEmail, fromName } = randomNameEmail();

    emails.push({
        id: `e${100 + i}`,
        createdAt: randomTimestamp(new Date(today.getFullYear() - 5, 0, 1), today), // Random time from the past 5 years
        subject: randomSubject(),
        body: randomBody(),
        isRead: Math.random() > 0.5,
        isStarred: labels.includes('starred'),
        sentAt: randomTimestamp(new Date(today.getFullYear() - 5, 0, 1), new Date(2025, 0, 26)), // Ensure sentAt up to 26/1/2025
        removedAt: null,
        labels: labels,
        from: fromEmail,
        fromName: fromName,
        to: Math.random() < 0.9 ? "john-doe@appsus.com" : randomNameEmail().email
    });
}

// Write emails to a JSON file
fs.writeFileSync('mails.json', JSON.stringify(emails, null, 4), 'utf-8');

console.log('Email data saved to mails.json');
