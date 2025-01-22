export function MailList({mails}) {
    return (
        <React.Fragment>
            <div>Mail list</div>
            <pre>{JSON.stringify(mails)}</pre>
        </React.Fragment>
    )
}
