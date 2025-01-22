export function MailPreview({mail}) {
    return (
        <React.Fragment>            
            <pre>{JSON.stringify(mail)}</pre>
        </React.Fragment>
    )
    
}
