import {MailService} from "../config/mail-transporte";
import {userInvitationTemplate} from "./mailTemplates/user-invitation";

export class MailerService {

    async sendNotificationToEmail(to: string, link: string) {
        let sendMessage = userInvitationTemplate(to, link)
        const transporter = new MailService();
        transporter.send(sendMessage);
    }
}