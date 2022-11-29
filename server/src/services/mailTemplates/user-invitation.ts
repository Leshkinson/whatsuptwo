interface UserInvitation {
    to: string,
    subject: string,
    html: string
}

export function userInvitationTemplate(subject: string, link: string): UserInvitation {
    return {
        to: subject,
        subject: 'Congratulations! You have received an invitation to join our chat',
        html: `
        <h2>Поздравляем, Вы получили приглашение вступить в наш чат</h2>
        
        <i>Ссылка для присоединнения к чату :</i>
        <ul>
            <li> <a href=${link}>ССЫЛКА</a></li>
            <li> Ваша ссылка доступна в течение 2 минут, затем мы ее удалим</li>
        </ul>
        <p>Данное письмо не требует ответа.<p>`
    }
}