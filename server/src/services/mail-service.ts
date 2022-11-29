import {MailService} from "../config/mail-transporte";
import {userInvitationTemplate} from "./mailTemplates/user-invitation";
// import {transporter} from "../config/mail-transporte";

export class MailerService {
    // constructor(MailService) {
    //     this.MailService = MailService;
    // }
    static async sendNotificationToEmail(to: string, link: string) {
        let sendMessage = userInvitationTemplate(to, link)
        const transporter = new MailService();
        transporter.send(sendMessage);

    }
}